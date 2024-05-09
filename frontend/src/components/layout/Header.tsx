import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-5 w-full">
      <div className="container mx-auto flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <div className="text-blue-500">
            <i className="fas fa-acorn">
              {/* Icono o logo aquí */}
            </i>
          </div>
          <nav className="md:flex space-x-4">
            <Link to="/" className="hover:text-blue-500">Inicio</Link>
            <Link to="/compete" className="hover:text-blue-500">Competir</Link>
            <Link to="/train" className="hover:text-blue-500">Entrenar</Link>
            <Link to="/rules" className="hover:text-blue-500">Reglas</Link>
            <Link to="/profile" className="hover:text-blue-500">Perfil</Link>
          </nav>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-300 hover:text-blue-500">Login</button>
          <i className="fas fa-search text-gray-300 hover:text-blue-500"></i>
          <i className="fas fa-user text-gray-300 hover:text-blue-500"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
