import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './dashboard.css';
import { FaShoppingCart, FaUsers, FaChartLine, FaBoxOpen,FaCog, FaSignOutAlt   } from 'react-icons/fa';
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { googleLogout } from '@react-oauth/google';
import profile from './images/Profile.png';
import AddressCard from "./AddressCard";
function Userpanel() {
const navigate = useNavigate();
const [user, setUser] = useState({
  email: "",
  name: "",
});
const [userAddress, setUserAddress] = useState(null);


useEffect(() => {
  const controller = new AbortController();
  FetchuserDetail(controller.signal);

  return () => {
    controller.abort(); // cancel on unmount
  };
}, []);

const FetchuserDetail = async () => {
  try {
      const token = sessionStorage.getItem("Auth-Token");
      const role = sessionStorage.getItem("User-Role"); // Get user role
      if (!token) {
          navigate("/login");
          return;
      }

      const response = await axios.get('https://exclusive-app-z5t7.onrender.com/getuser', {
          headers: { 'Authorization': `Bearer ${token}` }
      });

     
      if (response.data.success) {
          setUser({
              name: response.data.user.name || "Username",
              email: response.data.user.email || "example@gmail.com",
              profilePic: response.data.user.profilePic || "",
          });

          console.log("User Details:", response);
          // Set user address
 setUserAddress(response.data.user.address);
          let userDetails = {
              loggedIn: true,
              name: response.data.user.name,
              email: response.data.user.email,
              role: response.data.user.role,
              Pic: response.data.user.profilePic,
          };
           const link = userDetails.Pic;
               sessionStorage.setItem('id',response.data.user._id
);
           sessionStorage.setItem("userDetails", JSON.stringify(userDetails));


          // Redirect if admin
          if (role === "admin") {
              navigate("/AdminPanel");
          }
      } else {
          console.log(response.data.message || 'Error Occurred');
      }
  } catch (error) {
      console.log("An error Occurred", error);
      console.error(error);
  }
};
 const handleLogout = () => {


  console.log("Clearing the Session storage")
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
    return(
<>
<div className="dashboard">
      <aside className="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          <li><FaChartLine /> Overview</li>
        
          <li onClick={()=>{
            navigate("/Account");
          }}><FaCog/> Settings</li>
          <li onClick={()=>{
            window.location.href = "/chat-room";
          }}><FaUsers/> Chats</li>
          <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
        </ul>
      </aside>
      <main className="content">
        <h1>Welcome to the Dashboard</h1>
        <div className="profile-section">
            <div className="profile-info"> 
           <img 
  src={user.profilePic ? user.profilePic : profile} 
  alt="Profile" 
  className="profile-image"
/>
              <div className="profile-details">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>
          </div>
        
  <AddressCard userAddress={userAddress} />

      </main>
     
    </div>
   
</>

    )

}

export default Userpanel;