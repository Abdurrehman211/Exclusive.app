import React from "react";
import './account.css';
import { useState } from "react";
import  Footer from './Footer';

function Account ()
{

    const [ firstname, setfirstname] = useState("");
    const [ lastname, setlastname] = useState("");
    const [ email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [password, setpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
   

    const handlesubmet=(e)=>{
        e.preventDefault();
        alert ("message send");
          setfirstname("");
          setemail("");
          setlastname("");
       setaddress("");
         setpassword("");
         setnewpassword("");
            setconfirmpassword("");

      };
     
  
    
    return(
        <>
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
                    
                        
                            <input  className="mt-3 "  type="text" placeholder="First Name" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
                        
                       
                            <input  className="ms-5" type="text" placeholder="Last Name" value={lastname} onChange={(e)=>setlastname(e.target.value)} />
                            <br/>
                     
                    
                    <input className=" mt-3" type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} />
                    <input className="ms-5" type="text" placeholder="Address" value={address} onChange={(e)=>setaddress(e.target.value)} />

                    <h6> Passward Change</h6>
                    <input className="mt-5 password" type="password" placeholder="Old Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <br/>
                    <input className="mt-5 password" type="password" placeholder="New Password" value={newpassword} onChange={(e)=>setnewpassword(e.target.value)}  />
                    <br/>
                    <input className="mt-5 password" type="password" placeholder=" Confirm New Password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} />
                    <br/>

                    <button  className=" btn btn-danger">Save Changes</button>
                    <button  className=" btn btn-dark">Cancel</button>

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
export default Account;