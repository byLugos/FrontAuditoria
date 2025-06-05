import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Si no hay token, redirigimos al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, renderizamos el componente hijo (Dashboard o cualquier otra ruta)
  return children;
}

export default PrivateRoute;

