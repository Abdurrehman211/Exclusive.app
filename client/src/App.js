
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


function App() {


  return (
   <Router>
    <header>
      <Navigation />
    </header>
    <Routes>
      <Route path='/' element={<Landing />} />
      
      <Route path='/Counter' element={<Counter />} />
      <Route path='/sign-up' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/Userpanel' element={<Userpanel />} />
    </Routes>
    <ToastContainer
    position='top-right'
    autoClose={1000}
    theme='colored'
    />

   </Router>
   
  );
}

export default App;
