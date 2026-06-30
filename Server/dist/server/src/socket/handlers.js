"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = registerSocketHandlers;
const store_1 = require("../data/store");
const node_crypto_1 = require("node:crypto");
const prisma_1 = require("../lib/prisma");
const schemas_1 = require("../validators/schemas");
function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
        socket.on('room:join', async (payload) => {
            const result = schemas_1.joinRoomSchema.safeParse(payload);
            if (!result.success) {
                console.warn('room:join inválido:', result.error.flatten());
                return;
            }
            const { username, room } = result.data;
            const newUser = {
                id: socket.id,
                username: username,
                room: room,
            };
            (0, store_1.addUser)(socket.id, newUser);
            socket.join(room);
            const systemMessage = {
                id: (0, node_crypto_1.randomUUID)(),
                type: 'system',
                content: `${username} entrou em #${room}`,
                room: room,
                timestamp: new Date().toISOString(),
            };
            io.to(room).emit('system:message', systemMessage);
            const history = await prisma_1.prisma.message.findMany({
                where: { room: room },
                orderBy: { createdAt: 'asc' },
                take: 50,
            });
            const formattedHistory = history.map((msg) => ({
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
            io.to(room).emit('users:updated', (0, store_1.getUsersByRoom)(room));
        });
        socket.on('message:send', async (payload) => {
            const result = schemas_1.sendMessageSchema.safeParse(payload);
            if (!result.success) {
                console.warn('message:send inválido:', result.error.flatten());
                return;
            }
            const { content, room } = result.data;
            const sender = (0, store_1.getUserBySocketId)(socket.id);
            if (!sender) {
                return;
            }
            const newMessage = {
                id: (0, node_crypto_1.randomUUID)(),
                user: sender,
                content: content,
                timestamp: new Date().toISOString(),
                room: room,
            };
            await prisma_1.prisma.message.create({
                data: {
                    id: newMessage.id,
                    username: newMessage.user.username,
                    content: newMessage.content,
                    room: newMessage.room,
                }
            });
            io.to(room).emit("message:received", newMessage);
        });
        socket.on("disconnect", () => {
            const user = (0, store_1.getUserBySocketId)(socket.id);
            if (!user) {
                return;
            }
            (0, store_1.removeUser)(socket.id);
            const systemMessage = {
                id: (0, node_crypto_1.randomUUID)(),
                type: 'system',
                content: `${user.username} saiu de #${user.room}`,
                room: user.room,
                timestamp: new Date().toISOString(),
            };
            io.to(user.room).emit('system:message', systemMessage);
            io.to(user.room).emit('users:updated', (0, store_1.getUsersByRoom)(user.room));
        });
        socket.on('typing:start', (room) => {
            const user = (0, store_1.getUserBySocketId)(socket.id);
            if (!user) {
                return;
            }
            const isTyping = true;
            io.to(room).emit('typing:update', { username: user.username, isTyping });
        });
        socket.on("typing:stop", (room) => {
            const user = (0, store_1.getUserBySocketId)(socket.id);
            if (!user) {
                return;
            }
            const isTyping = false;
            io.to(room).emit('typing:update', { username: user.username, isTyping });
        });
    });
}
