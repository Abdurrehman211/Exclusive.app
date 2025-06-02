
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from './components/Landing';
import Counter from './components/Counter';
import Signup from './components/Signup';
import Login from   './components/Login'  ;
import { ToastContainer,useLocation } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userpanel from './components/Userpanel';
import Admin from './components/Admin';
import Logout from './components/Logout';
import TawkToChat from './components/TawkToChat';
import Contact from './components/Contact';
import About from './components/About';
import Accessibilityprovider from './components/context/Accessibility';
import Account from './components/Account';
import Checkout from './components/Checkout';
import  Cart from './components/Cart'; 
import Wishlist from './components/Wishlist';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChatRoom from './components/Chatroom';
function App() {
  // Token Evaluator 
axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expired. Please login again."
    ) {

      sessionStorage.clear();

      // Inform the user
      toast.info("Session expired. Please login again.");

    
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const getUserID = ()=>{
const user  = sessionStorage.getItem('id');
if(!user){
toast.error("Log in to use chats");
window.location.href = '/login';
return null;
}
else{
  return user;
}
}




  return ( 
  <Router>
      <Navigation />
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/Counter' element={<Counter />} />
      <Route path='/sign-up' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/Userpanel' element={<Userpanel />} />
      <Route path='/admin' element={<Admin />}  />  
      <Route path='/Logout' element={<Logout />} />   
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Account' element={<Account/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Wishlist' element={<Wishlist/>}/>
      <Route path='/Checkout' element={<Checkout/>}/>
      <Route path='/chat-room' element = {<ChatRoom user={getUserID} />} />
      </Routes>
    <ToastContainer
    position='top-right'
    autoClose={1000}
    theme='colored'
    />
    <footer>
      <TawkToChat />
    </footer>
   </Router>
  );
}

export default App;
