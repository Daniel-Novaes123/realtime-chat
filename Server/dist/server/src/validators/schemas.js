"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = exports.joinRoomSchema = void 0;
const zod_1 = require("zod");
exports.joinRoomSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username obrigatório").max(20, "Username muito longo").trim(),
    room: zod_1.z.enum(["geral", "frontend", "backend", "projetos"]),
});
exports.sendMessageSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Mensagem vazia").max(500, "Mensagem muito longa").trim(),
    room: zod_1.z.string().min(1),
});
