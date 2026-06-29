import type { User } from '../../../Shared/types';

const users: Map<string, User> = new Map();

export function addUser(socketId: string, user: User) {
    users.set(socketId, user);
}

export function removeUser(socketId: string) {
    users.delete(socketId)
}

export function getUsersByRoom(room: string): User[] {
    const allUsers = Array.from(users.values());
    return allUsers.filter((user) => user.room === room)
}

export function getUserBySocketId(socketId: string): User | undefined {
    return users.get(socketId)
}