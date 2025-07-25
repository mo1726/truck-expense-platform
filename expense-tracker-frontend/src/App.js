import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsernamePage from './components/UsernamePage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsernamePage />} />
        <Route path="/dashboard/:username" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
