"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.getUsersByRoom = getUsersByRoom;
exports.getUserBySocketId = getUserBySocketId;
const users = new Map();
function addUser(socketId, user) {
    users.set(socketId, user);
}
function removeUser(socketId) {
    users.delete(socketId);
}
function getUsersByRoom(room) {
    const allUsers = Array.from(users.values());
    return allUsers.filter((user) => user.room === room);
}
function getUserBySocketId(socketId) {
    return users.get(socketId);
}
