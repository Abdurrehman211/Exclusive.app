import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const socket = io("http://localhost:3001"); // Change to your server URL

const AdminChat = ({ admin }) => {
  const [users, setUsers] = useState([]); // Added users state which was missing
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("Auth-Token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:3001/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        if (!data.success || !data.user || data.user.role !== "admin") {
          toast.error("Access Denied");
          navigate("/login");
        } else {
          sessionStorage.setItem("adminId", data.user._id);
        }
      })
      .catch(() => {
        toast.error("Session expired or unauthorized");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    // Receive incoming message
    socket.on("receive_message", (data) => {
      if (data.sender === selectedUser?._id || data.receiver === selectedUser?._id) {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser]);

  useEffect(() => {
    // Fetch users list (who have chatted)
    axios.get("http://localhost:3001/chat/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSend = () => {
    if (!message || !selectedUser) return;

    const newMessage = {
      sender: admin._id, // Changed from adminId to admin._id
      receiver: selectedUser._id,
      message,
    };

    socket.emit("send_message", newMessage);
    setChat((prev) => [...prev, { ...newMessage, timestamp: new Date().toISOString() }]);
    setMessage("");
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(`http://localhost:3001/chat/messages/${user._id}`);
      setChat(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  return (
    <div className="admin-chat-container">
      <div className="user-list">
        <h3>Users</h3>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => handleSelectUser(user)}
            className={selectedUser?._id === user._id ? "active" : ""}
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-messages">
              {chat.map((msg, i) => (
                <div key={i} className={msg.sender === admin._id ? "sent" : "received"}>
                  <p>{msg.message}</p>
                  <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminChat;