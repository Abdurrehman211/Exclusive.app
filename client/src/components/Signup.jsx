import React from "react";
import './signup.css';
import { Link } from "react-router-dom";
import signup from './images/signup.png';
import Google from './images/Icon-Google.png';

const Signup = () => {

    return(
        <>
        <section id="Signup">
            <div className="signup-img">
                <img src={signup} alt="Sign up" id="login" /> 
            </div> 
            <div className="signup-text">
                <div className="form">
                    <form >
                        <h1>Create an Account</h1>
                        <p>Enter your details below</p>
                        <input type="text" placeholder="Name" /><br />
                        <input type="text" placeholder="Email" /><br />
                        <input type="password" placeholder="Password" /><br />
                        <input type="password" placeholder="Confirm Password" />
                        <br />
                        <button type="submit" className="btn22">Create Account</button><br />
                        <button type="Google-login" className="google"><img src={Google} alt="Google" />Sign up with Google</button>
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