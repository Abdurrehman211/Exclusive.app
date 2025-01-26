import './navigation.css';
import React from 'react';
import search from './images/search.png';
import cart from './images/cart.png';
import wish from './images/heart.png';
import profile from './images/Profile.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Navigation() {
const navigate = useNavigate();
const [loggedIn , setLoggedIn] = useState(false);
useEffect(() => {
    setLoggedIn(false); 
},[]);
const handleProfile=()=>{
if (loggedIn) {
    navigate('/profile');
}
else{
    navigate('/login');
}

}


    return (
     <nav>
        <div className="logo">
            <h2>Exclusive</h2>
        </div>
        <div className="links">
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/contact-us'>Contact</a></li>
                <li><a href='/about'>About</a></li>
                <li><a href='/sign-up'>Sign up</a></li>
            </ul>
        </div>
        <div className="customs">
            <input type='search' placeholder='Search' className='search'  />
            <button className='btn'><img src={search} alt='search' id='search'/></button>
            <a href="/Cart"><img src={cart} alt='cart' id='cart'/></a>
           <a href='/Wishlist'> <img src={wish} alt="Wish" id='wish'/></a>
          <img src={profile} alt="Profile" id='profile' width={'30px'} height={'30px'} onClick={handleProfile} style={{cursor:'pointer'}}/>
        </div>
     </nav>
    );
}


export default Navigation;