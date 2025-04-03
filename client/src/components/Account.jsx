import React from "react";
import './account.css';
import { useState } from "react";

function Account ()
{

    const [ firstname, setfirstname] = useState("");
    const [ lastname, setlastname] = useState("");
    const [ email, setemail] = useState("");
    const [address, setaddress] = useState("");

    const handlesubmet=(e)=>{
        e.preventDefault();
        alert ("message send");
          setfirstname("");
          setemail("");
          setlastname("");
       setaddress("");
      };
  
    
    return(
        <>
        <div className="container">

            <div className="row row-account">
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


            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">  
                <h6> Edit your profile</h6>
                <form onSubmit={(e)=>handlesubmet(e)}>
                    
                        
                            <input type="text" placeholder="First Name" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
                        
                       
                            <input type="text" placeholder="Last Name" value={lastname} onChange={(e)=>setlastname(e.target.value)} />
                            <br/>
                     
                    
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} />
                    <input type="text" placeholder="Address" value={address} onChange={(e)=>setaddress(e.target.value)} />
                    <button>Save</button>
                    </form>


            </div>

        </div>
        
        
        </>

    )
    
}
export default Account;