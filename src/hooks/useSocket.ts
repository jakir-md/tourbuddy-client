// client/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Singleton Pattern: Prevent multiple connections
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
        withCredentials: true,
        autoConnect: false, // We connect manually
      });
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Connect now
    if (!socket.connected) socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return { socket, isConnected };
};
