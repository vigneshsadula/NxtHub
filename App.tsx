import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Campaigns from './pages/Campaigns';
import Dashboard from './pages/Dashboard';
import Influencers from './pages/Influencers';
import Messaging from './pages/Messaging';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/influencers" element={<Influencers />} />
        <Route path="/messaging" element={<Messaging />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
