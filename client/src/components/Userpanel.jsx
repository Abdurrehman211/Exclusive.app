import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './dashboard.css';
import { FaShoppingCart, FaUsers, FaChartLine, FaBoxOpen,FaCog, FaSignOutAlt   } from 'react-icons/fa';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import profile from './images/Profile.png';
function Userpanel() {
const navigate = useNavigate();
const [user, setUser] = useState({
  email: "",
  name: "",
});

useEffect(() => { 
  FetchuserDetail(); 
}, );

const FetchuserDetail = async () => {
  try {
      const token = sessionStorage.getItem("Auth-Token");
      const role = sessionStorage.getItem("User-Role"); // Get user role
      if (!token) {
          navigate("/login");
          return;
      }

      const response = await axios.get('http://localhost:3001/getuser', {
          headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(response.data);
      if (response.data.success) {
          setUser({
              name: response.data.user.name || "Username",
              email: response.data.user.email || "example@gmail.com",
          });

          let userDetails = {
              loggedIn: true,
              name: response.data.user.name,
              email: response.data.user.email,
              role: response.data.user.role
          };
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

    return(
<>
<div className="dashboard">
      <aside className="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          <li><FaChartLine /> Overview</li>
          <li><FaShoppingCart /> Orders</li>
          <li><FaUsers /> Customers</li>
          <li><FaBoxOpen /> Products</li>
          <li><FaCog/> Settings</li>
          <li onClick={() => navigate("/Logout")}><FaSignOutAlt /> Logout</li>
        </ul>
      </aside>
      <main className="content">
        <h1>Welcome to the Dashboard</h1>
        <div className="profile-section">
            <div className="profile-info">
              <img 
                src={profile} 
                alt="Profile" 
                className="profile-image"
              />
              <div className="profile-details">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>
          </div>
        <div className="stats">
          <div className="stat-card">
            <FaShoppingCart />
            <h3>1,250</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <FaUsers />
            <h3>3,500</h3>
            <p>Customers</p>
          </div>
          <div className="stat-card">
            <FaChartLine />
            <h3>$120,000</h3>
            <p>Revenue</p>
          </div>
          <div className="stat-card">
            <FaBoxOpen />
            <h3>650</h3>
            <p>Products Available</p>
          </div>
        </div>
      </main>
     
    </div>
   
</>

    )

}

export default Userpanel;