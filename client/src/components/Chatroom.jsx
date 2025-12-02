import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./AdminChat.css";
import { useSocket } from "./context/Socketcontext";

const ChatRoom = ({ user }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);
const [firstMessageSent, setFirstMessageSent] = useState(false);
const socket = useSocket();

const navigate = useNavigate();
  // Debug connection status
 useEffect(() => {
  if (!socket) return;

console.log("Socket connection status:", socket?.connected);

  const onConnect = () => console.log("Connected to server with ID:", socket.id);
  const onDisconnect = () => console.log("Disconnected from server");

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
  };
}, [socket]);

  // Message handling
  useEffect(() => {
  if (!socket) return;

  const handleIncomingMessage = (data) => {
    setChat(prev => {
      const exists = prev.some(msg => 
        (msg._id?.toString() === data._id?.toString()) || 
        (msg.tempId && msg.tempId === data.tempId)
      );
      if (exists) return prev;

      return [
        ...prev,
        {
          ...data,
          isOptimistic: false,
          timestamp: new Date(data.timestamp)
        }
      ];
    });
  };

  socket.on("new_message", handleIncomingMessage);
  socket.on("receive_message", handleIncomingMessage);
  socket.on("message_sent", handleIncomingMessage);

  return () => {
    socket.off("new_message", handleIncomingMessage);
    socket.off("receive_message", handleIncomingMessage);
    socket.off("message_sent", handleIncomingMessage);
  };
}, [socket, user]);

  const sendMessage = () => {
      if (!firstMessageSent) setFirstMessageSent(true);
    if (!message.trim()) return;

    const tempId = Date.now().toString();
    const receiver_id = "683df0d88971fa30a49c50a9"; // Admin ID
    
    // Optimistic update with tempId
    setChat(prev => [...prev, {
      _id: tempId,
      tempId,
      sender: user.id,
      receiver: receiver_id,
      message,
      timestamp: new Date(),
      isOptimistic: true
    }]);
    
    socket.emit("send_message", { 
      receiver_id, 
      message,
      tempId // Include tempId for deduplication
    });
    
    setMessage("");
  };

  // Error handling
  useEffect(() => {
    if (!socket) return;
    const errorHandler = (error) => {
      console.error("Socket error:", error);
      // Display to user if needed
    };

    socket.on("message_error", errorHandler);
    socket.on("connect_error", errorHandler);

    return () => {
      socket.off("message_error", errorHandler);
      socket.off("connect_error", errorHandler);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat-area" style={{ height: "70vh", overflow: "none" }}>
   <div className="chat-header d-flex justify-content-between align-items-center p-2 bg-primary text-white rounded">
      <button
        onClick={() => navigate("/Userpanel")} // Change to your actual admin panel route
        className="btn btn-sm btn-outline-light mx-5"
        aria-label="Back to Admin Panel"
        style={{ fontSize: "1.25rem" }}
      >
        ←
      </button>

      <h4 className="mb-0 flex-grow-1" style={{ paddingRight: "2rem" }}>
        💬 Chat with Admin
      </h4>

      <div className="connection-status badge bg-light text-dark">
        {socket?.connected ? "🟢 Connected" : "🔴 Disconnected"}
      </div>
    </div>

  {/* Alert when user sends the first message */}
  {chat.length === 0 && (
    <div className="alert alert-warning mt-3 mx-2" role="alert">
      <strong>Heads up!</strong> Your message will notify an admin. Make sure it's something meaningful. <br />
      <strong>Admin will respond when he gets the message. Donot leave the Site.</strong>
    </div>
  )}

  <div className="chat-messages p-3 border bg-light rounded mt-2" style={{ height: "60vh", overflowY: "auto" }}>

    {chat.map((msg, idx) => (
      <div
        key={msg._id || idx}
        className={`message ${msg.sender === user.id ? "sent" : "received"} ${
          msg.isOptimistic ? "optimistic" : ""
        } mb-2`}
      >
        <div className="d-flex flex-column">
          <span className="fw-bold">{msg.sender === user.id ? "🧑 You" : "👨‍💼 Admin"}:</span>
          <span className=" p-2 ">{msg.message}</span>
          <small className="text-muted message-time mt-1">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </small>
        </div>
      </div>
    ))}
    <div ref={chatEndRef} />
  </div>

  <div className="chat-input-container mt-3">
    <div className="chat-input-wrapper d-flex">
      <input
        type="text"
        className="chat-input form-control me-2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="send-button btn btn-success"
        onClick={sendMessage}
        disabled={!socket?.connected || !message.trim()}
      >
        {socket?.connected ? "📨 Send" : "⏳ Connecting..."}
      </button>
    </div>
  </div>
</div>

  );
};

export default ChatRoom;