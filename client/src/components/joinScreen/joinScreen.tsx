"use client"

import { useState } from "react";

interface JoinScreenProps {
    onJoin: (username: string, room: string) => void;
}

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");

    const handleJoin = () => {
        if (username.trim().length < 1) {
            setError("Username obrigatório");
            return;
        }
        if (username.trim().length > 20) {
            setError("Username muito longo (máximo 20 caracteres)");
            return;
        }
        if (!room) {
            setError("Escolha uma sala");
            return;
        }
        setError("");
        onJoin(username.trim(), room);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-md">

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
                    </div>
                    <div>
                        <p className="text-white font-medium">Real Time Chat</p>
                        <p className="text-zinc-400 text-xs">Entre para começar a conversar</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                            Seu nome
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ex: Daniel"
                            autoComplete="off"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                            Escolha uma sala
                        </label>
                        <select
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            autoComplete="off"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        >
                            <option value="">— selecione —</option>
                            <option value="geral"># geral</option>
                            <option value="frontend"># frontend</option>
                            <option value="backend"># backend</option>
                            <option value="projetos"># projetos</option>
                        </select>
                    </div>

                    <button
                        onClick={handleJoin}
                        disabled={!username.trim() || !room}
                        suppressHydrationWarning
                        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                    >
                        Entrar no chat →
                    </button>
                    {error && <p className="text-rose-400 text-xs text-center mt-2">{error}</p>}
                </div>

            </div>
        </div>
    );
};