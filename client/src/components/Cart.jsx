import React, { useState } from "react";
import controler from "./images/controlller.png";
import lcdd from "./images/LCD.png";
import Footer from "./Footer";
import { FaTrash } from 'react-icons/fa';
import "./cart.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
      const Location = useLocation();
      const navigate = useNavigate();

      const token = sessionStorage.getItem("Auth-Token");
      const [logged, setLoggedIn] = useState("");
const FetchuserDetail = async () => {
  try {
      const token = sessionStorage.getItem("Auth-Token");
      if (!token) {
          setLoggedIn('false');
          console.log("No token found, user not logged in.");
          return;
      }

      const response = await axios.get('http://localhost:3001/getuser', {
          headers: { 'Authorization': `Bearer ${token}` }
      });

     
      if (response.data.success) {
         

          let userDetails = {
              loggedIn: true,
              name: response.data.user.name,
              email: response.data.user.email,
              role: response.data.user.role,
              Pic: response.data.user.profilePic,
          };
          console.log("User Details:", userDetails);
               sessionStorage.setItem('id',response.data.user._id);
           sessionStorage.setItem("userDetails", JSON.stringify(userDetails));


          // Redirect if admin
     

          if (userDetails.loggedIn === true) {
            setLoggedIn('true');
             toast.success("Redirecting to Checkout");
              navigate("/Checkout");
             
          }
          else{
            setLoggedIn('false');
            toast.error("Please Login to Continue");
            
                
          }
      } else {
          console.log(response.data.message || 'Error Occurred');
      }
  } catch (error) {
      console.log("An error Occurred", error);
      console.error(error);
  }
};


  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: controler
    },
    {
      id: 2,
      name: "Hi Gamepad",
      price: 750,
      quantity: 1,
      image: lcdd
    }
  ]);

    const handleDelete = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };
  const changeQuantity = (id, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCartItems(updatedItems);
  };
  return (
    <>
     <section id="Links">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>
                Home <strong> {Location.pathname}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
      <table className="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map(item => (
          <tr key={item.id}>
            <td className="product-cell">
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </td>
            <td>${item.price}</td>
            <td>
              <div className="qty-controls">
                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
              </div>
            </td>
            <td>${item.price * item.quantity}</td>
            <td>
              <FaTrash className="bin-icon" onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
        {cartItems.length === 0 && (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
              Your cart is empty.
            </td>
          </tr>
        )}
      </tbody>
    </table>
        {/* <div className="row mt-5">
          <div className="col-lg-12 col-sm-12 col-md-12" id="Cart-button">
            <button className="btn btn-primary"> Return To Home</button>
          </div>
        </div> */}
        <div className="row mt-5 mb-5">
          <div className="col-lg-6 col-md-12  col-sm-12" id="Coupon">
            <fieldset>
              <legend>
                <h4 className="mt-4">Coupon Code</h4>
              </legend>
              <p className="mt-4">Enter your coupon code if you have one.</p>
              <label htmlFor="Coupon-Code" className="mb-2">
                Coupon Code
              </label>
              <input
                type="text"
                id="Coupon-Code"
                className="form-control"
                placeholder="Enter Coupon Code"
              />
              <button className="nav0cta1 mt-4 text-right">
                {" "}
                Apply Coupon
              </button>
            </fieldset>
          </div>
          <div className=" col-lg-6 col-md-12 col-sm-12  Shipment ">
            <h6 className="mt-4"> Cart Total</h6>
            <div className="cart-total">
              <li className="mt-4"> Subtotal</li>
              <li> $1750</li>
            </div>
            <hr />
            <div className="cart-total">
              <li> Shipping</li>
              <li> free</li>
            </div>
            <hr />
            <div className="cart-total">
              <li> Total</li>
              <li> $1750</li>
            </div>
        
              <button className="nav0cta1 mb-4 mt-3" onClick={FetchuserDetail}>
                Proceed to Check Out
              </button>
            { logged === 'false' && (
         <div class="warning">
    <div class="warning__icon">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z" fill="#393a37"></path></svg>
    </div>
        <div class="warning__title">You have to <a href="/login">Login</a> for completing your order!</div>
    <div class="warning__close"><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path></svg></div>
</div>
            )

            }
   
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        />
    </>
  );
}
export default Cart;
