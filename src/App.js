import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Conocenos from './components/Conocenos';
import Profile from './components/Profile'; // Importar el componente de perfil

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Ruta para el login */}
                    <Route path="/login" element={<Login />} />

                    {/* Ruta para Dashboard, protegida por PrivateRoute */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Navbar />
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta para Conócenos, protegida por PrivateRoute */}
                    <Route
                        path="/conocenos"
                        element={
                            <PrivateRoute>
                                <Navbar />
                                <Conocenos />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta para el perfil del usuario */}
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Navbar />
                                <Profile /> {/* Mostrar la información del perfil */}
                            </PrivateRoute>
                        }
                    />

                    {/* Redirección por defecto a la página de login si no está autenticado */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
