import './App.css'
import Header from './components/layout/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Compete from './pages/Compete'
import Train from './pages/Train'
import Rules from './pages/Rules'
import Profile from './pages/Profile'
import ModoICPC from './pages/ModoICPC';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/train" element={<Train />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ModoICPC" element={<ModoICPC />} />
      </Routes>
    </Router>
  );
}

export default App
