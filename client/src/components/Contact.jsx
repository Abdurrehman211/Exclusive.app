import React, { useState } from "react";
import "./contact.css";
import Footer from "./Footer";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Contact() {
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [message, setmessage] = useState("");
  const [phone, setphone] = useState("");
  const Location = useLocation();
  const [Submit, setSubmit] = useState(false);
  const [success, setSuccuess] = useState("");
  //handle form submission
  const handlesubmet = async (e) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const res = await axios.post("http://localhost:3001/send-mail", {
        name,
        email: mail,
        message,
        phone,
      });
      if (res.data.success) {
        toast.success("Message sent successfully");
        setname("");
        setmail("");
        setmessage("");
        setphone("");
        setSuccuess("Success");
        setSubmit(false);
      } else {
        toast.error("Error sending message");
        setSubmit(false);
        setSuccuess("False");
      }
      setTimeout(() => {
        setSuccuess("");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong." + err);
      setSubmit(false);
    }
  };

  return (
    <>
      <section id="Links">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>
                Home <strong> {Location.pathname}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="Contact-hero">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-4 col-md-5 col-sm-12 ">
              <div className="Contact-desc">
                <div className="heading mb-4 ">
                  <span>
                    <FaPhone
                      style={{
                        width: "50px",
                        height: "50px",
                        color: "#FFFFFF",
                      }}
                    />
                  </span>
                  <h2 className="px-4">Call Us</h2>
                </div>
                <p>
                  {" "}
                  <strong>We are available 24/7, 7 Days a week </strong>
                </p>
                <p className="pb-5">
                  {" "}
                  phone: <strong> 3492647210</strong>
                </p>
                <hr />
                <div className="heading mb-4 mt-5">
                  <span>
                    <MdEmail
                      style={{
                        width: "50px",
                        height: "50px",
                        color: "#FFFFFF",
                      }}
                    />
                  </span>
                  <h2 className="px-4">Write to us</h2>
                </div>
                <p>
                  <strong>
                    {" "}
                    Fill out your form and we will contact <br />
                    you within 24 hours
                  </strong>
                </p>
                <p>
                  Email: <strong>Customer@exclusive.com</strong>
                </p>
                <p>
                  Email: <strong>Customer@exclusive.com</strong>
                </p>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-sm-12" id="Contact-Form">
              

              <form onSubmit={(e) => handlesubmet(e)}>
                {success === "Success" && (
                <div className="alert alert-success" role="alert">
                  Mail sent successfully!
                </div>
              )}

              {success === "False" && (
                <div className="alert alert-danger" role="alert">
                  Failed to send mail. Please try again.
                </div>
              )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  required
                  onChange={(e) => setname(e.target.value)}
                />
                <br />
                <input
                  type="email"
                  placeholder="Your email"
                  className="form-control"
                  value={mail}
                  required
                  onChange={(e) => setmail(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Your phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
                <br />
                <textarea
                  value={message}
                  required
                  placeholder="Your message"
                  className="form-control"
                  onChange={(e) => setmessage(e.target.value)}
                />
               
                  <button type="submit" className="nav0cta1">
                    {Submit ? "Sending..." : "Send"}
                  </button>
               
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
      <ToastContainer
        position="top-right"
        autoClose={3000} // Faster dismissal
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Use 'dark', 'light', or 'colored'
      />
    </>
  );
}
export default Contact;
