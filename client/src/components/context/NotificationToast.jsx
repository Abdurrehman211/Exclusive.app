import React, { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNotifications } from "./NotificationContext";

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    // Automatically remove notifications after 5 seconds
    notifications.forEach((notification) => {
      setTimeout(() => removeNotification(notification.id), 5000);
    });
  }, [notifications, removeNotification]);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
      {notifications.map(({ id, title, message, onClick }) => (
        <Toast key={id} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default NotificationToast;
