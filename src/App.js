// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import IndexPage from './IndexPage';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App text-white overflow-hidden">
      <Header/>
      <Hero/>
    </div>
  );
}

export default App;
