import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Compete from './pages/Compete'
import Train from './pages/Train'
import Rules from './pages/Rules'
import Profile from './pages/Profile'
import ModoICPC from './pages/ModoICPC';
import Login from './pages/Login';
import Register from './pages/Register';
import Timeline from './pages/Timeline';
import CoachForm from './components/view/CoachForm';
import Teams from './pages/Teams';
import { useState } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <Header openModal={openModal}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/entrenar" element={<Train />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ModoICPC" element={<ModoICPC />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
      <Footer />
      <CoachForm show={modalOpen} onClose={closeModal} />
    </Router>
  );
}

export default App
