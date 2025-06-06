import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal"; // Importamos react-modal
import { useNavigate } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Para abrir/cerrar el modal
    const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para editar
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        barcode: "",
        stock: 0,
        min_stock: 0,
    });

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError("No estás autenticado.");
            setLoading(false);
            return;
        }

        axios
            .get("http://127.0.0.1:8000/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error al obtener productos.");
                setLoading(false);
            });
    }, [token]);

    const openModal = (product = null) => {
        setSelectedProduct(product);
        setFormData({
            name: product ? product.name : "",
            description: product ? product.description : "",
            price: product ? product.price : "",
            category: product ? product.category : "",
            brand: product ? product.brand : "",
            barcode: product ? product.barcode : "",
            stock: product ? product.stock : 0,
            min_stock: product ? product.min_stock : 0,
        });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProduct(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            brand: "",
            barcode: "",
            stock: 0,
            min_stock: 0,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            // Actualizar producto
            axios
                .put(
                    `http://127.0.0.1:8000/products/${selectedProduct.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(() => {
                    setProducts(
                        products.map((product) =>
                            product.id === selectedProduct.id ? { ...product, ...formData } : product
                        )
                    );
                    closeModal();
                })
                .catch((err) => {
                    alert("Error al actualizar el producto.");
                    console.error(err);
                });
        } else {
            // Crear producto
            axios
                .post("http://127.0.0.1:8000/products", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setProducts([...products, response.data.product]);
                    closeModal();
                })
                .catch((err) => {
                    alert("Error al crear el producto.");
                    console.error(err);
                });
        }
    };

    const handleDelete = (productId) => {
        axios
            .delete(`http://127.0.0.1:8000/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setProducts(products.filter((product) => product.id !== productId));
            })
            .catch((err) => {
                alert("Error al eliminar el producto.");
                console.error(err);
            });
    };

    if (loading) return <p>Cargando productos...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Lista de Productos</h2>

            {role === "admin" && (
                <button
                    onClick={() => openModal()}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all mb-6"
                >
                    Crear Producto
                </button>
            )}

            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2">Precio</th>
                    <th className="px-4 py-2">Categoría</th>
                    <th className="px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.description}</td>
                        <td className="px-4 py-2">{product.price}</td>
                        <td className="px-4 py-2">{product.category}</td>
                        <td className="px-4 py-2 flex space-x-3">
                            {role === "admin" && (
                                <>
                                    <button
                                        onClick={() => openModal(product)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit className="text-xl" /> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt className="text-xl" /> Eliminar
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal para Crear/Editar Producto */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Producto" className="modal">
                <h2 className="text-2xl font-bold mb-4">{selectedProduct ? "Editar Producto" : "Crear Producto"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Categoría"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Marca"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Código de barra"
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Stock mínimo"
                        value={formData.min_stock}
                        onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
                        className="mb-4 p-2 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                        {selectedProduct ? "Actualizar Producto" : "Crear Producto"}
                    </button>
                </form>
                <button onClick={closeModal} className="mt-4 text-gray-500">Cerrar</button>
            </Modal>
        </div>
    );
}

export default ProductList;
