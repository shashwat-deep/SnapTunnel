import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px, hide menu
        setIsMenuVisible(false);
      } else {
        // Scrolling up or at top, show menu
        setIsMenuVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar_pc dark-mode">
      <div className="navbar_logo">
        <Link to="/" className="navbar_link">
          <span className="logo_text">SnapTunnel</span>
        </Link>
      </div>
      <ul className={`navbar_menu ${isMenuVisible ? '' : 'hidden'}`}>
        <li className="navbar_item"><a href="#about">About</a></li>
        <li className="navbar_item"><a href="#pricing">Pricing</a></li>
        <li className="navbar_item"><a href="#support">Support</a></li>
        <li className="navbar_item"><a href="#settings">Settings</a></li>
      </ul>
      <div className="account">
        Sign Up
      </div>
    </nav>
  );
};

export default Navbar;