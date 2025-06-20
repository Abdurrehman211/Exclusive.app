import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Addproduct.css';
import { FiMenu, FiX, FiBox, FiUsers, FiLogOut } from 'react-icons/fi';
import { FaBoxOpen, FaShoppingCart, FaUsers as FaUserIcon } from 'react-icons/fa';
import { googleLogout } from '@react-oauth/google';

function AddProduct() {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Luxury Watch', price: 2500, stock: 15, category: 'Accessories' },
    { id: 2, name: 'Designer Bag', price: 3500, stock: 8, category: 'Fashion' },
  ]);

const [newProduct, setNewProduct] = useState({
  Title: '',
  Brand: '',
  Price: '',
  Description: '',
  Category: '',
  Tags: '',
  ImageURL: '',
  Stock: '',
  Rating: '',
    discount: '',
});

  const fetchAdminDetails = async () => {
    try {
      const token = sessionStorage.getItem("Auth-Token");
      if (!token) return navigate("/login");

      const response = await axios.get('http://localhost:3001/getuser', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const user = response.data.user;
        if (user.role !== "admin") {
          setAccessDenied(true);
          setChecked(true);
          return;
        }
        setAdminDetails(user);
        setChecked(true);
      } else navigate("/login");
    } catch (error) {
      console.error("Error fetching admin details:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  if (!checked) return <div>Loading...</div>;
  if (accessDenied) return <div className="forbidden-container"><h1>403 Forbidden</h1><p>You don't have permission to access this page.</p></div>;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLogout = () => {
    sessionStorage.clear();
    googleLogout();
    toast.info("Please Login Again");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    // Example for preview (temporary usage)
    const imageUrl = URL.createObjectURL(file);
    setNewProduct(prev => ({ ...prev, ImageURL: imageUrl }));

    // OR: Upload to Cloudinary and store the resulting URL
    // setNewProduct(prev => ({ ...prev, ImageURL: uploadedCloudinaryUrl }));
  }
};
  const handleAddProduct = (e) => {
    e.preventDefault();
    // Simulate add
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
    setShowAddForm(false);
    setNewProduct({ name: '', price: '', stock: '', category: '', image: null });
    toast.success("Product added successfully!");
  };

  return (
    <div className="admin-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button onClick={toggleSidebar} className="toggle-btn">{isSidebarOpen ? <FiX /> : <FiMenu />}</button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/admin')}><FiBox /><span>Dashboard</span></li>
            <li className="active"><FaBoxOpen /> Products</li>
            <li><FiUsers /><span>Users</span></li>
            <li><FaShoppingCart /> Orders</li>
            <li onClick={() => navigate('/admin-chat')}><FaUserIcon /> Chats</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="admin-header">
          <h1>Welcome back, <span>{adminDetails?.name}</span></h1>
          <button className="logout-btn" onClick={handleLogout}><FiLogOut /><span style={{color:"white"}}>Logout</span></button>
        </header>

        <section className="products-section">
          <div className="section-header">
            <h2>Manage Products</h2>
            <button className="nav0cta1" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? '× Cancel' : '+ Add New Product'}
            </button>
          </div>

          {showAddForm ? (
           <form className="add-product-form" onSubmit={handleAddProduct}>
  <h4>Add New Product</h4>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="title">Product Title*</label>
      <input
        type="text"
        name="Title"
        id="title"
        placeholder="Rolex Submariner"
        value={newProduct.Title}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="brand">Brand*</label>
      <input
        type="text"
        name="Brand"
        id="brand"
        placeholder="Brand"
        value={newProduct.Brand}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="price">Price (PKR)*</label>
      <input
        type="number"
        name="Price"
        id="price"
        placeholder="4000"
        value={newProduct.Price}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="stock">Stock*</label>
      <input
        type="number"
        name="Stock"
        id="stock"
        placeholder="10"
        value={newProduct.Stock}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  
    <label htmlFor="description" className="mt-4" style={{fontWeight: '500'}}>Description*</label>
    <textarea
      name="Description"
      id="description"
      rows="3"
      className="mb-4"
      placeholder="Product description"
      value={newProduct.Description}
      onChange={handleChange}
      required
    ></textarea>
 

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="category">Category*</label>
      <input
        type="text"
        name="Category"
        id="category"
        placeholder="Watches"
        value={newProduct.Category}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="tags">Tags (comma separated)</label>
      <input
        type="text"
        name="Tags"
        id="tags"
        placeholder="watch, timepiece, fashion"
        value={newProduct.Tags}
        onChange={handleChange}
      />
    </div>
  </div>
<div className="form-row">


  <div className="form-group">
    <label htmlFor="rating">Rating (1–5)</label>
    <input
      type="number"
      name="Rating"
      id="rating"
      placeholder="4"
      min="1"
      max="5"
      value={newProduct.Rating}
      onChange={handleChange}
    />
  </div>
   <div className="form-group">
    <label htmlFor="rating">Discount</label>
    <input
      type="number"
      name="Discount"
      id="discount"
      placeholder="40%"
      min="0"
      value={newProduct.discount}
      onChange={handleChange}
    />
  </div>
</div>
  <div className="form-group image-upload">
    <label htmlFor="image">Product Image*</label>
    <div className="upload-area">
      <input
        type="file"
        name="ImageURL"
        id="image"
        accept="image/*"
        onChange={handleImageChange} // Use a separate handler for file upload
        required
      />
      <div className="upload-message">
        <i className="fas fa-cloud-upload-alt"></i>
        <p>Click to upload or drag and drop</p>
        <small>PNG, JPG, WEBP (Max 5MB)</small>
      </div>
    </div>
  </div>

  <div className="form-actions">
    <button type="submit" className="nav0cta1">Add Product</button>
  </div>
</form>
          ) : (
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr><th>Product Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
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
                        <button className="delete-btn" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AddProduct;
