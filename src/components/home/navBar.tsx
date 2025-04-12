import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="logo-img" />
          <span className="logo-text">Snaptunnel</span>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li>
            <Link to="/room" className="navbar-link">Create Room</Link>
        </li>
        <li>
            <Link to="/placeholder" className="navbar-link">Placeholder</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;