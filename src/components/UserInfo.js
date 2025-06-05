import React, { useState, useEffect } from "react";
import axios from "axios";

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No hay token, por favor inicie sesión.");
      return;
    }

    // Hacer la petición a /auth/me para obtener la información del usuario
    axios
      .get("http://127.0.0.1:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        setError("Error al obtener la información del usuario.");
        console.error(err);
      });
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!userData) {
    return <p className="text-center text-gray-600">Cargando información...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Información del Usuario
      </h2>
      <div className="space-y-4">
        <p>
          <strong>Nombre Completo: </strong> {userData.full_name}
        </p>
        <p>
          <strong>Email: </strong> {userData.email}
        </p>
        <p>
          <strong>Usuario: </strong> {userData.username}
        </p>
        <p>
          <strong>Rol: </strong> {userData.role}
        </p>
        <p>
          <strong>Estado: </strong> {userData.status}
        </p>
        <p>
          <strong>Fecha de Creación: </strong> {new Date(userData.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Último Inicio de Sesión: </strong> {new Date(userData.last_login).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default UserInfo;
