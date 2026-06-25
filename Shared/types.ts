export interface User {
    id: string;
    username: string;
    room: string;
}

export interface Message {
    id: string;
    type?: 'message'
    user: User;
    content: string;
    timestamp: string;
    room: string;
}

export interface SystemMessage {
    id: string;
    type: 'system';
    content: string;
    room: string;
    timestamp: string;
}

export interface ServerToClientEvents {
    'message:received': (message: Message) => void;
    'users:updated': (users: User[]) => void;
    'user:joined': (user: User) => void;
    'user:left': (user: User) => void;
    'typing:update': (payload: { username: string; isTyping: boolean }) => void;
    'history:received': (message: Message[]) => void
    'system:message': (message: SystemMessage) => void;
}

export interface ClientToServerEvents {
    'message:send': (payload: { content: string; room: string }) => void;
    'room:join': (payload: { username: string; room: string }) => void;
    'room:leave': (room: string) => void;
    'typing:start': (room: string) => void;
    'typing:stop': (room: string) => void;
}

export type ChatMessage = Message | SystemMessage;