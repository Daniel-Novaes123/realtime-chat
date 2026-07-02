import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import type { ServerToClientEvents, ClientToServerEvents } from '../../Shared/types';
import { registerSocketHandlers } from './socket/handlers';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
console.log('CLIENT_URL:', JSON.stringify(CLIENT_URL));

const app = express();
app.use(cors({ origin: CLIENT_URL }));

const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
        origin: CLIENT_URL,
        methods: ['GET', 'POST'],
    },
});

registerSocketHandlers(io);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});