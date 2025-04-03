
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {


  return (
  
   <Router>
 
      <Navigation />
      <Account/>
      
      
  
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
