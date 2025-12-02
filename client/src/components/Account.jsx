import React from "react";
import "./account.css";
import { useState } from "react";
import Footer from "./Footer";
import {
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";

function Account() {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const handlesubmet = (e) => {
    e.preventDefault();
    alert("message send");
    setfirstname("");
    setemail("");
    setlastname("");
    setaddress("");
    setpassword("");
    setnewpassword("");
    setconfirmpassword("");
  };

  return (
    <>
      <section id="dashboard">
        <aside className="sidebar">
          <h2>User Dashboard</h2>
          <ul>
            <li
              onClick={() => {
                navigate("/Userpanel");
              }}
            >
              <FaChartLine /> Dashboard
            </li>
            <li
              onClick={() => {
                navigate("/Account");
              }}
            >
              <FaCog /> Settings
            </li>
            <li
              onClick={() => {
                window.location.href = "/chat-room";
              }}
            >
              <FaUsers /> Chats
            </li>
          </ul>
        </aside>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12" id="Profile-acc">
                {/* Form */}
              <form onSubmit={(e) => handlesubmet(e)}>
                <h4> Edit your profile</h4>
                {/* First two input box */}
                <div className="names">
                  <div className="left-acc">
                    <label htmlFor="Fname">First Name*</label>
                    <input
                      className=" "
                      type="text"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(e) => setfirstname(e.target.value)}
                      id="Fname"
                    />
                  </div>
                  <div className="right-acc">
                    <label htmlFor="Lname">Last Name*</label>
                    <input
                      className=""
                      type="text"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setlastname(e.target.value)}
                      id="Lname"
                    />
                  </div>
                </div>
                <div className="emails">
                    <div className="left-acc">
                        <label htmlFor="email">Email</label>
                         <input
                    className=" "
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    id="email"
                  />
                    </div>
                 <div className="right-acc">
                    <label htmlFor="address">Address</label>
                    <input
                    className=""
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    id="address"
                  />
                 </div>
                  
                </div>
                <h6 className="mt-3 mb-0"> Password Change</h6>
                <input
                  className=" password"
                  type="password"
                  placeholder="Old Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />

                <input
                  className=" password"
                  type="password"
                  placeholder="New Password"
                  value={newpassword}
                  onChange={(e) => setnewpassword(e.target.value)}
                />

                <input
                  className="password"
                  type="password"
                  placeholder=" Confirm New Password"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
                <br />
                <div className="buttons">
                  <button className=" btn btn-light">Cancel</button>
                  <button className="nav0cta1">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <aside className="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          <li><FaChartLine /> Overview</li>
        
          <li onClick={()=>{
            navigate("/Account");
          }}><FaCog/> Settings</li>
          <li onClick={()=>{
            window.location.href = "/chat-room";
          }}><FaUsers/> Chats</li>
          
        </ul>
      </aside>
        <div className="container">

            <div className="row row-account  pb-5">
                <div className="col-lg-4 col-md-12 col-sm-12">
                     
                    <h6 className="pt-3"> My Account</h6>
                <li className="pt-2"> <a href="#"> My Profile</a></li>
                <li className="pt-2"> <a href="#"> Address Book</a>  </li>
                <li className="pt-2"> <a href="3"> Mt Paymet Option</a> </li>
                <h6 className="pt-3"> My Order</h6>
                <li className="pt-2"> <a href="#"> My Return </a> </li>
                <li className="pt-2"> <a href="#"> My Cancelation</a></li>

                <h6 className="pt-3"> Wish list</h6>

                </div>


            
            <div className="col-lg-8 col-md-12 col-sm-12">  
                <h6> Edit your profile</h6>
                <form onSubmit={(e)=>handlesubmet(e)}>
                    
                        
                            <input  className=" "  type="text" placeholder="First Name" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
                        
                       
                            <input  className="ms-5" type="text" placeholder="Last Name" value={lastname} onChange={(e)=>setlastname(e.target.value)} />
                            <br/>
                     
                    
                    <input className=" mt-3" type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} />
                    <input className="ms-5" type="text" placeholder="Address" value={address} onChange={(e)=>setaddress(e.target.value)} />

                    <h6> Passward Change</h6>
                    <input className="mt-4 password" type="password" placeholder="Old Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <br/>
                    <input className="mt-4 password" type="password" placeholder="New Password" value={newpassword} onChange={(e)=>setnewpassword(e.target.value)}  />
                    <br/>
                    <input className="mt-4 password" type="password" placeholder=" Confirm New Password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} />
                    <br/>

                    <button  className=" btn btn-danger">Save Changes</button>
                    <button  className=" btn btn-dark">Cancel</button>

                    </form>


            </div>
            </div>
           

        </div> */}
 
    </>
  );
}
export default Account;
