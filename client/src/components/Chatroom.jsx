// src/chat/ChatRoom.js
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const auth = sessionStorage.getItem("Auth-Token");
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
  auth:{
    token: auth
  },
});
 // Replace with your backend URL

const ChatRoom = ({ user }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [adminID, setUserId] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Listen for new messages
    socket.on('receive_message', (data) => {
      setChat(prev => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [user.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
const userId ='683df0d88971fa30a49c50a9';
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: user.id,
      receiver: userId, // or another user ID
      message,
      timestamp: new Date(),
    };

 socket.emit('send_message', { receiver_id: userId, message });

 socket.on("message_sent", (saved) => {
 setChat(prev => [...prev, saved]);
 })
  socket.on("receive_message", (message) => {
      setChat((prev) => [...prev, message]);
      alert(message);
        alert(message.sender);
    });
    // Save message to DB
    setMessage("");
  };

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', maxWidth: 500 }}>
      <h3>Chat Room</h3>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ddd', padding: 10 }}>
        {chat.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10, textAlign: msg.sender === user.id ? 'right' : 'left' }}>
            <b>{msg.sender === user.id ? 'You' : msg.sender}</b>: {msg.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          style={{ width: '80%', padding: 5 }}
        />
        <button onClick={sendMessage} style={{ padding: '6px 10px' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
