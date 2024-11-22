// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import IndexPage from './IndexPage';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';
import SpotifyCallback from './components/SpotifyCallback';
import YouTubeCallback from './components/YouTubeCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className='App text-white overflow-hidden'><Header /><Hero/></div> } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/callback/spotify" element={<SpotifyCallback />} />
        <Route path="/callback/youtube" element={<YouTubeCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
