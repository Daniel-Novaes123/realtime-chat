"use client";

import { useState } from "react";
import { useSocket } from "@/app/hooks/useSocket";
import { JoinScreen } from "@/components/joinScreen/joinScreen";
import { ChatLayout } from "@/components/chat/chatLayout";

export default function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const hasJoined = username !== "" && room !== "";
  const { messages, users, isTyping, joinRoom, sendMessage, leaveRoom, setMessages, startTyping, stopTyping } = useSocket();

  const handleJoin = (username: string, room: string) => {
    setUsername(username)
    setRoom(room)
    joinRoom(username, room)
  }

  const handleRoomChange = (newRoom: string) => {
    if (newRoom === room) return;
    leaveRoom(room);
    setMessages([]);
    setRoom(newRoom);
    joinRoom(username, newRoom);
  };

  return (
    <main>
      {hasJoined ? (
        <ChatLayout
          messages={messages}
          users={users}
          isTyping={isTyping}
          room={room}
          username={username}
          sendMessage={sendMessage}
          onRoomChange={handleRoomChange}
          onStartTyping={startTyping}
          onStopTyping={stopTyping}
        />
      ) : (
        <JoinScreen onJoin={handleJoin} />
      )}
    </main>
  )
};