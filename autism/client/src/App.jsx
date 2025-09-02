import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Emotion from './pages/Emotion';
import FamilyRecognition from './pages/FamilyRecognition';
import SOS from './pages/SOS';
import Reminders from './pages/Reminders';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emotion" element={<Emotion />} />
          <Route path="/family" element={<FamilyRecognition />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


