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
        <div className="min-h-screen bg-gray-900 pt-20"> {/* Fondo oscuro para la página */}
            {/* Navbar */}
            <Navbar />

            {/* Contenido del perfil */}
            <div className="max-w-4xl mx-auto p-8 bg-white text-black rounded-lg shadow-lg mt-6"> {/* Fondo blanco y texto negro */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Información del Usuario</h2>

                {/* Botón de regreso al dashboard */}
                <div className="text-center mb-6 mt-4">
                    <Link
                        to="/dashboard"
                        className="text-white bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Volver al Dashboard
                    </Link>
                </div>

                {/* Información del usuario */}
                <div className="space-y-6 text-black text-lg">
                    <div className="flex justify-between">
                        <p className="font-semibold">Nombre Completo:</p>
                        <p>{user.full_name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Correo electrónico:</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Usuario:</p>
                        <p>{user.username}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Rol:</p>
                        <p>{user.role}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Estado:</p>
                        <p>{user.status}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Fecha de Creación:</p>
                        <p>{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Último Inicio de Sesión:</p>
                        <p>{new Date(user.last_login).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
