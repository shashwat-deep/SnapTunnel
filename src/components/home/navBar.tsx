import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Only apply scroll hiding on desktop (above 768px)
      if (window.innerWidth > 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsMenuVisible(false);
        } else {
          setIsMenuVisible(true);
        }
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
    // Close sidebar after clicking a menu item on mobile
    setIsSidebarOpen(false);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar_container">
      <div className="navbar">
        <div className="navbar_logo">
          <Link to="/" className="navbar_link">
            <span className="logo_text">SnapTunnel</span>
          </Link>
        </div>
        <ul className={`navbar_menu ${isMenuVisible ? '' : 'hidden'} ${isSidebarOpen ? 'sidebar_open' : ''}`}>
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
      </div>
      <span
        className="material-symbols-outlined sideBar_icon"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {isSidebarOpen ? 'close' : 'notes'}
      </span>
    </nav>
  );
};

export default Navbar;