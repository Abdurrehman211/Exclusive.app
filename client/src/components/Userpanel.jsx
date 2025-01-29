import React from "react";
import {toast} from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
function Userpanel() {

    useEffect(() => {FetchuserDetail()}, []);
const FetchuserDetail =async () => {
try {
    const token = sessionStorage.getItem("Auth-Token");
    const response = await axios.get('http://localhost:3001/getuser',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    toast.success(response.data.message ||"Login Success!")
    if(response.data.success){
        console.log(response.data);
    }
    else{
        console.log(response.data.message || 'Error Occured');
    }
} catch (error) {
    console.log("An error Occured",error);
    console.error(error);
}
}
    return(
<>
<h1>Welcome to user panel</h1>
</>

    )

}

export default Userpanel;