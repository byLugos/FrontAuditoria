import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No hay token, por favor inicie sesión.");
      return;
    }

    // Hacer la petición a /products para obtener la lista de productos
    axios
      .get("http://127.0.0.1:8000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.products); // Guardamos la lista de productos
      })
      .catch((err) => {
        setError("Error al obtener la lista de productos.");
        console.error(err);
      });
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-600">Cargando productos...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Lista de Productos</h2>

      {/* Tabla de productos */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-200">Nombre</th>
            <th className="px-4 py-2 text-left bg-gray-200">Descripción</th>
            <th className="px-4 py-2 text-left bg-gray-200">Precio</th>
            <th className="px-4 py-2 text-left bg-gray-200">Categoría</th>
            <th className="px-4 py-2 text-left bg-gray-200">Marca</th>
            <th className="px-4 py-2 text-left bg-gray-200">Stock</th>
            <th className="px-4 py-2 text-left bg-gray-200">Estado</th>
            <th className="px-4 py-2 text-left bg-gray-200">Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.brand}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">{product.status}</td>
              <td className="px-4 py-2">{new Date(product.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
