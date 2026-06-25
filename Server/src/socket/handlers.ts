import { Server } from "socket.io";
import { addUser, getUserBySocketId, getUsersByRoom, removeUser } from "../data/store";
import type { User, ClientToServerEvents, ServerToClientEvents, Message, SystemMessage } from "../../../shared/types";
import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma";
import { joinRoomSchema, sendMessageSchema } from "../validators/schemas";

export function registerSocketHandlers(
    io: Server<ClientToServerEvents, ServerToClientEvents>
) {
    io.on('connection', (socket) => {
        socket.on('room:join', async (payload) => {
            const result = joinRoomSchema.safeParse(payload);

            if (!result.success) {
                console.warn('room:join inválido:', result.error.flatten());
                return;
            }

            const { username, room } = result.data;

            const newUser: User = {
                id: socket.id,
                username: username,
                room: room,
            };

            addUser(socket.id, newUser);
            socket.join(room);

            const systemMessage: SystemMessage = {
                id: randomUUID(),
                type: 'system',
                content: `${username} entrou em #${room}`,
                room: room,
                timestamp: new Date().toISOString(),
            };

            io.to(room).emit('system:message', systemMessage);

            const history = await prisma.message.findMany({
                where: { room: room },
                orderBy: { createdAt: 'asc' },
                take: 50,
            });

            const formattedHistory: Message[] = history.map((msg) => ({
                id: msg.id,
                user: {
                    id: msg.username,
                    username: msg.username,
                    room: msg.room,
                },
                content: msg.content,
                room: msg.room,
                timestamp: msg.createdAt.toISOString(),
            }));

            socket.emit('history:received', formattedHistory);
            io.to(room).emit('users:updated', getUsersByRoom(room))

        });

        socket.on('message:send', async (payload) => {
            const result = sendMessageSchema.safeParse(payload);

            if (!result.success) {
                console.warn('message:send inválido:', result.error.flatten());
                return;
            }
            const { content, room } = result.data;

            const sender = getUserBySocketId(socket.id);
            if (!sender) {
                return
            }
            const newMessage: Message = {
                id: randomUUID(),
                user: sender,
                content: content,
                timestamp: new Date().toISOString(),
                room: room,
            }

            await prisma.message.create({
                data: {
                    id: newMessage.id,
                    username: newMessage.user.username,
                    content: newMessage.content,
                    room: newMessage.room,
                }
            })


            io.to(room).emit("message:received", newMessage)
        })

        socket.on("disconnect", () => {
            const user = getUserBySocketId(socket.id);

            if (!user) {
                return;
            }

            removeUser(socket.id)

            const systemMessage: SystemMessage = {
                id: randomUUID(),
                type: 'system',
                content: `${user.username} saiu de #${user.room}`,
                room: user.room,
                timestamp: new Date().toISOString(),
            };

            io.to(user.room).emit('system:message', systemMessage);
            io.to(user.room).emit('users:updated', getUsersByRoom(user.room))
        })

        socket.on('typing:start', (room) => {
            const user = getUserBySocketId(socket.id)

            if (!user) {
                return;
            }

            const isTyping = true

            io.to(room).emit('typing:update', { username: user.username, isTyping });
        })

        socket.on("typing:stop", (room) => {
            const user = getUserBySocketId(socket.id)

            if (!user) {
                return;
            }

            const isTyping = false

            io.to(room).emit('typing:update', { username: user.username, isTyping })


        })

    });
}