import React from "react";
import UserInfo from "./UserInfo"; // Importamos el componente
import UserList from "./UsersList";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate en lugar de useHistory

function Main() {
  const navigate = useNavigate(); // Usamos useNavigate

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");
    // Redirigir al login
    navigate("/login"); // Usamos navigate en lugar de history.push
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source
            src="https://www.w3schools.com/html/movie.mp4" // Puedes cambiar el enlace por tu propio video
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl font-bold">Bienvenido al Sistema de Gestión</h1>
          <p className="text-xl mt-4">Gestiona productos, usuarios, cuentas y más.</p>
        </div>
      </section>

      {/* Información del usuario y otras secciones */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="container mx-auto">
          {/* Información del usuario */}
          <UserInfo />

          {/* Lista de usuarios */}
          <UserList />

          {/* Lista de productos */}
          <ProductList />

          {/* Cerrar sesión */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
