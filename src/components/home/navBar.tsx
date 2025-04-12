import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          {/* <img src="/tatva-icon.svg" alt="Logo" className="logo-img" /> */}
          <span className="logo-text">Snaptunnel</span>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-link"><a href='#about'>About</a></li>
        <li className="navbar-link"><a href='#pricing'>Pricing</a></li>
      </ul>
      <div>
        <div className="">
          <span className="material-symbols-outlined">help</span>
          <span className="material-symbols-outlined">settings</span>
        </div>
        <div className='account'>
          <span className="material-symbols-outlined">account_circle</span>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;