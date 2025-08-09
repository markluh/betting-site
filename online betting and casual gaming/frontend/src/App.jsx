import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import './styles/main.css'

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (jwtToken) => {
    setToken(jwtToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
  };

  const handleRegistered = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games token={token} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegistered={handleRegistered} />} />
        <Route path="/profile" element={<Profile token={token} />} />
      </Routes>

    </Router>
  );
}

export default App;
