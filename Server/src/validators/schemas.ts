import { z } from "zod";

export const joinRoomSchema = z.object({
    username: z.string().min(1, "Username obrigatório").max(20, "Username muito longo").trim(),
    room: z.enum(["geral", "frontend", "backend", "projetos"]),
});

export const sendMessageSchema = z.object({
    content: z.string().min(1, "Mensagem vazia").max(500, "Mensagem muito longa").trim(),
    room: z.string().min(1),
});