  import React, { useState } from "react";
  import axios from "axios";

  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Enviar las credenciales al backend para obtener el token
        const response = await axios.post("http://127.0.0.1:8000/auth/login", {
          email,
          password,
        });

        // Guardar el token JWT en el localStorage
        localStorage.setItem("token", response.data.access_token);

        // Redirigir a otra página (por ejemplo, Dashboard)
        window.location.href = "/dashboard";
      } catch (err) {
        setError("Credenciales incorrectas o error en el servidor");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 shadow-lg w-96 relative">
          {/* Osito centrado arriba del formulario */}
          <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
            <img
              src={isPasswordFocused ? "/osoDos.png" : "/osoUno.png"} // Cambiar entre ojos abiertos y cerrados
              alt="Osito"
              className="w-20 h-20 transition-all duration-500 ease-in-out transform scale-110 opacity-100"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingrese su correo"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onFocus={() => setIsPasswordFocused(true)} // Al hacer foco, el osito tapa los ojos
                onBlur={() => setIsPasswordFocused(false)} // Al quitar el foco, los ojos se destapan
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingrese su contraseña"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Iniciar sesión
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  export default Login;
