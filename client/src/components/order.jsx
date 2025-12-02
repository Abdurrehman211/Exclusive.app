import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FiMenu,
  FiX,
  FiBox,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import {
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";



function Order() {
 const navigate = useNavigate();
   const [adminDetails, setAdminDetails] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("Auth-Token");
const fetchAdminDetails = async () => {
    try {
      
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:3001/getuser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const user = response.data.user;

        if (user.role !== "admin") {
          setAccessDenied(true);
          setChecked(true);
          return;
        }

        const adminData = {
          loggedIn: true,
          name: user.name,
          email: user.email,
          role: user.role,
          Pic: user.profilePic,
        };
        sessionStorage.setItem("id", user._id);
        sessionStorage.setItem("userDetails", JSON.stringify(adminData));
        sessionStorage.setItem("id", user._id);
        setAdminDetails(adminData);
        setChecked(true);
      } else {
        console.log(response.data.message || "Error occurred");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAdminDetails();
    fetchOrders(); // Fetch orders when the component mounts
  }, []);



const fetchOrders = async () => {

    try {
        const reponse = await axios.post("http://localhost:3001/get-orders",{}, {
            headers: { authorization: `Bearer ${token}` }
        })
        if (reponse.data.success) {
            setOrders(reponse.data.orders);
        } else {
            toast.error("Failed to fetch orders");
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};


  if (!checked) {
    return <div>Loading...</div>;
  }

  if (accessDenied) {
    return (
      <div className="forbidden-container">
        <h1>403 Forbidden</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  const handleLogout = () => {
    console.log("Clearing the Session storage");
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

  const HandleRouting = () => {
    navigate("/AdminPanel/AddProduct");
  };

//Retireving orders from the server




  return (
    <>
     <div className="admin-container">
          {/* Sidebar */}
          <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">
              <h2>Admin Panel</h2>
            </div>
    
            <nav className="sidebar-nav">
              <ul>
                <li className="active">
                  <FiBox />
                  <span>Dashboard</span>
                </li>
                <li onClick={HandleRouting}>
                  <FaBoxOpen /> Products
                </li>
                <li>
                  <FiUsers />
                  <span>Users</span>
                </li>
                <li onClick={() => {
                  navigate("/AdminPanel/Orders");
                }}>
                  <FaShoppingCart /> Orders
                </li>
                <li
                  onClick={() => {
                    navigate("/admin-chat");
                  }}
                >
                  <FaUsers /> Chats
                </li>
              </ul>
            </nav>
          </aside>
          <main className="main-content">
    
            <header className="admin-header">
              <button onClick={toggleSidebar} className="toggle-btn">
                {isSidebarOpen ? <FiX /> : <FiMenu />}
              </button>
              <div className="header-left">
                <h1>
                  Welcome back, <span>{adminDetails?.name}</span>
                </h1>
              </div>
              <div className="header-right">
                <a style={{ textDecoration: "none" }} onClick={handleLogout}>
                  <button className="logout-btn">
                    <FiLogOut />
                    <span style={{ color: "white" }}>Logout</span>
                  </button>
                </a>
              </div>
            </header>
    
            {/* Products Section */}
            <section className="products-section">
              <div className="section-header">
                <h2>Manage Orders</h2>
                {/* <button className="add-product-btn" onClick={HandleRouting}>+ Add New Product</button> */}
              </div>
    
          <div className="products-table-container">
  <table className="products-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Tracker</th>
        <th>Amount</th>
        <th>Payment</th>
        <th>Status</th>
        <th>Customer</th>
        <th>City</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order._id}>
          <td>{order.order_id}</td>
          <td>{order.tracker}</td>
          <td>{order.amount} {order.currency}</td>
          <td>{order.paymentMethod}</td>
          <td>{order.status}</td>
          <td>{order.address.name}</td>
          <td>{order.address.city}</td>
          <td>{new Date(order.createdAt).toLocaleString()}</td>
          <td className="actions" style={{ display: "flex", gap: "10px" }}>
            <button
              className="view-btn"
              onClick={() => console.log(order.items)}
              title="View Items"
            >
              <FiEdit style={{ marginRight: "4px" }} />
            </button>
            <button
              className="delete-btn"
              onClick={() => console.log("Delete logic here")}
              title="Delete"
            >
             <FiTrash style={{ marginRight: "4px" }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            </section>
          </main>
        </div>
    </>
  );
}
export default Order;