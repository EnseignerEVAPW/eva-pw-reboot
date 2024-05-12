import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/view/RegisterForm';

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-center"> 
    <div className="login-wrapper mx-auto"> 
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg mx-auto"> 
        <h2 className="text-2xl font-semibold text-center mb-4">Registro</h2>
        <RegisterForm/>

        </div>
    </div>
  </div>
  );
}

export default Register;