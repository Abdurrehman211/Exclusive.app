import './navigation.css';
import React, { useState, useEffect } from 'react';
import search from './images/search.png';
import cart from './images/cart.png';
import wish from './images/heart.png';
import profile from './images/Profile.png';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const [userdata, setUser] = useState("");
    const location = useLocation();

    // Fetch user data when location changes
    useEffect(() => {
        getData();
    }, [location]);

    const getData = async () => {
        let data = sessionStorage.getItem("userDetails");
        if (data){
            let parseData = JSON.parse(data);
            if (parseData &&  parseData.loggedIn) {
                setUser(parseData);
            }
            else{
                setUser("");
            }
        }else{
            setUser("");
        }      
    };

    useEffect(() => {
        console.log(userdata); // Log the updated userdata after state change
    }, [userdata]); // This will log whenever userdata changes

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
                <input type='search' placeholder='Search' className='search' />
                <button className='btn'><img src={search} alt='search' id='search' /></button>

                {userdata ? (
                    <>
                        <a href="/Cart"><img src={cart} alt='cart' id='cart' /></a>
                        <a href='/Wishlist'><img src={wish} alt="Wish" id='wish' /></a>
                        <Link to={`/Userpanel`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}><img src={profile} alt="Profile" id='profile' width={'30px'} height={'30px'} style={{ cursor: 'pointer' }} />{userdata.name}</Link>
                    </>
                ) : (
                    <>
                        <a href="/Cart"><img src={cart} alt='cart' id='cart' /></a>
                        <a href='/Wishlist'><img src={wish} alt="Wish" id='wish' /></a>
                        <Link to={`/login`}><img src={profile} alt="Profile" id='profile' width={'30px'} height={'30px'} style={{ cursor: 'pointer' }} /></Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;