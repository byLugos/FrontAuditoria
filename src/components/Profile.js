import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Para el botón de regreso al Dashboard
import Navbar from "./Navbar"; // Importar el Navbar
import axios from "axios"; // Asegúrate de tener axios para hacer las solicitudes al backend

function Profile() {
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
    const [error, setError] = useState("");

    useEffect(() => {
        // Intentar obtener el token de localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No hay token, por favor inicie sesión.");
            return;
        }

        // Hacer la solicitud a /auth/me para obtener la información del usuario
        axios
            .get("http://127.0.0.1:8000/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data); // Establecer la información del usuario
            })
            .catch((err) => {
                setError("Error al obtener la información del usuario.");
                console.error(err);
            });
    }, []);

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!user) {
        return <p className="text-center text-gray-600">Cargando información...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-20"> {/* Añadido padding-top para evitar la superposición */}
            {/* Navbar */}
            <Navbar />

            {/* Contenido del perfil */}
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-6">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Información del Usuario</h2>

                {/* Botón de regreso al dashboard */}
                <div className="text-center mb-6 mt-4">  {/* Agregamos mt-4 para el margen superior */}
                    <Link
                        to="/dashboard"
                        className="text-white bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Volver al Dashboard
                    </Link>
                </div>

                <div className="space-y-4">
                    <p><strong>Nombre Completo:</strong> {user.full_name}</p>
                    <p><strong>Correo electrónico:</strong> {user.email}</p>
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                    <p><strong>Estado:</strong> {user.status}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                    <p><strong>Último Inicio de Sesión:</strong> {new Date(user.last_login).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
