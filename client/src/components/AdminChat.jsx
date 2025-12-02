import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminChat.css";
import { useNotifications } from "./context/NotificationContext";

const AdminChat = ({ admin }) => {
  const { addNotification } = useNotifications();

  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [newMessageUsers, setNewMessageUsers] = useState(new Set());
  const [adminId, setAdminId] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [typingUsers, setTypingUsers] = useState(new Set());
  useEffect(() => {
    const token = sessionStorage.getItem("Auth-Token");
    if (!token) return;

    const newSocket = io("http://localhost:3001", {
      auth: { token },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Admin connected with socket ID:", newSocket.id);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);
  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);
  useEffect(() => {
    if (!socket) return;

    socket.on("typing", (userId) => {
      setTypingUsers((prev) => new Set(prev).add(userId));

      // remove after timeout
      setTimeout(() => {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      }, 2000);
    });

    return () => socket.off("typing");
  }, [socket]);
  useEffect(() => {
    const token = sessionStorage.getItem("Auth-Token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3001/getuser", {
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
    if (!socket) return;

    const handleNewMessage = (data) => {
      setChat((prev) => [...prev, data]);

      if (data.sender !== admin._id) {
        // ✅ If currently viewing this user, mark it read
        if (selectedUser && data.sender === selectedUser._id) {
          socket.emit("mark_read", { messageId: data._id });
        } else {
          // otherwise notify
          const sender = users.find((u) => u._id === data.sender);
          addNotification({
            id: `chat-${data.sender}-${Date.now()}`,
            title: "New Chat Message",
            message: `${sender?.name || "A user"}: ${data.message}`,
            onClick: () => navigate(`/admin/chat?select=${data.sender}`),
            isChatNotification: true,
          });
          setNewMessageUsers((prev) => new Set(prev).add(data.sender));
        }
      }
    };

    const handleTyping = (userId) => {
      // Sidebar typing state
      setTypingUsers((prev) => new Set(prev).add(userId));

      setTimeout(() => {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      }, 4000);

      // Chat window typing state
      if (userId === selectedUser?._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 4000);
      }
    };
    socket.on("new_message", handleNewMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("typing", handleTyping);
    };
  }, [socket, selectedUser]);
  //   useEffect(() => {
  // const handleNewMessage = (data) => {
  //   setChat(prev => {
  //     // Check if message already exists
  //     const exists = prev.some(msg =>
  //       msg._id === data._id ||
  //       (msg.tempId && msg.tempId === data.tempId)
  //     );

  //     if (!exists) {
  //       return [...prev, data];
  //     }
  //     return prev;
  //   });

  //   // Rest of your logic for unread indicators...
  // };
  //   const handleTyping = (userId) => {
  //       if (userId === selectedUser?._id) {
  //         setTyping(true);
  //         const timer = setTimeout(() => setTyping(false), 2000);
  //         return () => clearTimeout(timer);
  //       }
  //     };

  //    socket.on("new_message", handleNewMessage);
  //   socket.on("typing", handleTyping);

  //     return () => {
  //     socket.off("new_message", handleNewMessage);
  //     socket.off("typing", handleTyping);
  //   };
  //   }, [selectedUser, admin._id]);
  useEffect(() => {
    if (!socket) return;

    
    socket.on("message_sent", (data) => {
      setChat((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === data.tempId
            ? { ...msg, status: "sent", _id: data._id }
            : msg
        )
      );
    });

    socket.on("message_delivered", (data) => {
      setChat((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === data._id ? { ...msg, status: "delivered" } : msg
        )
      );
    });

    socket.on("message_read", (data) => {
      setChat((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === data._id ? { ...msg, status: "read" } : msg
        )
      );
    });

    return () => {
      socket.off("message_sent");
      socket.off("message_delivered");
      socket.off("message_read");
    };
  }, [socket]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/chat/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSend = () => {
    if (!message || !selectedUser) return;

    const tempId = Date.now().toString();

    // Optimistic update
    setChat((prev) => [
      ...prev,
      {
        _id: tempId,
        sender: admin._id,
        receiver: selectedUser._id,
        message,
        timestamp: new Date(),
        isOptimistic: true, // Optional flag
      },
    ]);

    socket.emit("send_message", {
      receiver_id: selectedUser._id,
      message,
      tempId,
    });

    setMessage("");
  };
  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setNewMessageUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(user._id);
      return newSet;
    });

    try {
      const response = await axios.get(
        `http://localhost:3001/chat/messages/${user._id}`
      );
      setChat(response.data);

      // ✅ Mark unread messages as read
      response.data.forEach((msg) => {
        if (msg.receiver === admin._id && msg.status !== "read") {
          socket.emit("mark_read", { messageId: msg._id });
        }
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    } else if (selectedUser) {
      socket.emit("typing", selectedUser._id);
    }
  };

  const getRandomColor = (str) => {
    const colors = [
      "#3498db",
      "#e74c3c",
      "#2ecc71",
      "#f39c12",
      "#9b59b6",
      "#1abc9c",
      "#d35400",
      "#34495e",
    ];
    const index = str.charCodeAt(0) % colors.length;
    return colors[index];
  };
  // Add to both components:
  useEffect(() => {
    if (!socket) return;

    const handleMessageError = (error) => {
      console.error("Message error:", error);
    };

    const handleConnectError = (err) => {
      console.error("Socket connection error:", err);
    };

    socket.on("message_error", handleMessageError);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("message_error", handleMessageError);
      socket.off("connect_error", handleConnectError);
    };
  }, [socket]);
  return (
    <div className="admin-chat-app">
      <div className="user-sidebar">
        <div className="sidebar-header">
          <h2>Chat Users</h2>
        </div>
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user._id}
              className={`user-item ${
                selectedUser?._id === user._id ? "active" : ""
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <div
                className="user-avatar"
                style={{ backgroundColor: getRandomColor(user._id) }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div
                  className={`user-status ${
                    user.isOnline ? "online" : "offline"
                  }`}
                >
                  {typingUsers.has(user._id)
                    ? "Typing..."
                    : user.isOnline
                    ? "Online"
                    : "Offline"}
                </div>
              </div>
              {newMessageUsers.has(user._id) && (
                <div className="unread-badge">!</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div
                className="user-avatar"
                style={{ backgroundColor: getRandomColor(selectedUser._id) }}
              >
                {selectedUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{selectedUser.name}</div>
                <div className="user-status online">Online</div>
              </div>
            </div>
            <div className="chat-messages">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === admin._id ? "sent" : "received"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {msg.sender === admin._id && (
                      <span className={`status ${msg.status}`}>
                        {msg.status === "read"
                          ? "✓✓"
                          : msg.status === "delivered"
                          ? "✓"
                          : "⏳"}
                      </span>
                    )}
                  </span>
                </div>
              ))}
              {typing && (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  className="chat-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                />
                <button className="send-button" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>Select a user to start chatting</h3>
            <p>Choose from the list on the left</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
