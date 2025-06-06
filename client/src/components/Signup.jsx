import React from "react";
import './signup.css';
import { Link, useNavigate } from "react-router-dom";
import signup from './images/signup.png';
import Google from './images/Icon-Google.png';
import axios from "axios";
import {  toast } from "react-toastify";
import { useState } from "react";
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const role = "user";

    const HandleSign=()=>{
        axios.post("http://localhost:3001/register",{
            name:name,
            email:email,
            password:password,
            role:role
        }).then(Response =>{
            console.log(Response.data);
            if(Response.status == 201){
                toast.success("Signup Successfull");
            navigate("/login");
            }
           
            else{
                toast.error("Something went wrong");
            }
       
        })
        .catch(err =>{
           if (err.response && err.response.status === 409) {
            toast.error("Email already exists. Please use a different one.");
        } else {
            toast.error("Signup failed. Please try again.");
            console.error(err);
        }
        })
    }
const HandleSignup =(e)=>{
e.preventDefault();
if ( password.length < 8 || confirmPassword.length < 8){
    alert("Password must be at least 8 characters");
}
else if(password !== confirmPassword){
    alert("Passwords do not match");
}
else{
HandleSign();
    }
}
    return(
        <>
        <section id="Signup">
            <div className="signup-img">
                <img src={signup} alt="Sign up" id="login" /> 
            </div> 
            <div className="signup-text">
                <div className="form">
                    <form onSubmit={HandleSignup}>
                        <h1>Create an Account</h1>
                        <p>Enter your details below</p>
                        <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)} /><br />
                        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} /><br />
                        <input type="password" placeholder="Password" required  onChange={(e) => setPassword(e.target.value)} /><br />
                        <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <br />
                        <button type="submit" className="btn22">Create Account</button><br />
                       
                        <br />
                       
                    </form>
                    <Link to="/login" className="link">Already have an account? <span>Login</span></Link>
                </div>
            </div>   
        </section>    
        </>
    )
};
export default Signup;  