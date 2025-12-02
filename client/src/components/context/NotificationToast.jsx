import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useNotifications } from "./NotificationContext";
import './notifcation.css';
import { useNavigate } from "react-router-dom"; 
const NotificationToast = () => {
  const { notifications, removeNotification } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

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
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, removeNotification, isChatPage]);

  // Filter out chat notifications when on chat page
  const visibleNotifications = notifications.filter(
    (notification) => !notification.isChatNotification || !isChatPage
  );

  return (
 <div className="notifications-container" style={{ position: "fixed", top: "1rem", right: "1rem"}}>
      {visibleNotifications.map((n) => (
        <div key={n.id} className="success">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="succes-svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 
                  000 16zm3.707-9.293a1 1 0 
                  00-1.414-1.414L9 10.586 7.707 
                  9.293a1 1 0 
                  00-1.414 1.414l2 2a1 1 0 
                  001.414 0l4-4z"
                />
              </svg>
            </div>
            <div className="success-prompt-wrap">
              <p className="success-prompt-heading">{n.title}</p>
              <div className="success-prompt-prompt">
                <p>{n.message}</p>
              </div>
              <div className="success-button-container">
                {n.onClick && (
                  <button
                    className="success-button-main"
                    type="button"
                    onClick={() => {
                      navigate(`admin-chat`)
                      removeNotification(n.id);
                    }}
                  >
                    View
                  </button>
                )}
                <button
                  className="success-button-secondary"
                  type="button"
                  onClick={() => removeNotification(n.id)}
                >
                  Dismiss
                </button>
              </div>
              {n.isChatNotification && (
                <div className="text-muted small mt-1">Click “View” to open chat</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
