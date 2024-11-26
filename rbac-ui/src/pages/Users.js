import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../apiService";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success or error
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setMessage("Error fetching users.");
        setMessageType("error");
      }
    };
    loadUsers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleFormToggle = (mode = "add", user = null) => {
    setIsFormVisible(true);
    setFormMode(mode);
    if (mode === "edit" && user) {
      setCurrentUser({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      setEditingUserId(user.id);
    } else {
      setCurrentUser({ name: "", email: "", role: "", status: "Active" });
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setCurrentUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleFormSubmit = async () => {
    const { name, email, role, status } = currentUser;
    if (!name || !email || !role || !status) {
      setMessage("All fields are required.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    try {
      if (formMode === "add") {
        const { message } = await addUser(currentUser);
        setMessage(message);
        setMessageType("success");
      } else if (formMode === "edit") {
        const { message } = await updateUser(editingUserId, currentUser);
        setMessage(message);
        setMessageType("success");
      }
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
      handleFormClose();
    } catch (error) {
      setMessage("Error submitting form.");
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
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setMessage("Error deleting user.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="users-container">
      <h2>User Management</h2>

      {message && <div className={`message ${messageType}`}>{message}</div>}

      <div className="search-add-bar">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={() => handleFormToggle("add")} className="add-button">
          Add User
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>  {/* Make sure the status is displayed here */}
              <td className="actions-column">
                <button
                  onClick={() => handleFormToggle("edit", user)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormVisible && (
        <div className="user-form">
          <h3>{formMode === "add" ? "Add User" : "Edit User"}</h3>
          <input
            type="text"
            placeholder="Name"
            value={currentUser.name}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={currentUser.email}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
          <select
            value={currentUser.role}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <select
            value={currentUser.status}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={handleFormSubmit}
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button onClick={handleFormClose} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
