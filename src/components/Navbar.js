import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Cambiar el estado de isScrolled cuando el usuario haga scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
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
        <div>
          <Link to="/conocenos" className={`${ isScrolled ? "text-black" : "text-white"} text-white mr-4 font-semibold hover:text-gray-600 transition-all`}>
            Conócenos
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
