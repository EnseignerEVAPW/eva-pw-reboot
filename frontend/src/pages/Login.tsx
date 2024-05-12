import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/view/LoginForm';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="login-wrapper">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h2>

        <LoginForm/>

        <p className="text-sm text-center text-gray-600">¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-600">Regístrate</Link></p>
      </div>
    </div>
  </div>
  );
}

export default Login;