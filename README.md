# 💬 Real Time Chat

Chat em tempo real inspirado no Discord, construído com Next.js, Node.js e Socket.IO.

![Real Time Chat](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-white)

## Funcionalidades

-  **Conexão em tempo real** via WebSockets com Socket.IO
-  **Mensagens instantâneas** com autor, timestamp relativo e cores únicas por usuário
-  **Salas de conversa** — #geral, #frontend, #backend, #projetos
-  **Lista de usuários online** atualizada em tempo real
-  **Indicador de digitação** com debounce
-  **Histórico de mensagens** persistido no PostgreSQL
-  **Notificações de entrada e saída** de usuários
-  **Dark mode** com interface inspirada no Discord
-  **Validação de dados** com Zod no servidor

## Stack Tecnológica

### Frontend
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO Client](https://socket.io/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (hospedado no [Neon](https://neon.tech))
- [Zod](https://zod.dev/)

## Arquitetura

```
realtime-chat/
├── client/          # Next.js App Router
│   └── src/
│       ├── app/
│       │   └── page.tsx
│       ├── components/
│       │   ├── chat/
│       │   │   ├── ChatLayout.tsx
│       │   │   ├── MessageList.tsx
│       │   │   ├── MessageInput.tsx
│       │   │   ├── RoomList.tsx
│       │   │   └── UserList.tsx
│       │   └── joinScreen/
│       │       └── JoinScreen.tsx
│       ├── hooks/
│       │   └── useSocket.ts
│       └── lib/
│           ├── formatTime.ts
│           └── getUserColor.ts
├── server/          # Node.js + Express + Socket.IO
│   └── src/
│       ├── data/
│       │   └── store.ts
│       ├── lib/
│       │   └── prisma.ts
│       ├── socket/
│       │   └── handlers.ts
│       ├── validators/
│       │   └── schemas.ts
│       └── index.ts
└── shared/          # Tipos TypeScript compartilhados
    └── types.ts
```

### Fluxo de mensagens

```
Frontend (Next.js)
      ↓ socket.emit('message:send')
Socket.IO Client
      ↓
Servidor Node.js
      ↓ Valida com Zod
      ↓ Salva no PostgreSQL (Prisma)
      ↓ io.to(room).emit('message:received')
Todos os clientes na sala
      ↓
Atualização do estado React
```

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/realtime-chat.git
cd realtime-chat
```

### 2. Configure o servidor

```bash
cd server
npm install
```

Crie o arquivo `server/.env`:

```env
DATABASE_URL="sua-connection-string-do-neon"
CLIENT_URL=http://localhost:3000
```

Rode as migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

### 3. Configure o cliente

```bash
cd client
npm install
```

Crie o arquivo `client/.env.local`:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

Inicie o cliente:

```bash
npm run dev
```

### 4. Acesse

Abra [http://localhost:3000](http://localhost:3000) no navegador.

> Abra em múltiplas abas para testar o chat em tempo real!

## Variáveis de ambiente

### Server (`server/.env`)

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Connection string do PostgreSQL (Neon) |
| `CLIENT_URL` | URL do frontend (ex: http://localhost:3000) |

### Client (`client/.env.local`)

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SERVER_URL` | URL do servidor (ex: http://localhost:3001) |

## Autor

Feito por **Daniel** — [GitHub](https://github.com/Daniel-Novaes123)
