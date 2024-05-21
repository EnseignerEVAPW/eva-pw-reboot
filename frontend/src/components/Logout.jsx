import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(()=> {
    const handleLogout = () => {
      sessionStorage.removeItem('token');
      navigate('/login'); 
    };
    handleLogout();
  } ,[navigate]);
  

  return null;

}

export default Logout;