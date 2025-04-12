import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/home/main.tsx'
import NavBar from './components/home/navBar.tsx'
import Footer from './components/home/footer.tsx'

import Room from './components/room/room.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;