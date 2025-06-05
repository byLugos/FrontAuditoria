import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Recuperamos el rol desde localStorage

    if (!token) {
      setError("No hay token, por favor inicie sesión.");
      setLoading(false);
      return;
    }

    // Verificamos si el rol es "client"
    if (role === "client") {
      setLoading(false);  // Terminamos la carga para el rol de client
      return; // No hacemos la petición si el rol es "client"
    }

    // Si el rol no es "client" (asumimos que es "admin"), hacemos la solicitud
    axios
        .get("http://127.0.0.1:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users); // Guardamos la lista de usuarios
          setLoading(false); // Terminamos la carga
        })
        .catch((err) => {
          setError("Error al obtener la lista de usuarios.");
          setLoading(false); // Terminamos la carga
          console.error(err); // Mostramos el error en consola
        });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // Si el rol es "client", no mostrar nada
  if (users.length === 0 && localStorage.getItem("role") !== "admin") {
    return null; // No mostrar nada si no hay usuarios y el rol es "client"
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
