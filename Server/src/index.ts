import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import type { ServerToClientEvents, ClientToServerEvents } from '../../Shared/types';
import { registerSocketHandlers } from './socket/handlers';

const allowedOrigins = [
    'http://localhost:3000',
    'https://realtime-chat-4co6-three.vercel.app',
];

const app = express();

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

registerSocketHandlers(io);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});