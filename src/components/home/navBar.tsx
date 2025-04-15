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
        setIsMenuVisible(false);
      } else {
        setIsMenuVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to a section smoothly
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }
  };

  return (
    <nav className="navbar_pc">
      <div className="navbar_logo">
        <Link to="/" className="navbar_link">
          <span className="logo_text">SnapTunnel</span>
        </Link>
      </div>
      <ul className={`navbar_menu ${isMenuVisible ? '' : 'hidden'}`}>
        <li className="navbar_item">
          <button onClick={() => scrollToSection('about')}>About</button>
        </li>
        <li className="navbar_item">
          <button onClick={() => scrollToSection('pricing')}>Pricing</button>
        </li>
        <li className="navbar_item">
          <button onClick={() => scrollToSection('support')}>Support</button>
        </li>
        <li className="navbar_item">
          <button onClick={() => scrollToSection('settings')}>Settings</button>
        </li>
      </ul>
      <div className="account">Sign Up</div>
    </nav>
  );
};

export default Navbar;