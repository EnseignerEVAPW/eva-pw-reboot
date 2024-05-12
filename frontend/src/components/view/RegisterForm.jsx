import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username + password + confirmPassword);
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username: username,
        password: password,
        passwordConfirmation: confirmPassword,
      });

      alert(response.data.message);
    } catch (error) {
      alert('Error al registrar usuario');
      console.error('Error:', error);
    }
  };

  useState(() => {
    console.log('RegisterForm mounted');
  }, []);

  return (
    <form className="flex flex-col max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
      <p className="text-sm text-yellow-600 mb-4">Haz Esto Primero: (solo para el registro) cambia tu primer nombre en codeforces a P2P-Auth</p>
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
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Registrarse</button>
    </form>
  );
};

export default RegisterForm;
