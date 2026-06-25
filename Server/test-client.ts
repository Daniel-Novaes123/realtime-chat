import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log("Conectado ao servidor! ID:", socket.id);

    // simula entrar na sala "frontend"
    socket.emit("room:join", { username: "Daniel", room: "frontend" });
});

socket.on("users:updated", (users) => {
    console.log("Usuários atualizados:", users);
});

socket.on("message:received", (message) => {
    console.log("Mensagem recebida:", message);
});

setTimeout(() => {
    socket.emit("message:send", { content: "Olá, pessoal!", room: "frontend" });
}, 1000);