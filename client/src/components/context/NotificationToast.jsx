import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNotifications } from "./NotificationContext";

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotifications();
  const location = useLocation();
  
  // Check if current page is chat page
  const isChatPage = location.pathname.startsWith("/admin/chat");

  useEffect(() => {
    const timers = [];
    
    notifications.forEach((notification) => {
      // Skip chat notifications if on chat page
      if (notification.isChatNotification && isChatPage) return;
      
      // Set different timeout for chat vs regular notifications
      const timeout = notification.isChatNotification ? 8000 : 5000;
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, timeout);
      
      timers.push(timer);
    });

    return () => {
      // Clean up all timers
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, removeNotification, isChatPage]);

  // Filter out chat notifications when on chat page
  const visibleNotifications = notifications.filter(
    notification => !notification.isChatNotification || !isChatPage
  );

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
      {visibleNotifications.map((notification) => (
        <Toast
          key={notification.id}
          onClick={notification.onClick}
          onClose={() => removeNotification(notification.id)}
          autohide={!notification.isChatNotification}
          delay={notification.isChatNotification ? 8000 : 5000}
          style={{ 
            cursor: notification.onClick ? "pointer" : "default",
            borderLeft: notification.isChatNotification ? "4px solid #4e73df" : "none"
          }}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {notification.isChatNotification ? (
                <>
                  <i className="fas fa-comment-alt me-2"></i>
                  {notification.title}
                </>
              ) : notification.title}
            </strong>
          </Toast.Header>
          <Toast.Body>
            {notification.message}
            {notification.isChatNotification && (
              <div className="text-muted small mt-1">Click to open chat</div>
            )}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default NotificationToast;