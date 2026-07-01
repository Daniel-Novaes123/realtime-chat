interface RoomListProps {
    currentRoom: string;
    onRoomChange: (room: string) => void;
}

export const RoomList = ({ currentRoom, onRoomChange }: RoomListProps) => {
    const rooms = ["geral", "frontend", "backend", "projetos"];

    return (
        <div className="flex flex-col gap-1 p-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1">
                Salas
            </p>
            {rooms.map((room) => (
                <button
                    key={room}
                    onClick={() => onRoomChange(room)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${room === currentRoom
                            ? "bg-zinc-600 text-white font-medium"
                            : "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                        }`}
                >
                    # {room}
                </button>
            ))}
        </div>
    );
};