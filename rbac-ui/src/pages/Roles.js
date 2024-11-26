import React, { useState, useEffect } from "react";
import axios from "axios";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);

  // Fetch roles and permissions when the component mounts
  useEffect(() => {
    axios.get("http://localhost:8080/roles") // Adjust the URL as per your backend API
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Error fetching roles:", error);
      });

    axios.get("http://localhost:8080/api/permissions") // Adjust the URL as per your backend API
      .then(response => {
        setPermissions(response.data); // Assuming the backend returns a list of permissions
      })
      .catch(error => {
        console.error("Error fetching permissions:", error);
      });
  }, []);

  const handleAddRole = () => {
    if (!newRole.name || newRole.permissions.length === 0) return;

    axios.post("http://localhost:8080/api/roles", newRole) // Adjust the URL as per your backend API
      .then(response => {
        setRoles([...roles, response.data]);
        setNewRole({ name: "", permissions: [] });
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Error adding role:", error);
      });
  };

  const handleEditRole = () => {
    if (!editRole.name || editRole.permissions.length === 0) return;

    axios.put(`http://localhost:8080/api/roles/${editRole.id}`, editRole) // Adjust the URL as per your backend API
      .then(response => {
        setRoles(roles.map(role => role.id === editRole.id ? response.data : role));
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error("Error editing role:", error);
      });
  };

  const handleDeleteRole = (roleId) => {
    axios.delete(`http://localhost:8080/api/roles/${roleId}`) // Adjust the URL as per your backend API
      .then(() => {
        setRoles(roles.filter(role => role.id !== roleId));
      })
      .catch(error => {
        console.error("Error deleting role:", error);
      });
  };

  const handleTogglePermission = (permission) => {
    if (editRole.permissions.includes(permission)) {
      setEditRole({
        ...editRole,
        permissions: editRole.permissions.filter(p => p !== permission)
      });
    } else {
      setEditRole({
        ...editRole,
        permissions: [...editRole.permissions, permission]
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Roles List</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 p-2 bg-blue-500 text-white rounded-none hover:bg-blue-600"
      >
        Add Role
      </button>

      {/* Add Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
            <input
              type="text"
              name="roleName"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-none w-full"
              placeholder="Role Name"
            />
            <div>
              <label className="block mb-2">Permissions</label>
              <div className="flex flex-col space-y-2">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => setNewRole({
                        ...newRole,
                        permissions: newRole.permissions.includes(permission)
                          ? newRole.permissions.filter(p => p !== permission)
                          : [...newRole.permissions, permission]
                      })}
                    />
                    <span className="ml-2">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAddRole}
                className="p-2 bg-blue-500 text-white rounded-none hover:bg-blue-600"
              >
                Add Role
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

      {/* Edit Role Modal */}
      {isEditModalOpen && editRole && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Role</h2>
            <input
              type="text"
              value={editRole.name}
              onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded-none w-full"
              placeholder="Role Name"
            />
            <div>
              <label className="block mb-2">Permissions</label>
              <div className="flex flex-col space-y-2">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editRole.permissions.includes(permission)}
                      onChange={() => handleTogglePermission(permission)}
                    />
                    <span className="ml-2">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleEditRole}
                className="p-2 bg-blue-500 text-white rounded-none hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 bg-red-500 text-white rounded-none hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Role Name</th>
            <th className="px-4 py-2 border">Permissions</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="px-4 py-2 border">{role.name}</td>
              <td className="px-4 py-2 border">{role.permissions.join(", ")}</td>
              <td className="px-4 py-2 border">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => { setEditRole(role); setIsEditModalOpen(true); }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => handleDeleteRole(role.id)}
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

export default Roles;
