import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiMenu, FiX, FiBox, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
const Admin = () => {
    const navigate = useNavigate();
    const [adminDetails, setAdminDetails] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const data = sessionStorage.getItem("userDetails");

        if (!data) {
            setChecked(true);
            navigate("/login");
            return;
        }

        const adminData = JSON.parse(data);

        if (!adminData.loggedIn) {
            setChecked(true);
            navigate("/login");
            return;
        }

        if (adminData.role !== "admin") {
            setAccessDenied(true);
            setChecked(true);
            return;
        }

        setAdminDetails(adminData);
        setChecked(true);
    }, [navigate]); // ✅ No external function, warning is gone

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
    const [products, setProducts] = useState([
      { id: 1, name: 'Luxury Watch', price: 2500, stock: 15, category: 'Accessories' },
      { id: 2, name: 'Designer Bag', price: 3500, stock: 8, category: 'Fashion' },
      // Add more mock products
    ]);
  
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
    const handleDeleteProduct = (productId) => {
      setProducts(products.filter(product => product.id !== productId));
    };
  
    return (
      <div className="admin-container">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <button onClick={toggleSidebar} className="toggle-btn">
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li className="active">
                <FiBox />
                <span>Products</span>
              </li>
              <li>
                <FiUsers />
                <span>Users</span>
              </li>
              <li>
                <FiSettings />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="admin-header">
            <div className="header-left">
              <h1>Welcome back, <span>{adminDetails?.name}</span></h1>
            </div>
            <div className="header-right">
              <a href="/logout" style={{ textDecoration: 'none' }}>  
              <button className="logout-btn">
                <FiLogOut />
                <span style={{color:"white"}}>Logout</span>
              </button>
              </a>
            </div>
          </header>
  
          {/* Products Section */}
          <section className="products-section">
            <div className="section-header">
              <h2>Manage Products</h2>
              <button className="add-product-btn">+ Add New Product</button>
            </div>
  
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.category}</td>
                      <td className="actions">
                        <button className="edit-btn">Edit</button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
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
  
    .sidebar {
      background: #2a3042;
      color: white;
      width: 280px;
      transition: all 0.3s;
      padding: 20px;
    }
  
    .sidebar.closed {
      margin-left: -280px;
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
      color: white;
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
  document.head.appendChild(document.createElement('style')).textContent = styles;
  

export default Admin;
