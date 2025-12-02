// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("Auth-Token");

    const newSocket = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
      auth: { token: auth },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ User connected with socket ID:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ User disconnected");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
