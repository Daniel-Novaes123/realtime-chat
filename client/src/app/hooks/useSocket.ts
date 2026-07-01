import { useRef, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
import type { User, ServerToClientEvents, ClientToServerEvents, ChatMessage } from "@shared/types";

export function useSocket() {
    const socketRef = useRef<SocketType | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState<string[]>([]);

    useEffect(() => {
        if (socketRef.current?.connected) return;
        socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL!);
        const socket = socketRef.current;

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on('message:received', (message) => {
            setMessages((prev) => [...prev, message]);
        })

        socket.on('users:updated', (user) => {
            setUsers(user)
        })

        socket.on('typing:update', (payload) => {
            if (payload.isTyping) {
                setIsTyping((prev) => [...prev, payload.username]);
            } else {
                setIsTyping((prev) => prev.filter((username) => username !== payload.username));
            }
        })

        socket.on('history:received', (history) => {
            setMessages(history);
        });

        socket.on('system:message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };

    }, [])
    function joinRoom(username: string, room: string) {
        if (!socketRef.current) return;

        if (socketRef.current.connected) {
            socketRef.current.emit('room:join', { username, room });
        } else {
            socketRef.current.once('connect', () => {
                socketRef.current?.emit('room:join', { username, room });
            });
        }
    }

    function sendMessage(content: string, room: string) {
        if (!socketRef.current) return;
        socketRef.current.emit('message:send', { content, room });
    }

    function leaveRoom(room: string) {
        if (!socketRef.current) return;
        socketRef.current.emit('room:leave', room);
    }

    function startTyping(room: string) {
        if (!socketRef.current) return;
        socketRef.current.emit('typing:start', room);
    }

    function stopTyping(room: string) {
        if (!socketRef.current) return;
        socketRef.current.emit('typing:stop', room);
    }

    return { messages, users, isConnected, isTyping, joinRoom, sendMessage, leaveRoom, setMessages, startTyping, stopTyping }
}