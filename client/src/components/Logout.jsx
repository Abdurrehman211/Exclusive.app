import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLogout } from '@react-oauth/google';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout
    handleLogout();
  }, []);

  const handleLogout = () => {

  sessionStorage.clear(); // Remove all session storage items at once


    // Google logout
    googleLogout();

    // Show toast
    toast.info("Please Login Again", {
      position: "top-right",
      autoClose: 3000,
    });

    // Navigate to login/home
    navigate("/");
  };

 // Optional: or show a "Logging out..." spinner
};

export default Logout;
