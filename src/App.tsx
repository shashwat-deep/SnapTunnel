import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/home/main.tsx'
import NavBar from './components/home/navBar.tsx'

import Room from './components/room/room.tsx';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar /> 
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;