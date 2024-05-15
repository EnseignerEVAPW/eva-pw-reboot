import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
    </div>
  )

}

export default Logout;