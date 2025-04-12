import React, { useState } from 'react';
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

  return (
    <div className='main-window'>
      <div className="main-container">
        <h1>Lorem ipsum dolor sit amet.<br /> Lorem, ipsum dolor.</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, esse?</p>
        <div className="button-group">
          <button 
            className="new-meeting-btn"
            onClick={handleCreateRoom}
            disabled={isCreating}
          >
            <span className="material-symbols-outlined">add</span>
            {isCreating ? 'Creating...' : 'Create Room'}
          </button>
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
      <div className='void_div'>
      </div>
    </div>
  );
};

export default Main;