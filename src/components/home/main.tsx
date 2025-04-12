import React, { useState } from 'react';
import './main.css';

const Main: React.FC = () => {
  const [code, setCode] = useState(''); // State for input value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleJoinClick = () => {
    // Handle join action (e.g., validate code and redirect)
    if (code) {
      alert(`Joining meeting with code: ${code}`);
    }
  };

  return (
    <div className='main-window'>
      <div className="main-container">
        <h1>Lorem ipsum dolor sit amet.<br /> Lorem, ipsum dolor.</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, esse?</p>
        <div className="button-group">
          <button className="new-meeting-btn">
            <span className="material-symbols-outlined">add</span> Create Room
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