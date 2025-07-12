import React, { useEffect, useState, useContext } from "react";
import controler from "./images/controlller.png";
import lcdd from "./images/LCD.png";
import Footer from "./Footer";
import { FaTrash } from "react-icons/fa";
import "./cart.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartCounterContext } from "./context/CartCouter";

function Cart() {
 const { setCartCounter } = useContext(CartCounterContext);
  const Location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const token = sessionStorage.getItem("Auth-Token");
  const [logged, setLoggedIn] = useState("");
  let cartId;
  const FetchuserDetail = async () => {
    try {
      const token = sessionStorage.getItem("Auth-Token");
      if (!token) {
        setLoggedIn("false");
        console.log("No token found, user not logged in.");
        return;
      }

      const response = await axios.get("http://localhost:3001/getuser", {
        headers: { Authorization: `Bearer ${token}` },
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
        sessionStorage.setItem("id", response.data.user._id);
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

        // Redirect if admin

        if (userDetails.loggedIn === true) {
          setLoggedIn("true");
          toast.success("Redirecting to Checkout");
          navigate("/Checkout");
        } else {
          setLoggedIn("false");
          toast.error("Please Login to Continue");
        }
      } else {
        console.log(response.data.message || "Error Occurred");
      }
    } catch (error) {
      console.log("An error Occurred", error);
      console.error(error);
    }
  };
  const userId = sessionStorage.getItem("id");

  const [cartItems, setCartItems] = useState([]);


  const handleDelete = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/delete-item-from-cart",
      {
        userId,
        productId: id, // This must be the actual productId, NOT the cart item _id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      // Update UI
      console.log("All item IDs:", cartItems.map(item => item.id));
      console.log("Deleting ID:", id);

      const updatedItems = cartItems.filter((item) => item.cartItemId !== id);
setCartItems(updatedItems);
setCartCounter(updatedItems.length);
      setTimeout(() => {
  try {
    toast.success("Item removed from cart successfully");
  } catch (e) {
    console.warn("Toast error:", e);
  }
}, 100);
    } else {
      toast.error(response.data.message || "Failed to remove item");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    toast.error("Error removing item from cart");
  }
};

  const changeQuantity = (id, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCartItems(updatedItems);
  };
  useEffect(() => {
    addToCart();
  }, []);

  const addToCart = async () => {
    try {
      const response = await axios.post("http://localhost:3001/get-cart-item", {
        userId,
      });


       if (!response.data.success || !response.data.items?.items) {
      toast.error("Failed to fetch cart items");
      return;
    }
      const cartItems = response.data.items;
      console.log("Cart Items:", cartItems);
      cartId = response.data.items._id;
      sessionStorage.setItem("cartId", cartId);
      // Fetch product data for each cart item
      const updatedItems = await Promise.all(
        cartItems.items.map(async (item) => {
          try {
            const res = await axios.post(
              "http://localhost:3001/get-product-by-id",
              {
                productId: item.productId,
              }
            );
            const product = res.data.product;
            return {
              cartItemId: item._id, 
              id: item.productId,
              name: product.Title,
              price: product.Price,
              image: product.ImageURL?.[0] || "https://via.placeholder.com/150",
              quantity: item.quantity,
            };
          } catch (err) {
            console.error("Failed to fetch product:", err);
            return null;
          }
        })
      );
      const filteredItems = updatedItems.filter(Boolean); // remove nulls
      setCartItems(filteredItems);
    setCartCounter(filteredItems.length); // Update cart counter in context
      console.log("Updated Cart Items:", filteredItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Error fetching cart");
    }
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
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
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
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="product-cell">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </td>
                <td>PKR {item.price.toLocaleString()}</td>
                <td>
                  <div className="qty-controls">
                    <button onClick={() => changeQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </td>
                <td>PKR {(item.price * item.quantity).toLocaleString()}</td>
                <td>
                  <FaTrash
                    className="bin-icon"
                    onClick={() => handleDelete(item.cartItemId)}
                  />
      
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
       
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
              <li>
                {" "}
                PKR{" "}
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
              </li>
            </div>
            <hr />
            <div className="cart-total">
              <li> Shipping</li>
              <li> free</li>
            </div>
            <hr />
            <div className="cart-total">
              <li> Total</li>
              <li>
                {" "}
                PKR{" "}
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
              </li>
            </div>

            <button className="nav0cta1 mb-4 mt-3" onClick={FetchuserDetail}>
              Proceed to Check Out
            </button>
            {logged === "false" && (
              <div class="warning">
                <div class="warning__icon">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z"
                      fill="#393a37"
                    ></path>
                  </svg>
                </div>
                <div class="warning__title">
                  You have to <a href="/login">Login</a> for completing your
                  order!
                </div>
                <div class="warning__close">
                  <svg
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                      fill="#393a37"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
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
