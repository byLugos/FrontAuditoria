import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect aquí
import { FaUserCircle } from "react-icons/fa"; // Ícono de usuario
import { Link } from "react-router-dom"; // Para el botón de navegación
import axios from "axios"; // Asegúrate de que axios está importado si lo necesitas

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null); // Estado para la información del usuario
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú de usuario

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible); // Alternar la visibilidad del menú
  };

  // Suponiendo que tienes una función que obtiene los datos del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
          .get("http://127.0.0.1:8000/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data); // Establecer los datos del usuario
          })
          .catch((err) => console.log("Error al obtener la información", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirigir al login
  };

  return (
      <nav
          className={`${
              isScrolled ? "bg-white shadow-lg" : "bg-white/20"
          } p-4 fixed w-full top-0 left-0 z-50 transition-all ease-in-out duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/dashboard" className={`${isScrolled ? "text-black" : "text-white"} text-2xl font-bold`}>
              Supermercado XYZ
            </Link>
          </div>

          {/* Navegación */}
          <div className="flex items-center">
            <Link to="/conocenos" className={`${isScrolled ? "text-black" : "text-white"} text-white mr-4 font-semibold hover:text-gray-600 transition-all`}>
              Conócenos
            </Link>

            {/* Ícono de usuario */}
            {user ? (
                <div className="relative">
                  <button onClick={handleMenuToggle} className="flex items-center">
                    <FaUserCircle size={24} className="text-white mr-2" />
                    <span className="text-white">{user.full_name}</span>
                  </button>

                  {/* Menú de opciones de usuario, solo visible cuando 'menuVisible' es true */}
                  {menuVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Ver perfil</Link>
                        <button onClick={handleLogout} className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200">
                          Cerrar sesión
                        </button>
                      </div>
                  )}
                </div>
            ) : (
                <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cerrar sesión
                </button>
            )}
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
