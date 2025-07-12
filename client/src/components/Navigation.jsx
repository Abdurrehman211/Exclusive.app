import "./navigation.css";
import React, { useState, useEffect } from "react";
import search from "./images/search.png";
import cart from "./images/cart.png";
import wish from "./images/heart.png";
import profile from "./images/Profile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Business from "./images/Busines.gif";
import { googleLogout } from '@react-oauth/google';
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartCounterContext } from "./context/CartCouter";
function Navigation() {
  const context = useContext(CartCounterContext);

  if (!context) {
    throw new Error("CartCounterContext is not provided");
  return null; // or handle the error as needed
  }

  const [userdata, setUser] = useState("");
  const [admindata, setAdmin] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const profilePic = sessionStorage.getItem("Pic");

  // Fetch user data when location changes
  useEffect(() => {
    getData();
  }, [location]);

  const getData = async () => {
    let data = sessionStorage.getItem("userDetails");

    if (data) {
      let parseData = JSON.parse(data);
      if (parseData.loggedIn) {
        if (parseData.role === "admin") {
          setAdmin(parseData);
          setUser("");
        } else {
          setUser(parseData);
          setAdmin("");
        }
      } else {
        setUser("");
        setAdmin("");
      }
    } else {
      setAdmin("");
      setUser("");
    }
  };

  useEffect(() => {
    console.log(userdata); // Log the updated userdata after state change
  }, [userdata]); // This will log whenever userdata changes


  const handleLogout = () => {


  console.log("Clearing the Session storage")
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
  return (
    <nav className="nav">
      <div className="logo">
        <h2>Exclusive</h2>
      </div>
      <div className="links">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/sign-up">Sign up</a>
          </li>
        </ul>
      </div>
      <div className="customs">
        <input type="search" placeholder="Search" className="search" />
        <button className="btn">
          <img src={search} alt="search" id="search" />
        </button>

        {userdata ? (
          <>
            <a href="/Cart" className="cart-link">
              <img src={cart} alt="cart" id="cart" /> 
               {context.cartCounter > 0 && (
    <span className="cart-counter">{context.cartCounter}</span>
  )}
            </a>
            <a href="/Wishlist">
              <img src={wish} alt="Wish" id="wish" />
            </a>
            <Link to={`/Userpanel`} className="admin profile-dropdown" >
              <img
                src={profilePic ? profilePic : profile}
                alt="Profile"
                id="profile"
                width={"30px"}
                height={"30px"}
                style={{ cursor: "pointer" }}
              />
               <div className="dropdown-menu  ">
                          <a href="/Account">My Account</a>
                <a onClick={handleLogout}>Logout</a>
      
              </div>
              {userdata.name}
            </Link>
          </>
        ) : admindata ? (
          <>
            <a href="/admin" className="admin profile-dropdown">
              <img
                src={Business}
                alt="Profile"
                id="profile"
                width={"30px"}
                height={"30px"}
                style={{ cursor: "pointer" }}
              />
                <div className="dropdown-menu">
                  <a href="/Account">My Account</a>
                <a onClick={handleLogout}>Logout</a>
                
              </div>
              {admindata.name} 
            </a>
          </>
        ) : (
          <>
            <a href="/Cart">
              <img src={cart} alt="cart" id="cart" />
            </a>
            <a href="/Wishlist">
              <img src={wish} alt="Wish" id="wish" />
            </a>

            <div className="profile-dropdown" onClick={() => navigate("/login")}>
              <img
                src={profile}
                alt="Profile"
                id="profile"
                width="30px"
                height="30px"
              />
            
             
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
