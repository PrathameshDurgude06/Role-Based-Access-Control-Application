import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../apiService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success or error
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", role: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setMessage("Error fetching users.");
        setMessageType("error");
      }
    };
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      setMessage("All fields are required to add a new user.");
      setMessageType("error");
      return;
    }
    setIsLoading(true);
    try {
      const { message } = await addUser(newUser);
      setMessage(message);
      setMessageType("success");
      const data = await fetchUsers(); // Refresh the user list
      setUsers(data);
      setNewUser({ name: "", email: "", role: "" }); // Reset form
    } catch (error) {
      setMessage(`Error adding user: ${error.message || "Invalid response format"}`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!updatedUser.name || !updatedUser.email || !updatedUser.role) {
      setMessage("All fields are required to update the user.");
      setMessageType("error");
      return;
    }
    setIsLoading(true);
    try {
      const { message } = await updateUser(editingUser.id, updatedUser);
      setMessage(message);
      setMessageType("success");
      const data = await fetchUsers(); // Refresh the user list
      setUsers(data);
      setEditingUser(null); // Reset editing state
      setUpdatedUser({ name: "", email: "", role: "" }); // Reset form
    } catch (error) {
      setMessage(`Error updating user: ${error.message || "Invalid response format"}`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setIsLoading(true);
    try {
      const { message } = await deleteUser(userId);
      setMessage(message);
      setMessageType("success");
      const data = await fetchUsers(); // Refresh the user list
      setUsers(data);
    } catch (error) {
      setMessage(`Error deleting user: ${error.message || "Invalid response format"}`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUpdatedUser({ name: user.name, email: user.email, role: user.role });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Users</h2>

      {message && (
        <div
          style={{
            marginBottom: "1rem",
            color: messageType === "success" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          required
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          required
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          required
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button onClick={handleAddUser} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add User"}
        </button>
      </div>

      {editingUser && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={updatedUser.name}
            required
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={updatedUser.email}
            required
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={updatedUser.role}
            required
            onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
          />
          <button onClick={handleUpdateUser} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update User"}
          </button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "2rem" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Role</th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{user.name}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{user.email}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{user.role}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                <button
                  onClick={() => handleEditUser(user)}
                  style={{
                    marginRight: "8px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
