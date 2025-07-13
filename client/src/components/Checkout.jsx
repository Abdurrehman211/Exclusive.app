import React, { useEffect, useState } from "react";
import './checkout.css';
import controler from './images/controlller.png';
import lcdd from './images/LCD.png';
import Footer from './Footer';
import './checkout.css';
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import GooglePayButton from '@google-pay/button-react';

function Checkout() {
    const navigate = useNavigate();
 const [formData, setFormData] = useState({
  firstname: '',
  companyname: '',     // This is being used as "country"
  streetaddress: '',
  apartment: '',
  city: '',
  ZipCode: '',         // Add this line
  phone: '',
  email: '',
  payment: ''
});
const token = sessionStorage.getItem("Auth-Token");

useEffect(() => {
  const controller = new AbortController();
  FetchuserDetail(controller.signal);

  return () => {
    controller.abort(); // cancel on unmount
  };
}, []);

const FetchuserDetail = async () => {
  try {
      const token = sessionStorage.getItem("Auth-Token");
      const role = sessionStorage.getItem("User-Role"); // Get user role
      if (!token) {
          navigate("/login");
          return;
      }

      const response = await axios.get('https://exclusive-app-z5t7.onrender.com/getuser', {
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
           const link = userDetails.Pic;
               sessionStorage.setItem('id',response.data.user._id
);
           sessionStorage.setItem("userDetails", JSON.stringify(userDetails));


          // Redirect if admin
          if (role === "admin") {
              navigate("/AdminPanel");
          }
      } else {
          console.log(response.data.message || 'Error Occurred');
      }
  } catch (error) {
      console.log("An error Occurred", error);
      console.error(error);
  }
};

    const HandleGoogleData = async (paymentData) => {
    const userId = sessionStorage.getItem('id');
    const Order_id = Math.floor(Math.random() * 1000000).toString();
    const address = {
        name: formData.firstname,
        addressLine: `${formData.streetaddress}, ${formData.apartment}`,
        city: formData.city,
        country: formData.companyname,
        postalCode: formData.ZipCode,
        phoneNo: formData.phone,
        email: formData.email,
    };
    const items = [
        { productName: "LCD Monitor", quantity: 1, price: 650 },
        { productName: "H1 Gamepad", quantity: 1, price: 1100 }
    ];
    const amount = 1750; // Total amount
    const paymentMethod = 'Google Pay'; // Hardcoded for Google Pay
    const payload = {
        userId,
        amount,
        Order_id,
        address,
        items,
        paymentMethod,
        paymentData, // Include Google Pay payment data
        saved: checked
    };
    try {
        const response = await axios.post('https://exclusive-app-z5t7.onrender.com/gateway/GooglePay', payload, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log("Google Pay response:", response);
        if (response.data.status === 201) {
            toast.success(response.data.message || "Order placed successfully via Google Pay!");
            setFormData({
                firstname: '',
                companyname: '',
                streetaddress: '',
                apartment: '',
                city: '',
                ZipCode: '',
                phone: '',
                email: '',
                payment: ''
            });
        } 
        if (response.data.status === 400) {
            toast.error(response.data.message || "Failed to place order via Google Pay");
        }
    } catch (error) {
        console.error("Google Pay order submission failed:", error);
        toast.error(error.response?.data?.error || "Failed to place order via Google Pay. Please try again.");
    }
};

  // State to manage whether the information should be saved for faster checkout

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

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const userId = sessionStorage.getItem('id');
    const Order_id = Math.floor(Math.random() * 1000000).toString();
     const address = {
        name: formData.firstname,
       addressLine: `${formData.streetaddress}, ${formData.apartment}`,
       city: formData.city,
         country: formData.companyname,
         postalCode: formData.ZipCode,
         phoneNo: formData.phone,
         email: formData.email,
     }
     const items = [
    { productName: "LCD Monitor", quantity: 1, price: 650 },
    { productName: "H1 Gamepad", quantity: 1, price: 1100 }
     ];
     const amount = 1750; // Total amount
    const paymentMethod = formData.payment;
    const payload = {
    userId,
    amount,
    Order_id,
    address,
    items,
    paymentMethod,
    saved: checked
  };
  const endpoint = paymentMethod === 'Bank' ? '/gateway/payment' : '/gateway/COD';
try {
      const response  = await axios.post(`https://exclusive-app-z5t7.onrender.com${endpoint}`, payload, {
    headers: {
        authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
});
  if (paymentMethod === "Bank") {
      // Safepay — redirect to payment gateway
      if (response.data && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        alert("Payment initiation failed.");
      }
    } else {
      // COD
      toast.success("Order placed successfully via Cash on Delivery!");
      setFormData({
        firstname: '',
        companyname: '',
        streetaddress: '',
        apartment: '',
        city: '',
        ZipCode: '',
        phone: '',
        email: '',
        payment: ''
      });
    }
  } catch (error) {
    console.error("Order submission failed:", error);
    toast.error("Failed to place order. Please try again.");
  }

  };

  return (
    <>

    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h4>Billing Details</h4>
          <input name="firstname" type="text" placeholder="Full Name" value={formData.firstname} onChange={handleChange} />
           <input name="apartment" type="text" placeholder="Home, Apartment, Suite, etc." value={formData.apartment} onChange={handleChange} />
          <input name="streetaddress" type="text" placeholder="Street Address & Town" value={formData.streetaddress} onChange={handleChange} />
          <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} />
           <input name="companyname" type="text" placeholder="Country Name" value={formData.companyname} onChange={handleChange} />
          <input name="ZipCode" type="text" placeholder="Zip Code" value={formData.ZipCode} onChange={handleChange} />
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
              <input type="radio" name="payment" value="COD" checked={formData.payment === 'COD'} onChange={handleChange} /> Cash on Delivery
            </label>
          <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example', // Replace with 'safepay' if using Safepay
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
      },
    }],
    merchantInfo: {
      merchantId: 'BCR2DN4TXL5Q6GXX', // Test merchant ID
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1750.00',
      currencyCode: 'PKR', // Pakistan Rupee
      countryCode: 'PK', // Pakistan
    },
    shippingAddressRequired: true,

    // REMOVE callbackIntents unless you implement handlers
  }}
  onLoadPaymentData={paymentData => {
    console.log('Google Pay success:', paymentData);
    toast.success("Google Pay payment successful");
    // Handle successful payment here, e.g., send paymentData to your server
    HandleGoogleData(paymentData);
  }}
  onError={error => {
    console.error('Google Pay error:', error);
    toast.error("Google Pay payment failed");
  }}
  buttonType="buy"
    buttonSizeMode="fill"

  buttonColor="black"
/>
          
            {/* <label>
              <input type="radio" name="payment" value="Bank" checked={formData.payment === 'Bank'} onChange={handleChange}  /> Bank
            </label> */}
            
           
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
