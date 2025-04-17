import React, { useState , useRef } from "react";
import apple from './images/apple.png';
import arrow33 from './images/arrow.png';
import phone from './images/iphone.png';
import dropdown from './images/DropDown.png';
import dots from './images/dots.png';
import smheart from './images/heartsmall.png';
import Quickview from './images/QuickView.png';
import controller from './images/controlller.png';
import stars from './images/Fivestar.png';
import lcd from './images/LCD.png';
import keyboard from './images/Keyboard.png';
import chair from './images/Chair.png';
import './landing.css';
import heartsm from './images/heartsm.png';
import gif from './images/heartfilled.gif';
import phone1 from './images/Category-CellPhone.png';
import white from './images/Cellphone.png';
import comp from './images/Category-Computer.png';
import cam from './images/Category-Camera.png';
import watch from './images/Category-SmartWatch.png';
import headphones from './images/Category-Headphone.png';
import gamepad from './images/Category-Gamepad.png';
import whcomp from './images/computer.png';
import whheadphones from './images/headphones.png';
import camera from './images/camera.png';
import watch1 from './images/watch.png';
import nintendo from './images/nintendo.png';
import coat from './images/coat.png';
import bag from './images/bag.png';
import boom from './images/boombox.png';
import ps5 from './images/ps5.png';
import hat from'./images/hat.png';
import perfumes from './images/perfumes.png';
import service from './images/delivery.png';
import headphines from './images/headphines.png';
import security from './images/security.png';
import Footer from "./Footer";
import Accessibilityprovider from "./context/Accessibility";


