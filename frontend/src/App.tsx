import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
// import Compete from './pages/Compete'
import Train from './pages/Train'
import Rules from './pages/Rules'
import Profile from './pages/Profile'
import ModoICPC from './pages/ModoICPC';
import Login from './pages/Login';
import Register from './pages/Register';
import Timeline from './pages/Timeline';
import Teams from './pages/Teams';
import Logout from './components/Logout';
import MainPage from './pages/MainPage'

import { isUserLogged } from './utils/tokenUtils';

function App() {
  const isLogged = isUserLogged();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/compete" element={<Compete />} /> */}
        <Route path="/entrenar" element={isLogged?<Train />:<Login/>} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/profile" element={isLogged?<Profile />:<Login/>} />
        <Route path="/ModoICPC" element={isLogged?<ModoICPC/>:<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={isLogged?<Timeline />:<Login/>} />
        <Route path="/teams" element={isLogged?<Teams />:<Login/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Main" element={<MainPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
