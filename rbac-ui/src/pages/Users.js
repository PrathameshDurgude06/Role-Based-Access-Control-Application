import React, { useState } from "react";


const generateId = () => {
  return Math.random().toString(36).substr(2, 9); 
};

const Users = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [users, setUsers] = useState([
    { id: generateId(), name: "John Doe", email: "johndoe@example.com", role: "Admin" },
    { id: generateId(), name: "Jane Smith", email: "janesmith@example.com", role: "User" },
    { id: generateId(), name: "Alice Johnson", email: "alicej@example.com", role: "Admin" },
    { id: generateId(), name: "Bob Brown", email: "bobb@example.com", role: "User" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);

    // Email validation
    if (!emailRegex.test(emailInput)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setConfirmationMessage("User deleted successfully!");
    setTimeout(() => setConfirmationMessage(""), 3000); 
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !emailRegex.test(newUser.email)) {
      setEmailError("Please enter a valid name and email.");
      return;
    }

    setUsers([...users, { ...newUser, id: generateId() }]);
    setNewUser({ name: "", email: "", role: "User" });
    setEmailError("");
    setIsModalOpen(false); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-none w-full"
        />
      </div>

      {/* Add User Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 p-2 bg-blue-500 text-white rounded-none hover:bg-blue-600"
      >
        Add User
      </button>

      {/* Modal for Adding User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className="mb-2 p-2 border border-gray-300 rounded-none w-full"
              placeholder="Enter name"
            />
            <input
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="mb-2 p-2 border border-gray-300 rounded-none w-full"
              placeholder="Enter email"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="mb-2 p-2 border border-gray-300 rounded-none w-full"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={handleAddUser}
                className="p-2 bg-blue-500 text-white rounded-none hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-red-500 text-white rounded-none hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display success confirmation */}
      {confirmationMessage && (
        <div className="mb-4 text-green-500">{confirmationMessage}</div>
      )}

      {/* Users Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => alert(`Edit user: ${user.name}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => handleDelete(user.id)}
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
