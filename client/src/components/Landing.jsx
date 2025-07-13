import React, { useState, useRef, useEffect, useContext } from "react";
import apple from "./images/apple.png";
import arrow33 from "./images/arrow.png";
import phone from "./images/iphone.png";
import dropdown from "./images/DropDown.png";
import dots from "./images/dots.png";
import smheart from "./images/heartsmall.png";
import Quickview from "./images/QuickView.png";
import controller from "./images/controlller.png";
import stars from "./images/Fivestar.png";
import lcd from "./images/LCD.png";
import keyboard from "./images/Keyboard.png";
import chair from "./images/Chair.png";
import "./landing.css";
import heartsm from "./images/heartsm.png";
import gif from "./images/heartfilled.gif";
import phone1 from "./images/Category-CellPhone.png";
import white from "./images/Cellphone.png";
import comp from "./images/Category-Computer.png";
import cam from "./images/Category-Camera.png";
import watch from "./images/Category-SmartWatch.png";
import headphones from "./images/Category-Headphone.png";
import gamepad from "./images/Category-Gamepad.png";
import whcomp from "./images/computer.png";
import whheadphones from "./images/headphones.png";
import camera from "./images/camera.png";
import watch1 from "./images/watch.png";
import nintendo from "./images/nintendo.png";
import coat from "./images/coat.png";
import bag from "./images/bag.png";
import boom from "./images/boombox.png";
import ps5 from "./images/ps5.png";
import hat from "./images/hat.png";
import perfumes from "./images/perfumes.png";
import service from "./images/delivery.png";
import headphines from "./images/headphines.png";
import security from "./images/security.png";
import Footer from "./Footer";
import Accessibilityprovider from "./context/Accessibility";
import axios from "axios";
import { CartCounterContext } from "./context/CartCouter";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import WatchCarousel from "./Header";


