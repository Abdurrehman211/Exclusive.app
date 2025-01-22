import './navigation.css';
import React from 'react';
import { useState, useEffect } from 'react';
import search from './images/search.png';
import cart from './images/cart.png';
import wish from './images/heart.png';
function Navigation() {

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
            <a href="#"><img src={cart} alt='cart' id='cart'/></a>
           <a href='#'> <img src={wish} alt="Wish" id='wish'/></a>
        </div>
     </nav>
    );
}
export default Navigation;