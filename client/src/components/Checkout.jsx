import React from "react";  
import './checkout.css';
import controler from './images/controlller.png';
import lcdd from './images/LCD.png';
import Footer from './Footer';

import {useState} from "react"



function Checkout() {

    const [ firstname, setfirstname] = useState("");
    const [ companyname, setcompanyname] = useState("");
    const [ streetaddress, setstreetadddress] = useState("");
    const [ Appartment, setAppartment] = useState("");
    const [ city, setcity] = useState("");
    const [ phone, setphone] = useState("");
    const [ email, setemail] = useState("");
    const [payment, setpayment] = useState("");

    const handlesubmet=(e)=>{
        e.preventDefault();
        alert ("message send");
          setfirstname("");
          setcompanyname("");
          setstreetadddress("");
          setAppartment("");
          setcity("");
          setphone("");
          setemail("");
          setpayment("");

      }


    return (

        <>
        <div className="container">
        <form onSubmit={(e)=>handlesubmet(e)}>
            <div className="row mb-5">
                <div className="col-lg-6 col-mid-12 col-sm-12">
<h4> Billing Detail</h4>

    <input className="mt-4 " type="text" placeholder="First Name" style={{width: '60%', height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}} value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
    <br/>
    <input className="mt-4" type="text" placeholder="Company Name"  style={{width: '60%' , height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}} value={companyname} onChange={(e)=>setcompanyname(e.target.value)} />
    <br/>
    <input className="mt-4" type="text" placeholder="Street Address"  style={{width: '60%' , height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}} value={streetaddress} onChange={(e)=>setstreetadddress(e.target.value)} />
    <br/>
    <input className="mt-4" type="text" placeholder="Appartment, Suite, etc." style={{width: '60%' , height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}}  value={Appartment} onChange={(e)=>setAppartment(e.target.value)} />
    <br/>
    <input className="mt-4" type="text" placeholder="City" style={{width: '60%' , height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}} value={city} onChange={(e)=>setcity(e.target.value)} />
    <br/>
    <input className="mt-4" type="text" placeholder="Phone Number" style={{width: '60%' , height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}} value={phone} onChange={(e)=>setphone(e.target.value)} />
    <br/>
    <input className="mt-4" type="email" placeholder="Email Address" style={{width: '60%' , height:'40px', border: '2px solid rgb(160, 157, 157)',borderRadius:'5px'}} value={email} onChange={(e)=>setemail(e.target.value)} />
    <br/>
    
<label >
    <input className=" mt-4   input-check " type="checkbox"  />
    Save this information for faster check out next time</label>
    </div>

    <div className="col-lg-6 col-md-12 col-sm-12">
        <div className="list mt-5">  
            <li> <img src={controler} alt=" image"  style={{width:'50px',height:'50px' }} /> </li> 
            <li className="lcd">LCD Monitor</li>
            <li className="price"> $650</li>
             </div>


             <div className="list-1 mt-5">  
            <li> <img src={lcdd} alt=" image"  style={{width:'50px',height:'50px' }} /> </li> 
            <li className="lcd">H1 Gamepad</li>
            <li className="price"> $1100</li>
             </div>

             <div  className="mt-5">
                <li >Subtotal</li>
                <li className="pricetotal">$170</li>
                
             </div>
             <hr />
             <div  className="mt-5">
                <li >Shipping</li>
                <li className="pricetotal">free</li>
                
             </div>
             <hr />
             <div className="mt-5" >
                <label >
                <input   type="radio" value={payment} onChange={(e)=>setpayment(e.target.value)}  style={{transform:'scale(1.5)' }} />
                Bank
                </label>

                <label  >
                <input type="radio" value={payment} onChange={(e)=>setpayment(e.target.value)}  style={{transform:'scale(1.5)' }} />
                Cash on Delivery
                </label>

             </div>
             <div >
            <button className="btn btn-dark"  style={{}}>Coupal</button>
            <button className="btn btn-danger" style={{marginRight:'60px'}}>Coupal</button>
            <button className="btn btn-danger "  style={{marginRight:'40px', marginTop:"-37px"}}>Apply</button>
            </div>


        

    </div>

    </div>

</form>
 

                
            </div>

            <footer>
                <Footer/>
            </footer>

       
        
        
        </>
    )
}
export default Checkout;