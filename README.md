# SnapTunnel

SnapTunnel is a real-time file-sharing application that allows users to create and join rooms to share files securely. The application uses WebRTC (planned for file transfers), Socket.IO for real-time communication, Express for the backend, and React with Vite for the frontend. Users can create a room, share its unique code, and allow others to join, with the room creator able to select files to share with participants.

## Features
- Create rooms with unique 6-character codes.
- Join rooms using a room code.
- Real-time updates via Socket.IO for user connections and file selections.
- Creator-specific file sharing interface.
- Planned WebRTC integration for peer-to-peer file transfers (not yet implemented in the provided code).

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v22.13.1 or later): [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (e.g., Chrome, Firefox)

## Project Structure
```
SnapTunnel/
├── server/                 # Backend (Express + Socket.IO)
│   ├── src/
│   │   └── server.ts       # Main server file
│   ├── dist/               # Compiled JavaScript (after `tsc`)
│   ├── package.json        # Server dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
├── src/                    # Frontend (React + Vite)
│   ├── components/
│   │   ├── Main.tsx        # Main page for creating/joining rooms
│   │   └── Room.tsx        # Room page for file sharing
│   ├── services/
│   │   └── socket.ts       # Socket.IO client setup
│   └── main.tsx            # React entry point
├── package.json            # Root dependencies and scripts
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Installation

1. **Clone the Repository** (if hosted on Git):
   ```bash
   git clone <repository-url>
   cd SnapTunnel
   ```
   Or copy the project to `D:\SnapTunnel`.

2. **Install Root Dependencies** (for the client):
   ```bash
   cd D:\SnapTunnel
   npm install
   ```

3. **Install Server Dependencies**:
   ```bash
   cd D:\SnapTunnel\server
   npm install
   ```

## Running the Application

The application uses a single command to start both the client (React frontend) and server (Express backend).

1. **Start the Application**:
   In the root directory:
   ```bash
   cd D:\SnapTunnel
   npm run start
   ```

   This command:
   - Builds the server’s TypeScript code (`server/src/server.ts` to `server/dist/server.js`).
   - Starts the client (Vite) on `http://localhost:5173`.
   - Compiles server TypeScript in watch mode (`tsc --watch`).
   - Runs the server with auto-restart (`nodemon`) on `http://localhost:3000`.

2. **Access the Application**:
   - Open your browser to `http://localhost:5173`.
   - **Create a Room**: Click "+ Create Room" to generate a room ID (e.g., `abc123`).
   - **Join a Room**: Copy the room ID, go back, enter it in the input field, and click "Join".
   - **File Sharing**: The room creator can attach a file, and other participants will see the file status.

3. **Stop the Application**:
   - Press `Ctrl + C` in the terminal to stop the client and server.

## Development

For developers making changes:

- **Client Changes**:
  - Edit files in `D:\SnapTunnel\src` (e.g., `Main.tsx`, `Room.tsx`).
  - Vite auto-reloads the browser on changes.
- **Server Changes**:
  - Edit `D:\SnapTunnel\server\src\server.ts`.
  - TypeScript compiles automatically (`tsc --watch`), and `nodemon` restarts the server.
- **Run Separately** (if needed):
  - Client:
    ```bash
    cd D:\SnapTunnel
    npm run dev
    ```
  - Server:
    ```bash
    cd D:\SnapTunnel\server
    npm run dev  # Compile TypeScript
    npm run server  # Run server
    ```

## Scripts

### Root (`D:\SnapTunnel\package.json`)
- `npm run dev:client`: Starts the Vite client (`http://localhost:5173`).
- `npm run dev:server`: Runs `tsc --watch` in the server directory.
- `npm run server`: Runs `nodemon dist/server.js` in the server directory.
- `npm run prestart`: Builds the server’s TypeScript code.
- `npm run start`: Runs client, server compilation, and server together.

### Server (`D:\SnapTunnel\server\package.json`)
- `npm run build`: Compiles `src/server.ts` to `dist/server.js`.
- `npm run start`: Runs the compiled server (`node dist/server.js`).
- `npm run dev`: Runs `tsc --watch` for continuous compilation.
- `npm run server`: Runs `nodemon dist/server.js` for auto-restart.

## Dependencies

### Root (Client)
- `vite`: Fast frontend tooling.
- `@vitejs/plugin-react`: React support for Vite.
- `concurrently`: Runs multiple commands together.
- Others: React, React Router, Socket.IO Client (see `package.json`).

### Server
- `express`: Web framework.
- `socket.io`: Real-time communication.
- `cors`: Cross-origin resource sharing.
- `uuid`: Unique ID generation.
- `typescript`: TypeScript compiler.
- `nodemon`: Auto-restart server.
- Type definitions: `@types/express`, `@types/cors`, `@types/uuid`.

## Troubleshooting

- **Server Doesn’t Start**:
  - Ensure `D:\SnapTunnel\server\dist\server.js` exists (run `cd D:\SnapTunnel\server && npm run build`).
  - Check for port conflicts:
    ```bash
    netstat -aon | findstr :3000
    taskkill /PID <pid> /F
    ```
- **Client Errors** (e.g., "Failed to create room"):
  - Open browser DevTools (F12) → Console/Network.
  - Verify `POST` requests to `http://localhost:3000/api/rooms` return `200 OK`.
  - Check server logs in the terminal.
- **CORS Issues**:
  - Ensure server CORS is set to allow `http://localhost:5173`.
- **Logs**:
  - Server: Look for `Server running on port 3000` and `User connected: <socket.id>`.
  - Client: Look for `Connected to server` in the browser console.

## Contributing
- Fork the repository.
- Create a feature branch (`git checkout -b feature-name`).
- Commit changes (`git commit -m "Add feature"`).
- Push to the branch (`git push origin feature-name`).
- Open a pull request.
