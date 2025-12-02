// UserSocketWrapper.js
import React from "react";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "./context/Socketcontext";

const UserSocketWrapper = () => {
  return (
    <SocketProvider>
      <Outlet />  {/* This renders the nested routes */}
    </SocketProvider>
  );
};

export default UserSocketWrapper;
