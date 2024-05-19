import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: username,
        password: password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (error) {
      alert('Error al hacer login');
      console.error('El error:', error);
    }
    console.log('Form submitted:', { username, password });
  };

  useEffect(() => {
    console.log('LoginForm mounted');
  }, []);

  return (
    <form className="flex flex-col max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
