import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiMaximize, FiMinimize } from "react-icons/fi";
import { useParams } from "react-router-dom";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './productmodel.css';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const token = sessionStorage.getItem("Auth-Token");
  const userId = sessionStorage.getItem("id");
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);

  const {id} = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://exclusive-app-z5t7.onrender.com/get-product-by-id`,{id});
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
  }, [productId]);

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
  }, [viewMode, product]);

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
        { userId, productId, quantity },
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

  const addToWishlist = async () => {
    try {
      const response = await axios.post(
        "https://exclusive-app-z5t7.onrender.com/add-to-wishlist",
        { userId, productId },
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
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>{product.Category}</span> &gt; <span>{product.Title}</span>
      </div>

      {/* View Mode Toggle */}
      {product.Model3DUrl && (
        <div className="view-mode-toggle">
          <button
            className={viewMode === '2d' ? 'active' : ''}
            onClick={() => setViewMode('2d')}
          >
            2D View
          </button>
          <button
            className={viewMode === '3d' ? 'active' : ''}
            onClick={() => setViewMode('3d')}
          >
            3D View
          </button>
        </div>
      )}

      {/* Product Main Section */}
      <div className="product-main">
        {/* Product Viewer (2D or 3D) */}
        <div className="product-viewer">
          {viewMode === '2d' ? (
            <>
              <div className="main-image">
                <img
                  src={
                    product.ImageURL && product.ImageURL.length > selectedImage
                      ? product.ImageURL[selectedImage]
                      : "https://via.placeholder.com/600x600?text=Product+Image"
                  }
                  alt={product.Title}
                />
              </div>
              <div className="thumbnail-gallery">
                {product.ImageURL && product.ImageURL.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.Title} thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="threejs-container" ref={threeContainerRef}>
              {product.Model3DUrl ? (
                <button className="fullscreen-toggle" onClick={toggleFullscreen}>
                  {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                </button>
              ) : (
                <div className="no-3d-model">
                  <p>3D model not available for this product</p>
                  <button onClick={() => setViewMode('2d')}>Switch to 2D View</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1>{product.Title}</h1>
          
          <div className="product-meta">
            <div className="brand-category">
              <span>Brand: {product.Brand}</span>
              <span>Category: {product.Category}</span>
            </div>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < (product.Rating || 0) ? 'filled' : ''} />
                ))}
              </div>
              <span>({product.ReviewCount || 0} reviews)</span>
            </div>
          </div>

          <div className="product-price">
            {product.discount > 0 && (
              <div className="price-original">
                <span>PKR {(product.Price + (product.Price * (product.discount / 100))).toLocaleString()}</span>
                <span className="discount-badge">{product.discount}% OFF</span>
              </div>
            )}
            <div className="price-current">PKR {product.Price.toLocaleString()}</div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.Description || "No description available for this product."}</p>
          </div>

          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              {product.Specifications && Object.entries(product.Specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart" onClick={addToCart}>
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="wishlist" onClick={addToWishlist}>
                <FiHeart /> Wishlist
              </button>
              <button className="share">
                <FiShare2 /> Share
              </button>
            </div>
          </div>

          <div className="product-tags">
            <span>SKU: {product.SKU || 'N/A'}</span>
            <span>Availability: {product.Stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tab-header">
          <button className="active">Description</button>
          <button>Specifications</button>
          <button>Reviews ({product.ReviewCount || 0})</button>
          <button>Shipping & Returns</button>
        </div>
        <div className="tab-content">
          <div className="tab-pane active">
            <h3>Detailed Description</h3>
            <p>{product.DetailedDescription || product.Description || "No detailed description available."}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2>You May Also Like</h2>
        <div className="related-products-grid">
          {/* You would fetch and display related products here */}
          <p>Related products would be displayed here</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;