import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active rooms
const activeRooms = new Map<string, { users: string[] }>();

// Create a new room
app.post('/api/rooms', (req, res) => {
  const roomId = uuidv4().slice(0, 6); // Generate a 6-character room code
  activeRooms.set(roomId, { users: [] });
  res.json({ roomId });
});

// Join a room
app.post('/api/rooms/:roomId/join', (req, res) => {
  const { roomId } = req.params;
  const room = activeRooms.get(roomId);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  res.json({ success: true });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId: string) => {
    const room = activeRooms.get(roomId);
    if (room) {
      socket.join(roomId);
      room.users.push(socket.id);
      io.to(roomId).emit('user-joined', socket.id);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Clean up rooms when users leave
    activeRooms.forEach((room, roomId) => {
      if (room.users.includes(socket.id)) {
        room.users = room.users.filter(id => id !== socket.id);
        if (room.users.length === 0) {
          activeRooms.delete(roomId);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 