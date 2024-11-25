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
        console.log("Fetched users:", data); // Check the API response here
        setUsers(data); 
      } catch (error) {
        setMessage("Error fetching users: Invalid response format");
        setMessageType("error");
      }
    };
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
      const { data } = await fetchUsers(); // Refresh the user list
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
      const { data } = await fetchUsers(); // Refresh the user list
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
      const { data } = await fetchUsers(); // Refresh the user list
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

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "0.5rem" }}>
            <span>
              {user.name} - {user.role}
            </span>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
