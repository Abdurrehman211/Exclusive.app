import React, { useState } from "react"
import './contact.css';
import Footer from "./Footer";


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
        
        < >
        <div  className="wraper">
           <div className="container">
            
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
        
</footer>
        </>
        
    )
        
        


    



}
export default  Contact;
