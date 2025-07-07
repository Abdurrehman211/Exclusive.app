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
const Admin = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [checked, setChecked] = useState(false);

  const fetchAdminDetails = async () => {
    try {
      const token = sessionStorage.getItem("Auth-Token");
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
  }, []);

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

  return <AdminPage adminDetails={adminDetails} />;
};

const AdminPage = ({ adminDetails }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      const response = await axios.post("http://localhost:3001/get-product");
      const data = response.data;
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };
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
  return (
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
            <h2>Manage Products</h2>
            {/* <button className="add-product-btn" onClick={HandleRouting}>+ Add New Product</button> */}
          </div>

          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Actions</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.Title}</td>
                    <td>PKR {product.Price}</td>
                    <td>{product.Stock}</td>

                    <td>{product.Category}</td>
                    <td>{product.Rating}</td>
                    <td className="actions">
                      <button className="">
                        <FiEdit style={{ marginRight: "4px" }} />
                      </button>
                      <button
                        className=""
                        onClick={() =>
                          setProducts(
                            products.filter((p) => p._id !== product._id)
                          )
                        }
                      >
                        <FiTrash style={{ marginRight: "4px" }} />
                      </button>
                    </td>
                    <td>{product.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div className="stats mt-5">
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
            <h3>{products.length}</h3>
            <p>Products Available</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Add CSS Styles
const styles = `
    .admin-container {
      display: grid;
      grid-template-columns: auto 1fr;
      min-height: 100vh;
      background-color: #f5f6fa;
    }
  
   .admin-container .sidebar {
      background: #2a3042;
      color: white;
      width: 280px;
      transition: all 0.3s;
      padding: 20px;
    }
  
    .sidebar.closed {
      margin-left: -290px;
    }
  
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }
  
    .toggle-btn {
      background: none;
      border: none;
      color: black;
      font-size: 1.5rem;
      cursor: pointer;
    }
  
    .sidebar-nav ul {
      list-style: none;
      padding: 0;
    }
  
    .sidebar-nav li {
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;
      transition: all 0.3s;
    }
  
    .sidebar-nav li:hover,
    .sidebar-nav li.active {
      background: #3a4055;
    }
  
    .main-content {
      padding: 30px;
    }
  
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }
  
    .admin-header h1 {
      color: #2a3042;
      font-size: 1.8rem;
    }
  
    .admin-header span {
      color: #6366f1;
    }
  
    .logout-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.3s;
    }
  
    .logout-btn:hover {
      background: #4f46e5;
    }
  
    .products-section {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
  
    .add-product-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
  
    .add-product-btn:hover {
      background: #059669;
    }
  
    .products-table {
      width: 100%;
      border-collapse: collapse;
    }
  
    .products-table th,
    .products-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
  
    .products-table th {
      background: #f8fafc;
      color: #64748b;
    }
  
    .products-table tr:hover {
      background: #f8fafc;
    }
  
    .actions button {
      padding: 8px 15px;
      margin: 0 5px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
    }
  
    .edit-btn {
      background: #3b82f6;
      color: white;
    }
  
    .edit-btn:hover {
      background: #2563eb;
    }
  
    .delete-btn {
      background: #ef4444;
      color: white;
    }
  
    .delete-btn:hover {
      background: #dc2626;
    }
  `;

// Inject styles
document.head.appendChild(document.createElement("style")).textContent = styles;

export default Admin;
