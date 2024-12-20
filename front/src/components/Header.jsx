import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, FileText } from 'lucide-react';
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-custom-blue text-white py-1 w-full fixed top-0 left-0 z-10"> {/* Header ainda mais fino */}
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6">
        {/* Logo ainda mais compacta */}
        <img 
          src={logo} 
          alt="Logo" 
          className="h-10 md:h-12 object-contain"  // Logo ajustada para altura ainda menor
        />

        {/* Navegação */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="flex items-center space-x-2 text-lg hover:text-custom-hover-gradient" onClick={()=> localStorage.removeItem("TOKEN")}>
                <Home size={20} />
                <span>Sair</span>
              </Link>
            </li>
            <li>
              <Link to="/cliente" className="flex items-center space-x-2 text-lg hover:text-custom-hover-gradient">
                <User size={20} />
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <Link to="/orcamento" className="flex items-center space-x-2 text-lg hover:text-custom-hover-gradient">
                <FileText size={20} />
                <span>Orçamentos</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