function Landing() {

const [activeCategory, setActiveCategory] = useState(null);
const [show , setshow] = useState(false);
const togglebutton=()=>
{
    setshow (!show);
}


const arrow=useRef(null);
const arrow2=useRef(null);
    const toggleCategory = (category) => {
        if (category === 'women') {
            arrow2.current.style.transform ='rotate(0deg)';
            arrow.current.style.transition='0.2s all ease';
            arrow.current.style.transform = activeCategory === 'women' ? 'rotate(0deg)' : 'rotate(90deg)';
        }
        else if (category === 'men') {    
            arrow.current.style.transform ='rotate(0deg)';
            arrow2.current.style.transition='0.2s all ease';
            arrow2.current.style.transform = activeCategory === 'men' ? 'rotate(0deg)' : 'rotate(90deg)';
        }
        setActiveCategory(activeCategory === category ? null : category);
    };

    return(
<>

<section id="landing">
 
<aside>
        <ul>
            <li onClick={() => toggleCategory('women')} >Woman's Fashion <img src={dropdown} alt="arrow" id="arrow1" ref={arrow}/></li>
            {
                activeCategory ==='women' && (
                    <div className="dropdown">
                        <ul>
                            <li><a href="/product">Watches</a></li>
                            <li><a href="/product">Dresses</a></li>
                            <li><a href="/product">Bottom</a></li>
                            <li><a href="/product">Tops</a></li>
                            <li><a href="/product">Accessories</a></li>
                        </ul>
                    </div>
                )
            }
            <li onClick={() => toggleCategory('men')}>Man's Fashion <img src={dropdown} alt="arrow" id="arrow2" ref={arrow2}/></li>
            {activeCategory === 'men' && (
                <div className="dropdown">
                    <ul>
                            <li><a href="/product">Watches</a></li>
                            <li><a href="/product">T-Shirts</a></li>
                            <li><a href="/product">Pants</a></li>
                            <li><a href="/product">Footwears</a></li>
                            <li><a href="/product">Accessories</a></li>
                    </ul>
                </div>
            )}
            <li>Electronics</li>
            <li>Home & Lifestyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Baby's & Toys</li>
            <li>Groceries & Pets</li>
            <li>Health & Beauty</li>
        </ul>
    </aside> 
    {/* <div className="access" onClick={togglebutton} >
        Accessability {show ? "hide": "show"} options
        { show &&(

        
    <div className={'pagecont ${highContrast ? "high-contrast":"" } ${ largeFont ? "large-font":""}'}>
    <button id="bootn" onClick={toggleContrast}>Toggle High Contrast</button>
    <button id="bootn" onClick={toggleFont}>Toggle Large Text</button>
    </div>
        )}
    </div> */}
    <div className="main">
        <img src={dropdown} alt="dropdown" className="dropdown1" />
        
        <div className="ads">
            <div className="text">
                <div className="company">
                    <img src={apple} alt="apple" className="apple" />
                    <p>iPhone 14 Series</p>
                </div>
                <div className="main-text">
                Up to 10% <br /> off Voucher
                </div>
                <div className="button">
                    <button>
                        Shop Now
                    </button>
                    <img src={arrow33} alt="arrow" className="arrow"/>
                </div>
            </div>
            <div className="pics">
                <img src={phone} alt="phone" className="phone" />
            </div>
        </div>
        <img src={dropdown} alt="dropdown" className="dropdown3" />
    </div>

</section>
<section id="Sales">
    <div className="main-sales">
        <div className="day">
            <p id="p1"></p>
            <p className="p">Today's</p>
        </div>
        <div className="timer">
            <div className="time">
            <h1>Flash Sales</h1>
            <h2>Time Remaining:</h2>
            </div>
            <div className="button1">
              <button>View All</button>
            </div>
        </div>
        <div className="products">
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={gif} alt="Comming" id="not-filled"/>
                <img src={heartsm} alt="small heart" id="filled" />
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={controller} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={keyboard} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={lcd} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
        
          
           
        </div>
        <div id="space"></div>
    </div>

</section>

<section id="Category">
<div className="main-sales1">
        <div className="day">
            <p id="p1"></p>
            <p className="p">Today's</p>
        </div>
        <div className="timer">
            <div className="time1">
            <h1>Browse By Category</h1>
            </div>
            <div className="button1">
              <button>View All</button>
            </div>
        </div>
        <div className="products">
            <div className="main-cat">
            <div className="card1">
            <img src={phone1} alt="phone" id="phone1" />
            <img src={white} alt="white phone" id="phone-1"/>
            <p>Phones</p>
           </div>
           <div className="card1">
            <img src={comp} alt="phone" id="phone1" />
            <img src={whcomp} alt="white phone" id="phone-1"/>
            <p>Computer</p>
           </div>
           <div className="card1">
            <img src={camera} alt="phone" id="phone1" />
            <img src={cam} alt="white phone" id="phone-1"/>
            <p>Camera</p>
           </div>
           <div className="card1">
            <img src={headphones} alt="phone" id="phone1" />
            <img src={whheadphones} alt="white phone" id="phone-1"/>
            <p>Headphone</p>
           </div>
           {/* <div className="card1">
            <img src={watch} alt="phone" id="phone1" />
            <img src={watch1} alt="white phone" id="phone-1"/>
            <p>SmartWatch</p>
           </div>  */}
          {/* <div className="card1">
            <img src={gamepad} alt="phone" id="phone1" />
            <img src={nintendo} alt="white phone" id="phone-1"/>
            <p>Gaming</p>
           </div> */}
            </div>
        </div>
    </div>
</section>

<section id="Sales">
    <div className="main-sales">
        <div className="day">
            <p id="p1"></p>
            <p className="p">Today's</p>
        </div>
        <div className="timer">
            <div className="time">
            <h1>Best Selling Products</h1>
   
            </div>
            <div className="button1">
              <button>View All</button>
            </div>
        </div>
        <div className="products">
 
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={coat} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$100</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={lcd} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={chair} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={controller} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$80</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
           
        </div>

    </div>

</section>
<section id="flash-sale">
    <div className="container1">
        <div className="optional-sale">
            <div className="sale-text">
                <p id="sale-p">Category</p>
                <h1>Enhance your <br /> music Experience</h1>
                <div className="sales-timer">
                    <div className="hour">
                        <p>time</p>
                        <p>hours</p>
                    </div>
                    <div className="minutes">
                        <p>time</p>
                        <p>Minutes</p>
                    </div>
                    <div className="seconds">
                        <p>time</p>
                        <p>Seconds</p>
                    </div>
                </div>
                <div className="button2">
                <button>
                    Buy Now
                </button>
                </div>
            </div>
            <div className="pics">
                <img src={boom} alt="boom" id="boom"/>
            </div>
        </div>
    </div>
</section>
<section id="sales1">
    <div className="main-sales">
        <div className="day">
            <p id="p1"></p>
            <p className="p">Today's</p>
        </div>
        <div className="timer">
            <div className="time">
            <h1>Flash Sales</h1>
            <h2>Time Remaining:</h2>
            </div>
            <div className="button1">
              <button>View All</button>
            </div>
        </div>
        <div className="products">
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={gif} alt="Comming" id="not-filled"/>
                <img src={heartsm} alt="small heart" id="filled" />
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={controller} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={keyboard} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={lcd} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>

            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={chair} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
           
        </div>
        <div className="products">
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={gif} alt="Comming" id="not-filled"/>
                <img src={heartsm} alt="small heart" id="filled" />
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={controller} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={keyboard} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={lcd} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>

            <div className="card">
                <img src={smheart} alt="wishlist" id="Smallheart"/>
                <img src={Quickview} alt="Quick view" id="QuickView"/>
             <div className="main-layer">

                <p> -40% </p>
                <img src={chair} alt="controller" id="controller"/>
                <button className="Button">ADD to cart</button>
             </div>
             <div className="card-body">
                <h3>HAVIT HV-G92 Gamepad</h3>
                <div className="price">
                    <p>$120</p>
                    <del>$150</del>
                </div>
                <div className="review">
                <img src={stars} alt="stars"/>
                <p>(88)</p>
                </div>
             </div>
            </div>
           
        </div>
        <button id="button">View All</button>
        <div id="space"></div>
    </div>

</section>

<section id="arrivals">
<div className="main-sales">
        <div className="day">
            <p id="p1"></p>
            <p className="p">Featured</p>
        </div>
        <div className="timer">
            <div className="time">
            <h1>New Arrival</h1>
            </div>
        </div>
        <div className="main-container">
        <div className="left">
        <div className="wrapper"></div>
            <img src={ps5} alt="ps5" id="ps5"/>
            <div className="text-left">
                <h3>PlayStation 5</h3>
                <p id="p-text">Black and White version of the PS5 coming out on sale.</p>
                <button id="Button">Shop Now</button>
            </div>
        </div>
        <div className="right">
            <div className="upper">
                <div className="upper-left">

                </div>
            <div className="text-upper">
                    <h3>Women’s Collections</h3>
                    <p id="p-text">Featured woman collections that give you another vibe.</p>
                    <button id="Button">Shop Now</button>
                </div>
                <div className="img">
                <img src={hat} alt="hat" id="hat"/>
                </div>
                
            </div>
            <div className="upper">
            <div className="upper">
                <div className="upper-left1">
                </div>
            <div className="text-upper">
                    <h3>Perfume's Collections</h3>
                    <p id="p-text">Featured woman collections that give you another vibe.</p>
                    <button id="Button">Shop Now</button>
                </div>
                <div className="img1">
                <img src={perfumes} alt="hat" id="perfumes"/>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
</section>
<section id="info" >
    <div className="info-main">
        <div className="services">
            <img src={service} alt="Service" id="service" />
            <h4 id="h4">Free and Fast Delivery</h4>
            <p id="p2">Free delivery for all orders over $140</p>
        </div>
        <div className="headphines">
            <img src={headphines} alt="headphones" id="Headphines" />
            <h4 id="h4">24/7 Customer Service</h4>
            <p id="p2">Friendly 24/7 customer support</p>
        </div>
        <div className="security">
            <img src={security} alt="security" id="security" />
            <h4 id="h4">Money Back Guarantee</h4>
            <p id="p2">We reurn money within 30 days</p>
        </div>
    </div>
</section>
<footer>
    <Footer/>
</footer>
</>
    ) 
}   

export default Landing;