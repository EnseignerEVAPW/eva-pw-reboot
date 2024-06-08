import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Train from './pages/Train';
import Rules from './pages/Rules';
import Profile from './pages/Profile';
import ModoICPC from './pages/ModoICPC';
import Login from './pages/Login';
import Register from './pages/Register';
import Timeline from './pages/Timeline';
import Teams from './pages/Teams';
import Logout from './components/Logout';
import MainPage from './pages/Training';
import { isUserLogged } from './utils/tokenUtils';
import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isLogged, setIsLogged] = useState(isUserLogged());
  const lastToastTime = useRef(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(isUserLogged());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const PrivateRoute = ({ element }) => {
    // const now = Date.now();
    if (isLogged) {
      return element;
    } else {
      // if (now - lastToastTime.current > 2000) {
      //   toast('Necesitas iniciar sesión primero', {
      //     icon: '☝️',
      //   });
      //   lastToastTime.current = now;
      // }
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/entrenar" element={<PrivateRoute element={<Train />} />} />
            <Route path="/rules" element={<PrivateRoute element={<Rules />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/ModoICPC" element={<PrivateRoute element={<ModoICPC />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/timeline" element={<PrivateRoute element={<Timeline />} />} />
            <Route path="/teams" element={<PrivateRoute element={<Teams />} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/Main" element={<MainPage />} />
          </Routes>
        </div>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
