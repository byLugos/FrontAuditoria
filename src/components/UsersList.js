import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No hay token, por favor inicie sesión.");
      return;
    }

    // Hacer la petición a /users para obtener la lista de usuarios
    axios
      .get("http://127.0.0.1:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users); // Guardamos la lista de usuarios
      })
      .catch((err) => {
        setError("Error al obtener la lista de usuarios.");
        console.error(err);
      });
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (users.length === 0) {
    return <p className="text-center text-gray-600">Cargando usuarios...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Lista de Usuarios</h2>
      
      {/* Tabla de usuarios */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-200">Nombre</th>
            <th className="px-4 py-2 text-left bg-gray-200">Correo</th>
            <th className="px-4 py-2 text-left bg-gray-200">Teléfono</th>
            <th className="px-4 py-2 text-left bg-gray-200">Dirección</th>
            <th className="px-4 py-2 text-left bg-gray-200">Rol</th>
            <th className="px-4 py-2 text-left bg-gray-200">Estado</th>
            <th className="px-4 py-2 text-left bg-gray-200">Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{user.full_name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.address}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.status}</td>
              <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
