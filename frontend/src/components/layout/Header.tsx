import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isUserLogged } from '../../utils/tokenUtils';
import toast from 'react-hot-toast';

const Header = () => {
  const [isLogged, setIsLogged] = useState(isUserLogged());
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(isUserLogged());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLogged(false);
    toast('¡Has cerrado sesión exitosamente!', {
      icon: '👏',
    });
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1000); 
  };

  return (
    <header className="bg-gray-900 text-white p-5 w-full">
      <div className="container mx-auto flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <div className="text-lg">
            <i className="fas fa-acorn">
              <span className="text-blue-500 font-bold p-5">P2P LEARNING</span>
            </i>
          </div>
          <nav className="md:flex space-x-4">
            <Link to="/" className="hover:text-blue-500">Inicio</Link>
            <Link to="/modoICPC" className="hover:text-blue-500">Entrenar</Link>
            <Link to="/rules" className="hover:text-blue-500">Reglas</Link>
            <Link to="/profile" className="hover:text-blue-500">Perfil</Link>
          </nav>
        </div>
        <div className="flex space-x-4">
          {isLogged ? (
            <button onClick={handleLogout} className="text-gray-300 hover:text-blue-500">Logout</button>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-blue-500">Login</Link>
          )}
          <i className="fas fa-search text-gray-300 hover:text-blue-500"></i>
          <i className="fas fa-user text-gray-300 hover:text-blue-500"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
