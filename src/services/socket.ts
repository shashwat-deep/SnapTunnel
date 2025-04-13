import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (roomId: string) => {
  if (!socket) {
    socket = io('http://localhost:3000');
    socket.emit('join-room', roomId);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};