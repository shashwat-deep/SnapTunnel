import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { initializeSocket, disconnectSocket } from '../../services/socket';
import './room.css';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [connected, setConnected] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileStatus, setFileStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    socket.on('set-creator', (creator: boolean) => {
      console.log('Creator status:', creator);
      setIsCreator(creator);
    });

    socket.on('user-joined', (userId: string) => {
      console.log('User joined:', userId);
    });

    socket.on('file-prepared', (data: { fileName: string, fileSize: number }) => {
      console.log('File prepared:', data);
      setFileStatus(`File "${data.fileName}" (${formatFileSize(data.fileSize)}) is being prepared for transfer`);
    });

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Notify other users about the file
      const socket = initializeSocket(roomId || '');
      socket.emit('file-selected', {
        roomId,
        fileName: file.name,
        fileSize: file.size
      });
      
      setFileStatus(`File "${file.name}" (${formatFileSize(file.size)}) selected. Ready to transfer.`);
    }
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="room-container">
      <div className="room-header">
        <h2>Room: {roomId}</h2>
        <div className="connection-status">
          Status: {connected ? 'Connected' : 'Connecting...'}
        </div>
      </div>
      <div className="room-content">
        {isCreator && (
          <div className="file-section">
            <h3>File Transfer</h3>
            <p>As the room creator, you can attach a file to send to other participants.</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button 
              className="attach-btn"
              onClick={handleAttachClick}
            >
              <span className="material-symbols-outlined">attach_file</span>
              Attach File
            </button>
            {selectedFile && (
              <div className="selected-file">
                <p>Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})</p>
              </div>
            )}
          </div>
        )}
        {!isCreator && (
          <div className="file-section">
            <h3>File Transfer</h3>
            <p>Waiting for the room creator to attach a file...</p>
          </div>
        )}
        {fileStatus && (
          <div className="file-status">
            <p>{fileStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;