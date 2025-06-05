import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login'; 
import Dashboard from './components/Main'; 
import PrivateRoute from './components/PrivateRoute'; 
import Navbar from './components/Navbar'; 
import Conocenos from './components/Conocenos'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Navbar />
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/conocenos" 
            element={
              <PrivateRoute>
                <Navbar />
                <Conocenos />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
