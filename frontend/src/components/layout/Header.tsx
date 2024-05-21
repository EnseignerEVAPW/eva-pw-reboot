import { Link } from 'react-router-dom';
import { isUserLogged } from '../../utils/tokenUtils';

const Header =  () => {
  const isLogged = isUserLogged();
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
            <Link to="/compete" className="hover:text-blue-500">Competir</Link>
            <Link to="/modoICPC" className="hover:text-blue-500">Entrenar</Link>
            <Link to="/rules" className="hover:text-blue-500">Reglas</Link>
            <Link to="/profile" className="hover:text-blue-500">Perfil</Link>
          </nav>
        </div>
        <div className="flex space-x-4">
          { isLogged ?
            (<Link to="/logout" className="text-gray-300 hover:text-blue-500">Logout</Link>)
            :
            (<Link to="/login" className="text-gray-300 hover:text-blue-500">Login</Link>)
          }
          <i className="fas fa-search text-gray-300 hover:text-blue-500"></i>
          <i className="fas fa-user text-gray-300 hover:text-blue-500"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
