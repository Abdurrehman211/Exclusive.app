import React from "react";
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import signup from './images/signup.png';
import Google from './images/Icon-Google.png';
import axios from "axios";
import { useState } from "react";
const Login = () => {
const navigate = useNavigate();
    const [email1, setEmail] = useState("");
    const [password2, setPassword] = useState("");
const HandleLogin=()=>{
axios.post("http://localhost:3001/login",{
    email:email1,
    password:password2
}).then(res=>{
    console.log(res.data);
    alert("Login Success");
    navigate("/Home");
}).catch(res=>{
    console.log(res.data);
    alert("Login Failed");
})
}
const login=(e)=>{
e.preventDefault();
    if (email1.trim() === "" || password2.trim() === "") {
        alert("Please enter email and password");
    }
    else{
        HandleLogin();
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
                    <form onSubmit={login}>
                        <h1>Login to Exclusive</h1>
                        <p>Enter your details below</p>
                        <input type="text" placeholder="Email" required onChange={e => setEmail(e.target.value)}/><br />
                        <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/><br />
                        <br />
                        <button type="submit" className="btn22" >Login</button><br />
                        <button type="Google-login" className="google"><img src={Google} alt="Google" />Sign up with Google</button>
                        <br />
                       
                    </form>
                    <Link to="/sign-up" className="link">Create an Account? <span>Sign Up</span></Link>
                </div>
            </div>   
        </section>    
        </>
    )
};
export default Login;  