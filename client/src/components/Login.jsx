import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import signup from "./images/signup.png";
import Google from "./images/Icon-Google.png";
import axios from "axios";
import {  toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";


const Login = () => {


    const navigate = useNavigate();
    const [email1, setEmail] = useState("");
    const [password2, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Add loading state

// normal Login*****
    const HandleLogin = async () => {
        try {
            setIsLoading(true); // Start loading
            const res = await axios.post("https://exclusive-app-z5t7.onrender.com/login", {
                email: email1,
                password: password2,
            });

            console.log(res);
            const token = res.data.token;
            sessionStorage.setItem("Auth-Token", token);

            toast.success("Login Success!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            FetchuserDetail();
        } catch (error) {
            console.error(error.response?.data || "Error occurred");

            toast.error("Invalid Email or Password", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // Google Login 

const HandleGoogleLogin = async (credentialResponse) => {
  const googleToken = credentialResponse.credential;

  try {
    const res = await axios.post('https://exclusive-app-z5t7.onrender.com/login-google', {
      token: googleToken,
    });

    if (res.status === 200) {
      const jwtToken = res.data.token;
      sessionStorage.setItem("Auth-Token", jwtToken);

      toast.success("Login Success!");
     FetchuserDetail(); // Also handles navigation
    }
  } catch (error) {
    console.error("Google login error:", error);
    const errorMsg = error.response?.data?.error || "Google login failed";
    toast.error(errorMsg);
  }
};


const FetchuserDetail =async () => {
try {
    const token = sessionStorage.getItem("Auth-Token");
    const response = await axios.get('http://localhost:3001/getuser',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    console.log(response.data);
    let userDetails = {
        loggedIn: true,
 
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role,
        Pic: response.data.user.profilePic,
    }
   

    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    
    // toast.success(response.data.message ||"Login Success!")
    if(response.data.success){
        console.log(response.data);
        if (response.data.user.role === "admin") {
            navigate("/admin");
        }
        else if (response.data.user.role === "user") {
            navigate("/userpanel");
        }
    }
    else{
        console.log(response.data.message || 'Error Occured');
    }
} catch (error) {
    console.log("An error Occured",error);
    console.error(error);
}
}
    const login = (e) => {
        e.preventDefault();
        if (email1.trim() === "" || password2.trim() === "") {
            toast.error("Please enter email and password", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } else {
            HandleLogin();
        }
    };

    return (
        <>
            <section id="Signup">
                <div className="signup-img">
                    <img src={signup} alt="Sign up" id="login" />
                </div>
                <div className="signup-text">
                    <div className="form">
                        <form onSubmit={login}>
                            <h1>Login to Exclusive</h1>
                            <p>Enter your details below</p>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email1}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password2}
                            />
                            <br />
                            <br />
                            <button type="submit" className="btn22" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                            <br />
                    
                               <GoogleLogin
  onSuccess={HandleGoogleLogin}
  onError={() => {
    toast.error("Invalid Email or Password", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
  }}
  className="google"
/>
                          
                            <br />
                        </form>
                        <Link to="/sign-up" className="link">
                            Create an Account? <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </section>
        
        </>
    );
};

export default Login;
