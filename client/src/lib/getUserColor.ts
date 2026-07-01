const COLORS = [
    "text-indigo-400",
    "text-emerald-400",
    "text-rose-400",
    "text-amber-400",
    "text-cyan-400",
    "text-violet-400",
    "text-pink-400",
    "text-teal-400",
];

export function getUserColor(username: string): string {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
}