function Landing() {
  const navigate = useNavigate();
  const { setCartCounter } = useContext(CartCounterContext);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [show, setshow] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState("All");
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProducts] = useState("");
const [flashProduct, setFlashProduct] = useState(null);
const [highRated , setHighrated] = useState([
]);
const [flashTimeLeft, setFlashTimeLeft] = useState({});
  const togglebutton = () => {
    setshow(!show);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
useEffect(() => {
  const targetDate = new Date("2025-07-15T00:00:00Z");
  const updateCountdown = () => {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      setFlashTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      return;
    }

    const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((distance / 1000 / 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");

    setFlashTimeLeft({ days, hours, minutes, seconds });
  };

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  return () => clearInterval(interval);
}, []);


  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const arrow = useRef(null);
  const arrow2 = useRef(null);
  const toggleCategory = (category) => {
    if (category === "women") {
      arrow2.current.style.transform = "rotate(0deg)";
      arrow.current.style.transition = "0.2s all ease";
      arrow.current.style.transform =
        activeCategory === "women" ? "rotate(0deg)" : "rotate(90deg)";
    } else if (category === "men") {
      arrow.current.style.transform = "rotate(0deg)";
      arrow2.current.style.transition = "0.2s all ease";
      arrow2.current.style.transform =
        activeCategory === "men" ? "rotate(0deg)" : "rotate(90deg)";
    }
    setActiveCategory(activeCategory === category ? null : category);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.post("https://exclusive-app-z5t7.onrender.com/get-product");
      if (response.data.success) {
        const products = response.data.products || [];
        setProducts(products);
        const UniqueBrands = [
          ...new Set(products.map((product) => product.Brand)),
        ].filter(Boolean);
        setActiveBrand(UniqueBrands);
        setFilteredProducts(products);

        const sorted = [...products].sort((a, b) => b.Rating - a.Rating);
      setFlashProduct(sorted[0]);
  const topRated = products.filter((p) => p.Rating >= 4);

        setHighrated(topRated);

      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const specialOffers = products.filter((p) => p.Discount > 0);
  const brands = [...new Set(products.map((product) => product.Brand))].filter(
    Boolean
  );
  const brandProducts =
    activeBrand === "All"
      ? products
      : products.filter((p) => p.Brand === activeBrand);
const formatFlashTime = (time) => {
  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const secs = (time % 60).toString().padStart(2, "0");
  return { mins, secs };
};
  return (
    <>
      <section id="landing">
        <aside>
          <ul>
            <li onClick={() => toggleCategory("women")}>
              Woman's Fashion{" "}
              <img src={dropdown} alt="arrow" id="arrow1" ref={arrow} />
            </li>
            {activeCategory === "women" && (
              <div className="dropdown">
                <ul>
                  <li>
                    <a href="/product">Watches</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}> 
                    <a href="/product" onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Dresses</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product">Bottom</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product">Tops</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product">Accessories</a>
                  </li>
                </ul>
              </div>
            )}
            <li onClick={() => toggleCategory("men")}>
              Man's Fashion{" "}
              <img src={dropdown} alt="arrow" id="arrow2" ref={arrow2} />
            </li>
            {activeCategory === "men" && (
              <div className="dropdown">
                <ul>
                  <li >
                    <a href="/product">Watches</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product" onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>T-Shirts</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product">Pants</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product">Footwears</a>
                  </li>
                  <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>
                    <a href="/product">Accessories</a>
                  </li>
                </ul>
              </div>
            )}
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Electronics</li>
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }} >Home & Lifestyle</li>
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Medicine</li>
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Sports & Outdoor</li>
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Baby's & Toys</li>
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Groceries & Pets</li>
            <li style={{color: 'grey'}} onMouseEnter={()=>{
              toast.info("Coming Soon")
            }}>Health & Beauty</li>
          </ul>
        </aside>
        {/* <div className="access" onClick={togglebutton} >
        Accessability {show ? "hide": "show"} options
        { show &&(

        
    <div className={'pagecont ${highContrast ? "high-contrast":"" } ${ largeFont ? "large-font":""}'}>
    <button id="bootn" onClick={toggleContrast}>Toggle High Contrast</button>
    <button id="bootn" onClick={toggleFont}>Toggle Large Text</button>
    </div>
        )}
    </div> */}
    <div className="main">
      <WatchCarousel products={products} />
    </div>
      </section>
      <section id="Sales">
        <div className="main-sales">
          <div className="day">
            <p id="p1"></p>
            <p className="p">Today's</p>
          </div>
          <div className="timer">
            <div className="time">
              <h1>Flash Sales</h1>
              <h2 style={{ fontWeight: "bold" }}>
                Time Remaining: {formatTime(timeLeft)}
              </h2>
            </div>
            <div className="button1">
              <button className="nav0cta1">View All</button>
            </div>
          </div>
          <div className="products-container mt-5">
            {products
              .filter((product) => product.discount > 0)
              .slice(0, 4)
              .map((product) => (
                <div class="product-card" key={product.id}>
                  <div class="card-badge-container">
                    <div class="discount-badge">-{product.discount}%</div>
                    <div class="category-badge">{product.category}</div>
                  </div>

                  <div class="product-image-wrapper">
                    <img
                      src={
                        product.ImageURL?.[0] ||
                        "https://via.placeholder.com/300x300?text=No+Image"
                      }
                      alt={product.Title}
                      class="product-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                      style={{ paddingTop: "0px" }}
                    />
                    {/* <button class="quick-view-button">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                      />
                    </svg>
                    Quick View
                  </button> */}
                  </div>

                  <div class="product-details">
                    <h3 class="product-title">{product.Title}</h3>

                    <div class="price-container">
                      <span class="current-price">
                        PKR {product.Price.toLocaleString()}
                      </span>
                      {product.discount && (
                        <span class="original-price">
                          PKR{" "}
                          {(
                            product.Price +
                            (product.Price * product.discount) / 100
                          )
                            .toFixed(0)
                            .toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div class="rating-container">
                      <div class="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill={
                              i < Math.floor(product.Rating || 0)
                                ? "#FFD700"
                                : "#DDDDDD"
                            }
                          >
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <span class="review-count">({product.Rating || 0})</span>
                    </div>

                    <div class="action-buttons">
                      <button
                        class="nav0cta1"
                        onClick={() => {
                          navigate("/product");
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fill="currentColor"
                            d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                      <div class="secondary-actions">
                        <button
                          class="wishlist-button"
                          aria-label="Add to wishlist"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                            />
                          </svg>
                        </button>
                        <button
                          class="compare-button"
                          aria-label="Compare product"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M9,3V5H7A2,2 0 0,0 5,7V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V7A2,2 0 0,0 17,5H15V3H13V5H11V3H9M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div id="space"></div>
        </div>
      </section>
     <section id="arrivals">
        <div className="main-sales">
          <div className="day">
            <p id="p1"></p>
            <p className="p">Look our new arrivals</p>
          </div>
          <div className="timer">
            <div className="time">
              <h1>Highlights</h1>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="left">
                <div className="wrapper"></div>
                 <div className="wrapper"></div>
              <img src={ps5} alt="ps5" id="ps5" width={'100%'} />
              <div className="text-left">
                <h3>Men Watches</h3>
                <p id="p-text">
                  All Brand new Watches !
                </p>
                <button id="Button" onClick={()=>{
                  navigate('/product')
                }}>Shop Now</button>
              </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="right">
              <div className="upper">
                <div className="upper-left"></div>
                <div className="text-upper">
                  <h3>Women’s Collections</h3>
                  <p id="p-text">
                    Featured woman collections that give you another vibe.
                  </p>
                  <button id="Button" nClick={()=>{
                  navigate('/product')
                }}>Shop Now</button>
                </div>
                <div className="img">
                  <img src={hat} alt="hat" id="hat" />
                </div>
              </div>
              <div className="upper">
                <div className="upper">
                  <div className="upper-left1"></div>
                  <div className="text-upper">
                    <h3>Iconic Collections</h3>
                    <p id="p-text">
                      Featured Antique collections that give you Classy Looks.
                    </p>
                    <button id="Button" onClick={()=>{
                  navigate('/product')
                }}>Shop Now</button>
                  </div>
                  <div className="img1">
                    <img src={perfumes} alt="hat" id="perfumes" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section id="Category">
        <div className="main-sales1">
          <div className="day">
            <p id="p1"></p>
            <p className="p">Today's</p>
          </div>
          <div className="timer">
            <div className="time1">
              <h1>Browse By Brand</h1>
            </div>
            <div className="button1">
              <button className="nav0cta1">View All</button>
            </div>
          </div>
          <div className="products">
          <div className="main-cat">
  {brands.slice(0,4).map((brand, index) => (
    <div className="card1" key={index}>
      <img src={watch1} alt={`${brand} watch`} id="phone-1" />
      <img src={watch} alt={`${brand} watch white`} id="phone1" />
      <p>{brand}</p>
    </div>
  ))}
</div>
          </div>
        </div>
      </section>

      <section id="Sales">
        <div className="main-sales">
          <div className="section-header">
            <div className="section-titles">
              <p className="section-subtitle">Top Picks From</p>
              <h1 className="section-title">Best Selling Brands</h1>
            </div>
            <div className="button1">
              <button className="nav0cta1">View All Brands</button>
            </div>
          </div>

          <div className="brand-selector">
            <button
              key="All"
              className={`brand-tab ${activeBrand === "All" ? "active" : ""}`}
              onClick={() => setActiveBrand("All")}
            >
              All
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                className={`brand-tab ${activeBrand === brand ? "active" : ""}`}
                onClick={() => setActiveBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className="products">
            {products
              .filter(
                (product) =>
                  activeBrand === "All" || product.Brand === activeBrand
              )
              .slice(0, 4)
              .map((product) => (
                <div class="product-card" key={product.id}>
                  <div class="card-badge-container">
                    <div class="discount-badge">-{product.discount}%</div>
                    <div class="category-badge">{product.category}</div>
                  </div>

                  <div class="product-image-wrapper">
                    <img
                      src={
                        product.ImageURL?.[0] ||
                        "https://via.placeholder.com/300x300?text=No+Image"
                      }
                      alt={product.Title}
                      class="product-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                      style={{ paddingTop: "0px" }}
                    />
                    {/* <button class="quick-view-button">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                      />
                    </svg>
                    Quick View
                  </button> */}
                  </div>

                  <div class="product-details">
                    <h3 class="product-title">{product.Title}</h3>

                    <div class="price-container">
                      <span class="current-price">
                        PKR {product.Price.toLocaleString()}
                      </span>
                      {product.discount && (
                        <span class="original-price">
                          PKR{" "}
                          {(
                            product.Price +
                            (product.Price * product.discount) / 100
                          )
                            .toFixed(0)
                            .toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div class="rating-container">
                      <div class="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill={
                              i < Math.floor(product.Rating || 0)
                                ? "#FFD700"
                                : "#DDDDDD"
                            }
                          >
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <span class="review-count">({product.Rating || 0})</span>
                    </div>

                    <div class="action-buttons">
                      <button
                        class="nav0cta1"
                        onClick={() => {
                          navigate("/product");
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fill="currentColor"
                            d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                      <div class="secondary-actions">
                        <button
                          class="wishlist-button"
                          aria-label="Add to wishlist"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                            />
                          </svg>
                        </button>
                        <button
                          class="compare-button"
                          aria-label="Compare product"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M9,3V5H7A2,2 0 0,0 5,7V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V7A2,2 0 0,0 17,5H15V3H13V5H11V3H9M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section id="flash-sale">
    <div className="row optional-sale">
      <div className="col-lg-7 col-md-6 col-sm-12 sale-text " style={{paddingLeft: '50px'}}>
        <p id="sale-p">{flashProduct?.Category || "Category"}</p>
        <h1>
          {flashProduct?.Title || "Enhance your"}
          <br />
          music Experience
        </h1>
     <div className="sales-timer">
  <div className="hour">
    <p>{flashTimeLeft.days || "00"}</p>
    <p>Days</p>
  </div>
  <div className="hour">
    <p>{flashTimeLeft.hours || "00"}</p>
    <p>Hours</p>
  </div>
  <div className="minutes">
    <p>{flashTimeLeft.minutes || "00"}</p>
    <p>Minutes</p>
  </div>
  <div className="seconds">
    <p>{flashTimeLeft.seconds || "00"}</p>
    <p>Seconds</p>
  </div>
</div>

        <div className="button2">
          <button className="nav0cta1">Buy Now</button>
        </div>
      </div>

      {flashProduct && (
        <div className="col-lg-5 col-md-6 col-sm-12 pics p-3">
          <img 
          width={'100%'}
          height={'100%'}
            src={flashProduct.ImageURL[0]}
            alt={flashProduct.Title}
            id="boom"
          />
        </div>
      )}
    </div>
</section>

      <section id="Sales">
        <div className="main-sales">
          <div className="day">
            <p id="p1"></p>
            <p className="p">Our Daily Deals</p>
          </div>
          <div className="timer">
            <div className="time">
              <h1>New Arrivals</h1>
              <h2></h2>
            </div>
            <div className="button1">
              <button className="nav0cta1">View All</button>
            </div>
          </div>
          
          <div className="products-container mt-5">
            {products
              .filter((product) => product.discount > 0)
              .slice(0, 4)
              .reverse()
              .map((product) => (
                <div class="product-card" key={product.id}>
                  <div class="card-badge-container">
                    <div class="discount-badge">-{product.discount}%</div>
                    <div class="category-badge">{product.category}</div>
                  </div>

                  <div class="product-image-wrapper">
                    <img
                      src={
                        product.ImageURL?.[0] ||
                        "https://via.placeholder.com/300x300?text=No+Image"
                      }
                      alt={product.Title}
                      class="product-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                      style={{ paddingTop: "0px" }}
                    />
                    {/* <button class="quick-view-button">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                      />
                    </svg>
                    Quick View
                  </button> */}
                  </div>

                  <div class="product-details">
                    <h3 class="product-title">{product.Title}</h3>

                    <div class="price-container">
                      <span class="current-price">
                        PKR {product.Price.toLocaleString()}
                      </span>
                      {product.discount && (
                        <span class="original-price">
                          PKR{" "}
                          {(
                            product.Price +
                            (product.Price * product.discount) / 100
                          )
                            .toFixed(0)
                            .toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div class="rating-container">
                      <div class="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill={
                              i < Math.floor(product.Rating || 0)
                                ? "#FFD700"
                                : "#DDDDDD"
                            }
                          >
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <span class="review-count">({product.Rating || 0})</span>
                    </div>

                    <div class="action-buttons">
                      <button
                        class="nav0cta1"
                        onClick={() => {
                          navigate("/product");
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fill="currentColor"
                            d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                      <div class="secondary-actions">
                        <button
                          class="wishlist-button"
                          aria-label="Add to wishlist"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                            />
                          </svg>
                        </button>
                        <button
                          class="compare-button"
                          aria-label="Compare product"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M9,3V5H7A2,2 0 0,0 5,7V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V7A2,2 0 0,0 17,5H15V3H13V5H11V3H9M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
       <div className="row mt-5 mb-5 pb-5">
        <div className="col-lg-12 col-md-12 co-sm-12">
          <h1 className="border-bottom pb-4">
            Top Sellings
          </h1>
        </div>
          <div className="products-container mt-3  ">
            {highRated 
              .slice(0, 4)
              .map((product) => (
                <div class="product-card" key={product.id}>
                  <div class="card-badge-container">
                    <div class="discount-badge">-{product.discount}%</div>
                    <div class="category-badge">{product.category}</div>
                  </div>

                  <div class="product-image-wrapper">
                    <img
                      src={
                        product.ImageURL?.[0] ||
                        "https://via.placeholder.com/300x300?text=No+Image"
                      }
                      alt={product.Title}
                      class="product-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                      style={{ paddingTop: "0px" }}
                    />
                    {/* <button class="quick-view-button">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                      />
                    </svg>
                    Quick View
                  </button> */}
                  </div>

                  <div class="product-details">
                    <h3 class="product-title">{product.Title}</h3>

                    <div class="price-container">
                      <span class="current-price">
                        PKR {product.Price.toLocaleString()}
                      </span>
                      {product.discount && (
                        <span class="original-price">
                          PKR{" "}
                          {(
                            product.Price +
                            (product.Price * product.discount) / 100
                          )
                            .toFixed(0)
                            .toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div class="rating-container">
                      <div class="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill={
                              i < Math.floor(product.Rating || 0)
                                ? "#FFD700"
                                : "#DDDDDD"
                            }
                          >
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <span class="review-count">({product.Rating || 0})</span>
                    </div>

                    <div class="action-buttons">
                      <button
                        class="nav0cta1"
                        onClick={() => {
                          navigate("/product");
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fill="currentColor"
                            d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                      <div class="secondary-actions">
                        <button
                          class="wishlist-button"
                          aria-label="Add to wishlist"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                            />
                          </svg>
                        </button>
                        <button
                          class="compare-button"
                          aria-label="Compare product"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M9,3V5H7A2,2 0 0,0 5,7V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V7A2,2 0 0,0 17,5H15V3H13V5H11V3H9M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
       </div>
          <div id="space"></div>
        </div>
      </section>
      <section id="our_team1">
        <div className="contianer">
          <div className="row ">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card4">
                <div className="card-head ">
                  <p className="p">
                    <img
                      src={service}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>FREE AND FAST DELIVERY</h3>
                <p>Free delivery on more than 50K </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card4">
                <div className="card-head ">
                  <p className="p">
                    <img
                      src={security}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>MONEY BACK GUARANTEE</h3>
                <p>We return money within 30 days</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card4">
                <div className="card-head ">
                  <p className="p">
                    <img
                      src={headphines}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>24/7 CUSTOMER SERVICE</h3>
                <p>Friendly 24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Landing;
