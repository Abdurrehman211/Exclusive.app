
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Counter from './components/Counter';
import Signup from './components/Signup';
import Login from   './components/Login'  ;
function App() {
  return (
   <Router>
    <header>
      <Navigation />
    </header>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/Home' element={<Landing />} />
      <Route path='/Counter' element={<Counter />} />
      <Route path='/sign-up' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
   </Router>

   
  );
}

export default App;
