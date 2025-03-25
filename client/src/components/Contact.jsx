import React, { useState } from "react"
import './contact.css';
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function Contact ()
{

    
        const [name, setname] = useState("");
        const [mail, setmail] = useState("");
        const [message, setmessage] = useState("");
        const [phone, setphone] = useState("");

        //handle form submission
        const handlesubmet=(e)=>{
          e.preventDefault();
          alert ("message send");
            setname("");
            setmail("");
            setmessage("");
            setphone("");
        };
    
    return (
        
        <>

        <section id="Contact-hero">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-6 col-md-12 col-sm-12 ">
                        <div className="Contact-desc">
                <h2> Call Us</h2>
                <p >We are available 24/7,7 Days a week </p>
                <p >  phone: 3492647210</p>
                <hr/>
                <h2 >Write to us</h2>
                <p> Fill out your form and we will contact <br/>you  within 24 hours</p>
                <p >Email: customer@exclusive.com</p>
                <p >Email: support@exclusive.com</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12" id="Contact-Form">
                    <form onSubmit={(e)=>handlesubmet(e)}>
                
                <input
                type="text"
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={(e)=>setname(e.target.value)}
                />
                <br />
                <input
                type="email"
                placeholder="Your email"
                     className="form-control"
                value={mail}
                onChange={(e)=>setmail(e.target.value)}

               />
               <br />
               <input
                type="text"
                placeholder="Your phone"
                     className="form-control"
                value={phone}
                onChange={(e)=>setphone(e.target.value)}
               />
               <br />
               <textarea
                value={message}
                placeholder="Your message"
                     className="form-control"
                onChange={(e) => setmessage(e.target.value)}
               />
               <button  type="submit" >Send Message</button>
</form>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <Footer />
        </footer>

        {/* <div  className="wraper">
           <div className="container21">
            
            <div className="class1">
                <p id="p2"> Call To Us</p>
                <p id="p1">We are available 24/7,7 Days a week </p>
                <p id="p3">  phone: 3492647210</p>
                <hr/>
                <p id="p4">Write to us</p>
                <p id="p5"> Fill out your form and we will contact <br/>you  within 24 hours</p>
                <p id="p6">Email: customer@exclusive.com</p>
                <p id="p7">Email: support@exclusive.com</p>
            </div>
            <div className="class2">
                <form onSubmit={(e)=>handlesubmet(e)}>
                
                <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e)=>setname(e.target.value)}
                />
               
                <input
                type="email"
                placeholder="Your email"
                value={mail}
                onChange={(e)=>setmail(e.target.value)}

               />
               
               <input
                type="text"
                placeholder="Your phone"
                value={phone}
                onChange={(e)=>setphone(e.target.value)}
               />
              
               <textarea
                value={message}
                placeholder="Your message"
                onChange={(e) => setmessage(e.target.value)}
               />
               <button id="b1" type="submit" >Send Message</button>
</form>


            </div>
            </div>
            </div>
            
            
            
            <footer> 
    
        <Footer/>
        
</footer> */}
        </>
        
    )
        
        


    



}
export default  Contact;
