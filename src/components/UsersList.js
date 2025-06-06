import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    full_name: "",
    phone: "",
    address: "",
    role: "client", // Default role
    status: "active" // Default status
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    // Obtener lista de usuarios
    axios.get("http://127.0.0.1:8000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching users", error);
        });
  }, [token]);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setFormData({
      email: user ? user.email : "",
      username: user ? user.username : "",
      full_name: user ? user.full_name : "",
      phone: user ? user.phone : "",
      address: user ? user.address : "",
      role: user ? user.role : "client",
      status: user ? user.status : "active",
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = selectedUser
        ? `http://127.0.0.1:8000/users/${selectedUser.id}`
        : "http://127.0.0.1:8000/users";
    const method = selectedUser ? "put" : "post";

    axios[method](endpoint, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
          if (selectedUser) {
            setUsers(users.map((user) => user.id === selectedUser.id ? response.data : user));
          } else {
            setUsers([ ...users, response.data ]);
          }
          closeModal();
        })
        .catch((error) => {
          console.error("Error saving user", error);
        });
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://127.0.0.1:8000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
          .then(() => {
            setUsers(users.filter((user) => user.id !== userId));
          })
          .catch((error) => {
            console.error("Error deleting user", error);
          });
    }
  };

  // Estilos en línea con colores más sobrios
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f4f6f9', // Tono gris suave
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  const thStyle = {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#3b4a68', // Azul oscuro
    color: 'white',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    color: '#333',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#3b4a68', // Azul oscuro
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '5px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2d3b53', // Azul más oscuro para el hover
  };

  return (
      <div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Lista de Usuarios</h2>

        {role === "admin" && (
            <button
                onClick={() => openModal()}
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                className="mb-6"
            >
              Crear Usuario
            </button>
        )}

        <table style={tableStyle}>
          <thead>
          <tr>
            <th style={thStyle}>Correo electrónico</th>
            <th style={thStyle}>Nombre de usuario</th>
            <th style={thStyle}>Nombre completo</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: '#ffffff' }}>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.full_name}</td>
                <td style={tdStyle}>{user.phone}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>{user.status}</td>
                <td style={tdStyle}>
                  {role === "admin" && (
                      <>
                        <button
                            onClick={() => openModal(user)}
                            style={buttonStyle}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                        >
                          <FaEdit />
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            style={buttonStyle}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        {/* Modal for Creating/Editing Users */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>{selectedUser ? "Editar Usuario" : "Crear Usuario"}</h2>
          <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                placeholder="Nombre completo"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            />
            <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            >
              <option value="client">Cliente</option>
              <option value="admin">Admin</option>
            </select>
            <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
            <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#3b4a68', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              {selectedUser ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
          </form>
        </Modal>
      </div>
  );
}

export default UserList;
