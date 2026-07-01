import { useEffect, useRef } from "react";
import type { ChatMessage } from "@shared/types";
import { formatRelativeTime } from "@/lib/formatTime";
import { getUserColor } from "@/lib/getUserColor";

interface MessageListProps {
    messages: ChatMessage[];
    currentUsername: string;
    isTyping: string[];
}

export const MessageList = ({ messages, currentUsername, isTyping }: MessageListProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            bottomRef.current?.scrollIntoView({ behavior: "instant" });
            isFirstRender.current = false;
        } else {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    return (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-zinc-500 text-sm">Nenhuma mensagem ainda. Seja o primeiro a falar!</p>
                </div>
            )}
            {messages.map((msg, index) => {
                if (msg.type === 'system') {
                    return (
                        <div key={msg.id} className="flex items-center gap-2 my-1">
                            <div className="flex-1 h-px bg-zinc-700" />
                            <p className="text-zinc-500 text-xs">{msg.content}</p>
                            <div className="flex-1 h-px bg-zinc-700" />
                        </div>
                    );
                }

                const prevMsg = messages[index - 1];
                const isGrouped =
                    prevMsg &&
                    prevMsg.type !== 'system' &&
                    prevMsg.user.username === msg.user.username;

                return (
                    <div key={msg.id} className="flex flex-col gap-0.5">
                        {!isGrouped && (
                            <div className="flex items-baseline gap-2">
                                <span className={`${getUserColor(msg.user.username)} font-medium text-sm`}>
                                    {msg.user.username}
                                </span>
                                <span className="text-zinc-500 text-xs">
                                    {formatRelativeTime(msg.timestamp)}
                                </span>
                            </div>
                        )}
                        <p className={`text-zinc-100 text-sm ${isGrouped ? 'ml-0' : ''}`}>
                            {msg.content}
                        </p>
                    </div>
                );
            })}

            {isTyping.length > 0 && (
                <p className="text-zinc-400 text-xs italic">{isTyping[0]} está digitando...</p>
            )}

            <div ref={bottomRef} />
        </div>
    );
};