import type { User } from "@shared/types";

interface UserListProps {
    users: User[];
}

export const UserList = ({ users }: UserListProps) => {
    return (
        <div className="flex flex-col gap-1 p-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1">
                Online — {users.length}
            </p>
            {users.map((user) => (
                <div key={user.id} className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-700 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-medium text-indigo-400 shrink-0">
                        {user.username[0].toUpperCase()}
                    </div>
                    <p className="text-sm text-zinc-200 truncate">{user.username}</p>
                </div>
            ))}
        </div>
    );
};