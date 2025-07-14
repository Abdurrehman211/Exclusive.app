import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiMaximize, FiMinimize, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './productmodel.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState('2d');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const token = sessionStorage.getItem("Auth-Token");
  const userId = sessionStorage.getItem("id");
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
const [reviewData, setReviewData] = useState({
  rating: 0,
  name: '',
  email: '',
  comment: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
        console.log(id)
      try {
        const response = await axios.post(`https://exclusive-app-z5t7.onrender.com/get-product-by-id`,{
            productId: id
        },{});
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (viewMode === '3d' && product?.Model3DUrl && threeContainerRef.current) {
      initThreeJS();
      loadModel();
      
      return () => {
        // Cleanup Three.js resources
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (controlsRef.current) {
          controlsRef.current.dispose();
        }
        if (sceneRef.current) {
          sceneRef.current.traverse(child => {
            if (child.isMesh) {
              child.geometry.dispose();
              child.material.dispose();
            }
          });
        }
      };
    }
    getAllProducts();
  }, [viewMode, product]);
const handleShare = () => {
  const productUrl = `${window.location.origin}/product/${id}`;
  const message = `Check out this product: ${product.Title}\n${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
  const initThreeJS = () => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      threeContainerRef.current.clientWidth,
      threeContainerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    threeContainerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    controls.enableZoom = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        threeContainerRef.current.clientWidth,
        threeContainerRef.current.clientHeight
      );
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  const loadModel = () => {
    if (!product?.Model3DUrl) return;

    const loader = new GLTFLoader();
    loader.load(
      product.Model3DUrl,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.x += (model.position.x - center.x);
        model.position.y += (model.position.y - center.y);
        model.position.z += (model.position.z - center.z);
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / maxDim;
        model.scale.set(scale, scale, scale);
        
        sceneRef.current.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      threeContainerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(
        "https://exclusive-app-z5t7.onrender.com/add-to-cart",
        { userId, id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart", error);
      alert("An error occurred while adding the product to cart.");
    }
  };
const handleReviewSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await axios.post(
      `https://exclusive-app-z5t7.onrender.com/add-review/${id}`,
      {
        ...reviewData,
        userId: userId // If you want to associate with logged in user
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      // Refresh product data to show new review
      const updatedProduct = await axios.get(`https://exclusive-app-z5t7.onrender.com/get-product/${id}`);
      setProduct(updatedProduct.data.product);
      
      // Reset form
      setReviewData({
        rating: 0,
        name: '',
        email: '',
        comment: ''
      });
      
      alert('Thank you for your review!');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    alert('Failed to submit review. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
   const getAllProducts = async () => {
      try {
        const response = await axios.post("https://exclusive-app-z5t7.onrender.com/get-product");
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




  const addToWishlist = async () => {
    try {
      const response = await axios.post(
        "https://exclusive-app-z5t7.onrender.com/add-to-wishlist",
        { userId, id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        alert("Product added to wishlist successfully!");
      } else {
        alert("Failed to add product to wishlist.");
      }
    } catch (error) {
      console.error("Error adding product to wishlist", error);
      alert("An error occurred while adding the product to wishlist.");
    }
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-error">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h3>Product Not Found</h3>
        <p>The requested product could not be found.</p>
      </div>
    );
  }

 return (
    <div className="product-page">
      {/* Header with back button */}
      <header className="product-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiChevronLeft /> Back
        </button>
      </header>

      {/* Main Product Container */}
      <div className="product-container">
        {/* Product Visuals */}
        <div className="product-visuals">
          {viewMode === '2d' ? (
            <div className="image-viewer">
              <div className="main-image-container">
                <img
                  src={product.ImageURL?.[selectedImage] || "https://via.placeholder.com/800x800?text=Product+Image"}
                  alt={product.Title}
                  className="main-image"
                />
                {product.discount > 0 && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
              <div className="thumbnail-scroller">
                {product.ImageURL?.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.Title} thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="three-d-viewer">
              <div className="viewer-container" ref={threeContainerRef}>
                {product.Model3DUrl ? (
                  <>
                    <button className="viewer-control fullscreen" onClick={toggleFullscreen}>
                      {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                    </button>
                    <div className="viewer-instructions">
                      <span>Drag to rotate • Scroll to zoom</span>
                    </div>
                  </>
                ) : (
                  <div className="no-model-message">
                    <p>3D model not available</p>
                    <button onClick={() => setViewMode('2d')} className="switch-mode-btn">
                      Switch to 2D View
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Mode Toggle */}
          {product.Model3DUrl && (
            <div className="view-mode-toggle">
              <button
                className={`view-mode-btn ${viewMode === '2d' ? 'active' : ''}`}
                onClick={() => setViewMode('2d')}
              >
                2D Photos
              </button>
              <button
                className={`view-mode-btn ${viewMode === '3d' ? 'active' : ''}`}
                onClick={() => setViewMode('3d')}
              >
                3D Model
              </button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className="product-header">
            <div className="brand-category">
              <span className="brand">{product.Brand}</span>
              <span className="category">{product.Category}</span>
            </div>
            <h1 className="product-title">{product.Title}</h1>
            <div className="rating-container">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < (product.Rating || 0) ? 'filled' : ''} />
                ))}
              </div>
              <span className="review-count">({product.ReviewCount || 0} reviews)</span>
            </div>
          </div>

          <div className="price-section">
            <div className="current-price">PKR {product.Price.toLocaleString()}</div>
            {product.discount > 0 && (
                <>
                  <div className="original-price">
                <span>PKR {(product.Price + (product.Price * (product.discount / 100))).toLocaleString()}</span>
              
              </div>
                  <span className="discount-percent">Save {product.discount}%</span>
                </>
            
              
            )}
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>

            <button className="add-to-cart" onClick={addToCart}>
              <FiShoppingCart /> Add to Cart
            </button>
           
          </div>

          <div className="delivery-info">
            <div className="info-item">
              <span className="info-label">Availability:</span>
              <span className={`stock-status ${product.Stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.Stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">SKU:</span>
              <span className="sku">{product.SKU || 'N/A'}</span>
            </div>
          </div>

          <button className="share-btn">
            <FiShare2 /> Share this product
          </button>
        </div>
      </div>

      {/* Product Info Tabs */}
      <div className="product-info-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
        
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.ReviewCount || 0})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <h3>Product Details</h3>
              <p>{product.Description || "No description available."}</p>
              {product.DetailedDescription && (
                <>
                  <h3>Detailed Information</h3>
                  <p>{product.DetailedDescription}</p>
                </>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="specs-content">
              <h3>Technical Specifications</h3>
              <ul className="specs-list">
                {product.Specifications && Object.entries(product.Specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="spec-name">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

      {activeTab === 'reviews' && (
  <div className="reviews-content">
    {product.ReviewCount > 0 ? (
      <div className="reviews-list">
        {/* Existing reviews */}
        {product.reviews?.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="review-author">{review.userName}</div>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < review.rating ? 'filled' : ''} />
                ))}
              </div>
              <div className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
            <div className="review-text">{review.comment}</div>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
    )}

    {/* Review Form */}
    <div className="review-form-container">
      <h3>Write a Review</h3>
      <form onSubmit={handleReviewSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star-${star}`}
                  name="rating"
                  value={star}
                  checked={reviewData.rating === star}
                  onChange={() => setReviewData({...reviewData, rating: star})}
                  required
                />
                <label htmlFor={`star-${star}`}>
                  <FiStar className={star <= reviewData.rating ? 'filled' : ''} />
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={reviewData.name}
            onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={reviewData.email}
            onChange={(e) => setReviewData({...reviewData, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Your Review</label>
          <textarea
            id="comment"
            name="comment"
            rows="5"
            value={reviewData.comment}
            onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-review-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  </div>
)}
        </div>
      </div>

      {/* Related Products */}
    <section className="related-products">
  <h2 className="section-title">You May Also Like</h2>
  <div className="related-products-grid">
    {products
      .filter(p =>
        p._id !== product._id &&             // Exclude current product
        p.Brand !== product.Brand &&         // Different brand
        (p.Rating || 0) >= 4                 // High rating
      )
      .slice(0, 4) // Show top 4
      .map((relatedProduct) => (
        <div className="product-card" key={relatedProduct._id}>
          <div className="card-badge-container">
            {relatedProduct.discount > 0 && (
              <div className="discount-badge">-{relatedProduct.discount}%</div>
            )}
            <div className="category-badge">{relatedProduct.Category}</div>
          </div>

          <div className="product-image-wrapper">
            <img
              src={relatedProduct.ImageURL?.[0] || "https://via.placeholder.com/300x300?text=No+Image"}
              alt={relatedProduct.Title}
              className="product-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
          </div>

          <div className="product-details">
            <h3 className="product-title">{relatedProduct.Title}</h3>
            <div className="price-container">
              <span className="current-price">
                PKR {relatedProduct.Price.toLocaleString()}
              </span>
              {relatedProduct.discount > 0 && (
                <span className="original-price">
                  PKR {(
                    relatedProduct.Price +
                    (relatedProduct.Price * relatedProduct.discount) / 100
                  ).toFixed(0).toLocaleString()}
                </span>
              )}
            </div>

            <div className="rating-container">
              <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill={i < Math.floor(relatedProduct.Rating || 0) ? "#FFD700" : "#DDDDDD"}
                  >
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                  </svg>
                ))}
              </div>
              <span className="review-count">({relatedProduct.Rating || 0})</span>
            </div>

            <div className="action-buttons">
              <button className="nav0cta1" onClick={() => navigate(`/product/${relatedProduct._id}`)}>
                View Product
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</section>

    </div>
  );
}

export default ProductPage;