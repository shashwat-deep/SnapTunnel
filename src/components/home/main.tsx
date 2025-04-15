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

  useEffect(() => {
    const starfield = document.querySelector('.starfield');
    if (starfield) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 30}s`;
        starfield.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="main-window">
      <div className="intro_page">
        <div className="main-container">
          <h1>Seamless file sharing<br />for everyone</h1>
          <p>Join, share, and connect with SnapTunnel.</p>
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
        <div className="image_container">
          <img src="/mobile_data_transfer.png" width={400} alt="intro_image" />
        </div>
      </div>
      <div className="about_section" id="about">
        <h1 className="about_heading">ABOUT</h1>
        <div className="about_card block">
          <div className="detail">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quam
            reiciendis exercitationem saepe vitae modi magni architecto voluptatem
            maiores deserunt, dolores tenetur totam eius nostrum. Pariatur aliquam et
            quod vitae!
          </div>
          <img
            className="about_1_img"
            src="/mobile_data_transfer.png"
            alt="about image 1"
            width={500}
          />
        </div>
        <div className="about_card about_card_reverse block">
          <img
            className="about_1_img"
            src="/mobile_data_transfer.png"
            alt="about image 2"
            width={500}
          />
          <div className="detail">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quam
            reiciendis exercitationem saepe vitae modi magni architecto voluptatem
            maiores deserunt, dolores tenetur totam eius nostrum. Pariatur aliquam et
            quod vitae!
          </div>
        </div>
        <div className="about_card block">
          <div className="detail">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quam
            reiciendis exercitationem saepe vitae modi magni architecto voluptatem
            maiores deserunt, dolores tenetur totam eius nostrum. Pariatur aliquam et
            quod vitae!
          </div>
          <img
            className="about_1_img"
            src="/mobile_data_transfer.png"
            alt="about image 3"
            width={500}
          />
        </div>
      </div>
      <div className="pricing_section" id="pricing">
        <h1 className="pricing_heading">PRICING</h1>
        <div className='pricing_details'>
          <div className='price_card block'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, tempore. Autem laudantium doloremque excepturi maiores, accusantium aliquid earum adipisci cum similique nobis ab nesciunt provident quis! Natus magni neque maiores fugit architecto. Harum et quibusdam eius odio, itaque soluta, doloribus autem eaque veniam impedit ea maiores quae quo. Commodi, nulla.</div>
          <div className='price_card block'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, tempore. Autem laudantium doloremque excepturi maiores, accusantium aliquid earum adipisci cum similique nobis ab nesciunt provident quis! Natus magni neque maiores fugit architecto. Harum et quibusdam eius odio, itaque soluta, doloribus autem eaque veniam impedit ea maiores quae quo. Commodi, nulla.</div>
        </div>
      </div>
      <div className="footer"></div>
      <div className="starfield"></div>
    </div>
  );
};

export default Main;