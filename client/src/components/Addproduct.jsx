import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Addproduct.css";
import { FiMenu, FiX, FiBox, FiUsers, FiLogOut } from "react-icons/fi";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers as FaUserIcon,
} from "react-icons/fa";
import { googleLogout } from "@react-oauth/google";

function AddProduct() {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    Title: "",
    Brand: "",
    Price: "",
    Description: "",
    Category: "",
    Tags: "",
    ImageURL: [],
    Stock: "",
    Rating: "",
    discount: "",
  });

  const fetchAdminDetails = async () => {
    try {
      const token = sessionStorage.getItem("Auth-Token");
      if (!token) return navigate("/login");

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

  if (!checked) return <div>Loading...</div>;
  if (accessDenied)
    return (
      <div className="forbidden-container">
        <h1>403 Forbidden</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLogout = () => {
    sessionStorage.clear();
    googleLogout();
    toast.info("Please Login Again");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageChange = async (e) => {
    const fileList = e.target.files;

    if (!fileList || fileList.length === 0) {
      toast.error("No files selected!");
      return;
    }

    const files = Array.from(fileList).filter(
      (f) => f instanceof Blob && f.type.startsWith("image/")
    );

    if (files.length === 0) {
      toast.error("Invalid file type or corrupted file.");
      return;
    }

    // 1. show preview
    const previews = files.map((file) => ({
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));

    // merge previews with existing
    setNewProduct((prev) => ({
      ...prev,
      ImageURL: [...prev.ImageURL, ...previews],
    }));

    // 2. upload to cloudinary
    try {
      const uploaded = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "product_upload_preset");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/djjfwckzo/image/upload",
          formData
        );

        uploaded.push({
          secureUrl: res.data.secure_url,
          name: file.name,
        });
      }

      // merge uploaded results
      setNewProduct((prev) => ({
        ...prev,
        ImageURL: [
          ...prev.ImageURL.filter((img) => img.secureUrl), // already uploaded images
          ...uploaded,
        ],
      }));

      console.log("Uploaded images:", uploaded);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Image upload failed!");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Simulate add
    const productToSave = {
      ...newProduct,
      ImageURL: newProduct.ImageURL.map(
        (img) => img.secureUrl || img.previewUrl
      ),
    };

    try {
      if (
        !productToSave.Title ||
        !productToSave.Brand ||
        !productToSave.Price ||
        !productToSave.Stock ||
        !productToSave.ImageURL.length
      ) {
        toast.error("Please fill all required fields!");
        return;
      }

      if (isNaN(productToSave.Price) || isNaN(productToSave.Stock)) {
        toast.error("Price and Stock must be numbers!");
        return;
      }

      if (
        parseFloat(productToSave.Price) <= 0 ||
        parseInt(productToSave.Stock) < 0
      ) {
        toast.error(
          "Price must be greater than 0 and Stock cannot be negative!"
        );
        return;
      }
      if (productToSave.ImageURL.length === 0) {
        toast.error("Please upload at least one product image!");
        return;
      }
      // Add product to database

      const token = sessionStorage.getItem("Auth-Token");
      if (!token) {
        toast.error("You must be logged in to add products!");
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/add-product",
        productToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log("Saving product:", productToSave);
        setProducts((prev) => [...prev, { ...productToSave, id: Date.now() }]);
        setShowAddForm(false);
        setNewProduct({
          Title: "",
          Brand: "",
          Price: "",
          Description: "",
          Category: "",
          Tags: "",
          ImageURL: [],
          Stock: "",
          Rating: "",
          discount: "",
        });
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="admin-container">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate("/admin")}>
              <FiBox />
              <span>Dashboard</span>
            </li>
            <li className="active">
              <FaBoxOpen /> Products
            </li>
            <li>
              <FiUsers />
              <span>Users</span>
            </li>
            <li>
              <FaShoppingCart /> Orders
            </li>
            <li onClick={() => navigate("/admin-chat")}>
              <FaUserIcon /> Chats
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="admin-header">
          <button onClick={toggleSidebar} className="toggle-btn">
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1>
            Welcome back, <span>{adminDetails?.name}</span>
          </h1>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span style={{ color: "white" }}>Logout</span>
          </button>
        </header>

        <section className="products-section">
          <div className="section-header">
            <h2>Manage Products</h2>
            <button
              className="nav0cta1"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "× Cancel" : "+ Add New Product"}
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

              <label
                htmlFor="description"
                className="mt-4"
                style={{ fontWeight: "500" }}
              >
                Description*
              </label>
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
                    name="discount"
                    id="discount"
                    placeholder="40%"
                    min="0"
                    max="100"
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
                    multiple
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
              {newProduct.ImageURL && newProduct.ImageURL.length > 0 && (
                <div
                  className="image-previews"
                  style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                >
                  {newProduct.ImageURL.map((img, idx) => (
                    <div key={idx} style={{ textAlign: "center" }}>
                      <img
                        src={img.secureUrl ? img.secureUrl : img.previewUrl}
                        alt={img.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <p style={{ fontSize: "12px" }}>{img.name}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="nav0cta1">
                  Add Product
                </button>
              </div>
            </form>
          ) : (
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
          )}
        </section>
      </main>
    </div>
  );
}

export default AddProduct;

// Brand
// :
// "G-Shock"
// Category
// :
// "Watch"
// Description
// :
// "This is a very good product"
// ImageURL
// :
// ["https://res.cloudinary.com/djjfwckzo/image/upload/v1751825333/zgfourpmuvwrksaac4u6.jpg"]
// Price
// :
// 50000
// Rating
// :
// 3
// Stock
// :
// 28
// Tags
// :
// ["watch", "gshock", "G Shock", "timepiece", "Digital"]
// Title
// :
// "Gshock digital"
// createdAt
// :
// "2025-07-06T18:12:43.030Z"
// discount
// :
// 30
// updatedAt
// :
// "2025-07-06T18:12:43.030Z"
// __v
// :
// 0
// _id
// :
// "686abc9b9dd50235b00df643"
