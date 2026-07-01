import type { ChatMessage, User } from "@shared/types";
import { MessageInput } from "./messageInput";
import { MessageList } from "./messageList";
import { RoomList } from "./roomList";
import { UserList } from "./userList";

interface ChatLayoutProps {
    messages: ChatMessage[];
    users: User[];
    isTyping: string[];
    room: string;
    username: string;
    sendMessage: (content: string, room: string) => void;
    onRoomChange: (room: string) => void;
    onStartTyping: (room: string) => void;
    onStopTyping: (room: string) => void;
}

export const ChatLayout = ({ messages, users, isTyping, room, username, sendMessage, onRoomChange, onStartTyping, onStopTyping }: ChatLayoutProps) => {
    return (
        <div className="flex h-screen bg-zinc-900 text-white">
            <aside className="w-56 bg-zinc-800 border-r border-zinc-700 shrink-0">
                <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="font-semibold text-white text-sm">Real Time Chat</p>
                    <p className="text-zinc-400 text-xs">v1.0</p>
                </div>
                <RoomList currentRoom={room} onRoomChange={onRoomChange} />
            </aside>
            <div className="flex flex-col flex-1 min-w-0">
                <header className="px-4 py-3 border-b border-zinc-700 shrink-0">
                    <p className="font-medium text-sm"># {room}</p>
                </header>

                <MessageList
                    messages={messages}
                    currentUsername={username}
                    isTyping={isTyping}
                />

                <MessageInput
                    room={room}
                    onSendMessage={sendMessage}
                    onStartTyping={onStartTyping}
                    onStopTyping={onStopTyping}
                />
            </div>

            <aside className="w-48 bg-zinc-800 border-l border-zinc-700 shrink-0">
                <UserList users={users} />
            </aside>

        </div>
    );
};