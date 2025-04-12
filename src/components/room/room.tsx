import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initializeSocket, disconnectSocket } from '../../services/socket';
import './room.css';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const socket = initializeSocket(roomId);

    // Join the room
    socket.emit('join-room', roomId);

    // Handle connection events
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('user-joined', (userId: string) => {
      console.log('User joined:', userId);
    });

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  return (
    <div className="room-container">
      <div className="room-header">
        <h2>Room: {roomId}</h2>
        <div className="connection-status">
          Status: {connected ? 'Connected' : 'Connecting...'}
        </div>
      </div>
      <div className="room-content">
        {/* Add your room content here */}
      </div>
    </div>
  );
};

export default Room;