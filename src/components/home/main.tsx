import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const Main: React.FC = () => {
  const [code, setCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleCreateRoom = async () => {
    try {
      setIsCreating(true);
      const response = await fetch('http://localhost:3000/api/rooms', {
        method: 'POST',
      });
      const data = await response.json();
      navigate(`/room/${data.roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinClick = async () => {
    if (!code) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/rooms/${code}/join`, {
        method: 'POST',
      });
      
      if (response.ok) {
        navigate(`/room/${code}`);
      } else {
        alert('Invalid room code. Please try again.');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Failed to join room. Please try again.');
    }
  };

  // Generate stars dynamically
  useEffect(() => {
    const starfield = document.querySelector('.starfield');
    if (starfield) {
      for (let i = 0; i < 100; i++) { // Create 100 stars
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1; // Random size between 1px and 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        star.style.top = `${Math.random() * 100}vh`; // Random vertical position
        star.style.animationDelay = `${Math.random() * 30}s`; // Staggered start times
        starfield.appendChild(star);
      }
    }
  }, []);

  return (
    <div className='main_app_container'>
      <div className='main_navBar'>
        <div className='nav_items'>About</div>
        <div className='nav_items'>Pricing</div>
        <div className='nav_items'>Support</div>
        <div className='nav_items'>Settings</div>
      </div>
      <div className='main-window'>
        <div className="main-container">
          <h1>Seamless file sharing<br />for everyone</h1>
          <p>Join, share, and connect with SnapTunnel.</p>
          <div className="button-group">
            {/* create button */}
            <button 
              className="new-meeting-btn"
              onClick={handleCreateRoom}
              disabled={isCreating}
            >
              <span className="material-symbols-outlined">add</span>
              {isCreating ? 'Creating...' : 'Create Room'}
            </button>
            {/* input area */}
            <div className="input-join">
              <input
                type="text"
                value={code}
                onChange={handleInputChange}
                placeholder="Enter code"
              />
              <button
                className={`join-btn ${code ? 'active' : ''}`}
                onClick={handleJoinClick}
                disabled={!code}
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className='image_container'>
        </div>
      </div>
      <div className='footer'>
      </div>
      {/* Add the starfield container */}
      <div className="starfield"></div>
    </div>
  );
};

export default Main;