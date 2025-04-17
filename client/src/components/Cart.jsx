import React from "react";
import controler from './images/controlller.png';
import lcdd from './images/LCD.png';
import Footer from './Footer';
import './cart.css';

function Cart()
{
    
    return(

        <>

        <div className="container">
            <div className="row ">
                <div className="headingg  ">
                    <li className="mt-2  ">Product</li>
                    <li className="mt-2 ">Price</li>
                    <li className="mt-2 ">Quality</li>
                    <li className="mt-2">Subtotal</li>
                    </div>
            
                
                 </div>



                 <div className="row mt-5">

                <div className="headingg ">
                    <li><img src={controler} alt="img"  style={{width:'50px',height:'50px' }} /> LCD Monitor</li>
                    <li className="mt-2">$650</li>
                    <li className="mt-2">Quality</li>
                    <li className="mt-2">$650</li>

                    </div>
                
                
                 </div>



                 <div className="row mt-5">
                <div className="headingg">
                    <li><img src={lcdd} alt="img"  style={{width:'50px',height:'50px' }} /> Hi Gamepad</li>
                    <li className="mt-2">$750</li>
                    <li className="mt-2">Quality</li>
                    <li className="mt-2">$650</li>

                  
                    
                    </div>


                
                
                 </div>


                 <div className="row mt-5">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <button className="button-shop" > Return To Shop</button>
                    <button  className="btn-Cart " > Update Cart</button>
                    </div>

                 </div>

                 <div className="row mt-5 mb-5">
                    <div className="col-lg-6 col-md-12  col-sm-12 ">
                        <button className="   coupon-code">Coupon Code</button>
                        <button className="  apply-coupon"> Apply Coupon</button>


                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12  Shipment ">
                        <h6 className="mt-4"> Cart Total</h6>
                        <div className="cart-total">
                            <li className="mt-4"> Subtotal</li>
                            <li> $1750</li>


                        </div>
                        <hr />
                        <div className="cart-total">

                          <li> SShipping</li>
                            <li> free</li>
                        </div>

                        <hr />


                        <div className="cart-total">
                        <li> Total</li>
                        <li> $1750</li>
                        </div>


                         <a href="/Checkout"><button className="Proceed mb-4 mt-3">Proceed to Check Out</button> </a>

                    </div>

                 </div>

        </div>

        <footer>
            <Footer/>
        </footer>
        </>
    )
    
}
export default Cart;