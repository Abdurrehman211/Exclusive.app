import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ()=>{
    const navigate = useNavigate();
    useEffect(() => {
        logout();
    })
   const logout =()=>{
   sessionStorage.removeItem("userDetails");
   navigate("/");
   toast.info('Please Login Again');
   }
}
export default Logout;