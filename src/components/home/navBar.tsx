import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar_pc">
        <div className="navbar_logo">
          <Link to="/" className="navbar_link">
            {/* <img src="/tatva-icon.svg" alt="Logo" className="logo-img" /> */}
            <span className="logo_text">SnapTunnel</span>
          </Link>
        </div>
        {/* <ul className="navbar_menu">
          <li className="navbar_link"><a href='#about'>About</a></li>
          <li className="navbar_link"><a href='#pricing'>Pricing</a></li>
          <li className="navbar_link"><a>Support</a></li>
          <li className="navbar_link">
            <span className="material-symbols-outlined">settings</span>
            <a>Setting</a>
          </li>
        </ul> */}
        <div className='account'>
          {/* <span className="material-symbols-outlined">account_circle</span> */}
          Sign Up
        </div>

      </nav>
      <nav className="navbar_mobile">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          {/* <img src="/tatva-icon.svg" alt="Logo" className="logo-img" /> */}
          <span className="logo-text">SnapTunnel</span>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-link"><a href='#about'>About</a></li>
        <li className="navbar-link"><a href='#pricing'>Pricing</a></li>
        <li className="navbar-link"><a>Support</a></li>
        <li className="navbar-link"><a>Setting</a></li>
      </ul>
      <div>
        <div className="">
          <div className="">Setting</div>
          <span className="material-symbols-outlined">settings</span>
          {/* <span className="material-symbols-outlined">help</span> */}
        </div>
        <div className='account'>
          {/* <span className="material-symbols-outlined">account_circle</span> */}
          <div className="">Sign Up</div>
        </div>
      </div>

      </nav>
    </>
  );
};

export default Navbar;