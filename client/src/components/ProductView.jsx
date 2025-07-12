import React, { useState, useContext } from 'react';
import { FaStar, FaRegStar, FaTimes, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import './QuickViewModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartCounterContext } from './context/CartCouter';
const QuickViewModal = ({ product, onClose, onAddToCart, onAddToWishlist }) => {

 const { setCartCounter } = useContext(CartCounterContext);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("Auth-Token");
  const userId = sessionStorage.getItem("id");
  if (!product) return null; // safety check

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    // optionally send rating to server
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.Stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.Stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateDiscountedPrice = () => {
    return product.Price - (product.Price * (product.discount / 100));
  };
const addToCart = async (productId, quantity) => {
    setLoading(true);
  if (!token || !userId) {
    toast.error("You must be logged in to add items to the cart.");
    return;
  }
  try {
    const response = await axios.post("http://localhost:3001/add-to-cart", {userId, productId, quantity}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.success) {

      toast.success("Product added to cart successfully!");
        onAddToCart(productId, quantity);
 setCartCounter(prev => prev + 1);  // Update cart counter
        setLoading(false);
    } else {
      toast.error("Failed to add product to cart.");
    }
  } catch (error) {
    console.error("Error adding product to cart", error);   
    toast.error("An error occurred while adding the product to cart.");
  }
};
  return (
    <div className="quick-view-overlay">
      <div className="quick-view-modal">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={
                  product.ImageURL?.[activeImageIndex] ||
                  'https://via.placeholder.com/500'
                }
                alt={product.Title}
              />
            </div>
            {product.ImageURL?.length > 1 && (
              <div className="thumbnail-container">
                {product.ImageURL.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={img} alt={`${product.Title} thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <span className="brand">{product.Brand}</span>
              <h2 className="title">{product.Title}</h2>
              <div className="rating-container">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    {i < product.Rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
                <span className="rating-text">({product.Rating || 0}/5)</span>
              </div>
            </div>

            <div className="price-section">
              {product.discount > 0 && (
                <>
                  <span className="original-price">PKR {product.Price.toLocaleString()}</span>
                  <span className="discount-badge">{product.discount}% OFF</span>
                </>
              )}
              <span className="current-price">
                PKR {calculateDiscountedPrice().toLocaleString()}
              </span>
            </div>

            <div className="stock-status">
              {product.Stock > 0 ? (
                <span className="in-stock">In Stock ({product.Stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{product.Description || "No description available."}</p>
            </div>

            <div className="tags">
              <h3>Tags</h3>
              <div className="tag-container">
                {product.Tags?.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="quantity-section">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.Stock}
                />
                <button onClick={incrementQuantity} disabled={quantity >= product.Stock}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart"
                onClick={() => addToCart(product._id, quantity)}
                disabled={product.Stock <= 0}
              >
                <FaShoppingCart /> {
                    loading ? "Adding..." : "Add to Cart"
                }
              </button>
              <button
                className="add-to-wishlist"
                onClick={() => onAddToWishlist(product._id)}
              >
                <FaHeart /> Wishlist
              </button>
            </div>

            <div className="share-section">
              <button className="share-btn">
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
