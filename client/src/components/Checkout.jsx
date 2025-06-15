import React, { useEffect, useState } from "react";
import './checkout.css';
import controler from './images/controlller.png';
import lcdd from './images/LCD.png';
import Footer from './Footer';
import './checkout.css';

function Checkout() {
    
  const [formData, setFormData] = useState({
    firstname: '',
    companyname: '',
    streetaddress: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    payment: ''
  });
  const [checked , setChecked] = useState(false);

  const handleChecked = ()=>{
    setChecked(!checked);
    if(checked){
       
    }else{
     
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    console.log("Form Data:", formData);
    setFormData({
      firstname: '',
      companyname: '',
      streetaddress: '',
      apartment: '',
      city: '',
      phone: '',
      email: '',
      payment: ''
    });
  };

  return (
    <>

    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h4>Billing Details</h4>
          <input name="firstname" type="text" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
          <input name="companyname" type="text" placeholder="Company Name" value={formData.companyname} onChange={handleChange} />
          <input name="streetaddress" type="text" placeholder="Street Address" value={formData.streetaddress} onChange={handleChange} />
          <input name="apartment" type="text" placeholder="Apartment, Suite, etc." value={formData.apartment} onChange={handleChange} />
          <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} />
          <input name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <div className="terms ">
            <input type="checkbox" onChange={handleChecked} /> Save this information for faster checkout next time
          </div>
          
        </div>

        <div className="order-summary">
          <div className="item">
            <img src={controler} alt="LCD Monitor" />
            <div className="item-info">
              <span>LCD Monitor</span>
              <span>$650</span>
            </div>
          </div>

          <div className="item">
            <img src={lcdd} alt="H1 Gamepad" />
            <div className="item-info">
              <span>H1 Gamepad</span>
              <span>$1100</span>
            </div>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>$1750</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="payment-options">
            <label>
              <input type="radio" name="payment" value="Bank" checked={formData.payment === 'Bank'} onChange={handleChange} /> Bank
            </label>
            <label>
              <input type="radio" name="payment" value="COD" checked={formData.payment === 'COD'} onChange={handleChange} /> Cash on Delivery
            </label>
          </div>

          <div className="checkout-buttons">
            <button type="submit" className="nav0cta1">Place Order</button>
          </div>
        </div>
      </form>

  
    </div>
        <footer>
        <Footer />
      </footer>
        </>
  );
}

export default Checkout;
