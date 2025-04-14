import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Main from './components/home/main.tsx';
import NavBar from './components/home/navBar.tsx';
import Room from './components/room/room.tsx';
import './App.css';

const AppContent: React.FC = () => {
  const location = useLocation();

  // Show NavBar only on the root path ("/")
  const showNavBar = location.pathname === '/';

  return (
    <div className="app-wrapper">
      {showNavBar && <NavBar />}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;