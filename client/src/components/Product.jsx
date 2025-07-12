import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiSearch, FiStar, FiX, FiChevronDown } from "react-icons/fi";
import './ProductsPage.css';
import QuickViewModal from "./ProductView";
function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("featured");
  
  // Available options for filters
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const token = sessionStorage.getItem("Auth-Token");
  const userId = sessionStorage.getItem("id");
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, priceRange, selectedCategories, selectedBrands, minRating, sortOption]);

  const getAllProducts = async () => {
    try {
      const response = await axios.post("http://localhost:3001/get-product");
      if (response.data.success) {
        const products = response.data.products || [];
        setProducts(products);
        
        // Extract unique categories and brands
        const uniqueCategories = [...new Set(products.map(p => p.Category))];
        const uniqueBrands = [...new Set(products.map(p => p.Brand))];
        
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.Description && product.Description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    // Price filter
    filtered = filtered.filter(product => 
      product.Price >= priceRange[0] && product.Price <= priceRange[1]
    );
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.Category)
      );
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.Brand)
      );
    }
    
    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(product => 
        product.Rating >= minRating
      );
    }
    
    // Sorting
    switch(sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.Price - b.Price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.Price - a.Price);
        break;
      case "rating":
        filtered.sort((a, b) => b.Rating - a.Rating);
        break;
      default:
        // Default sorting (featured)
        break;
    }
    
    setFilteredProducts(filtered);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinRating(0);
    setSearchQuery("");
    setSortOption("featured");
  };

const HandleQuickView = (productId) => {
  setSelectedProduct(products.find(product => product._id === productId));
};



const addToWishlist = async (productId) => {
  try {
    const response = await axios.post("http://localhost:3001/add-to-wishlist", {userId, productId}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.success) {
      alert("Product added to wishlist successfully!");
    }
    else {
      alert("Failed to add product to wishlist.");
    }
    }
    catch (error) {
    console.error("Error adding product to wishlist", error);
    alert("An error occurred while adding the product to wishlist.");
    }
}

  return (
    <div className="products-page mb-5">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-content">
          <h1>Discover Premium Products</h1>
          <p>Handpicked collection of high-quality items designed to elevate your lifestyle</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="products-container">
        {/* Filter Sidebar */}
        <div className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setIsFilterOpen(false)}>
              <FiX />
            </button>
          </div>
          
          <div className="filter-group">
            <h4>Price Range (PKR)</h4>
            <div className="price-range">
              <input 
                type="range" 
                min="0" 
                max="200000" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <div className="range-values">
                <span>0</span>
                <span>{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Categories</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span className="checkmark"></span>
                  {category}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Brands</h4>
            <div className="filter-options">
              {brands.map(brand => (
                <label key={brand} className="filter-option">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="checkmark"></span>
                  {brand}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Rating</h4>
            <div className="rating-stars">
              {[5, 4, 3].map(rating => (
                <button
                  key={rating}
                  className={`rating-option ${minRating === rating ? 'active' : ''}`}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                >
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < rating ? 'filled' : ''} />
                  ))}
                  <span> & up</span>
                </button>
              ))}
            </div>
          </div>
          
          <button className="clear-filters" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </div>
        
        {/* Products Area */}
        <div className="products-content">
          {/* Top Bar with Search and Filters */}
          <div className="products-topbar">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="controls">
              <button className="filter-toggle" onClick={() => setIsFilterOpen(true)}>
                <FiFilter /> Filters
              </button>
              
              <div className="sort-dropdown">
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <FiChevronDown className="dropdown-icon" />
              </div>
            </div>
          </div>
          
          {/* Results Info */}
          <div className="results-info">
            <p>{filteredProducts.length} products found</p>
            {selectedCategories.length > 0 || selectedBrands.length > 0 || minRating > 0 ? (
              <div className="active-filters">
                {selectedCategories.map(cat => (
                  <span key={cat} className="filter-tag">
                    {cat} <button onClick={() => toggleCategory(cat)}>×</button>
                  </span>
                ))}
                {selectedBrands.map(brand => (
                  <span key={brand} className="filter-tag">
                    {brand} <button onClick={() => toggleBrand(brand)}>×</button>
                  </span>
                ))}
                {minRating > 0 && (
                  <span className="filter-tag">
                    {minRating}+ Stars <button onClick={() => setMinRating(0)}>×</button>
                  </span>
                )}
              </div>
            ) : null}
          </div>
          
          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                    <span className="discount-badge">{product.discount}% OFF</span>
                  <div className="product-image">
                    <img
                      src={
                        product.ImageURL && product.ImageURL.length > 0
                          ? product.ImageURL[0]
                          : "https://via.placeholder.com/300x400?text=Product+Image"
                      }
                      alt={product.Title}
                    />
                    <div className="product-badge">New</div>
                    <button className="quick-view" onClick={()=>{
                        HandleQuickView(product._id);
                    }}>Quick View</button>
                  </div>
                  <div className="product-details">
                    <p className="product-brand">{product.Brand}</p>
                    <h3>{product.Title}</h3>
                    <div className="price-rating">
                      {product.discount > 0 && (
                <>
                  <span className="original-price">PKR {product.Price.toLocaleString()}</span>
                </>
                
              )}
               
                      <div className="product-rating">
                        <FiStar className="filled" />
                        <span>{product.Rating || "N/A"}</span>
                      </div>
                    </div>
                       <span className="current-price">
                PKR {(
    product.Price - (product.Price * (product.discount / 100))
  ).toLocaleString()}
              </span>
                    <p className="product-description">
                      {product.Description || "Premium quality product with exceptional features"}
                    </p>
                  </div>
                  
                  <div className="product-actions">
                    <button className="nav0cta1" style={{width: "100%"}} onClick={()=>{
                        HandleQuickView(product._id);
                    }}>View Product</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/8b4662f8023e4e2295f865106b5d3a7e.gif" alt="No products found" />
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button className="nav0cta1" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
            {selectedProduct && (
              <QuickViewModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(id, qty) => console.log(`add to cart`, id, qty)}
                onAddToWishlist={(id) => console.log(`add to wishlist`, id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;