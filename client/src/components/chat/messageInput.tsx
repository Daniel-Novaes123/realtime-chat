import { useRef, useState } from "react";

interface MessageInputProps {
    room: string;
    onSendMessage: (content: string, room: string) => void;
    onStartTyping: (room: string) => void;
    onStopTyping: (room: string) => void;
}

export const MessageInput = ({ room, onSendMessage, onStartTyping, onStopTyping }: MessageInputProps) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        onSendMessage(message, room);
        setMessage("");
    };

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        onStartTyping(room);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            onStopTyping(room);
        }, 2000);
    };

    return (
        <div className="p-4 border-t border-zinc-700 flex gap-2">
            <input
                type="text"
                value={message}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Mensagem em #${room}`}
                className="flex-1 bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                Enviar
            </button>
        </div>
    );
};