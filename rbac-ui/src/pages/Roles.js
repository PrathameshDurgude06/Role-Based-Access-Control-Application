import React, { useState, useEffect } from "react";
import roleService from "../services/roleService";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesData, permissionsData] = await Promise.all([
          roleService.getAllRoles(),
          roleService.getAllPermissions(),
        ]);
        setRoles(rolesData);
        setPermissions(permissionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddRole = async () => {
    if (!newRole.name || newRole.permissions.length === 0) return;

    try {
      const addedRole = await roleService.addRole(newRole);
      setRoles([...roles, addedRole]);
      setNewRole({ name: "", permissions: [] });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const handleEditRole = async () => {
    if (!editRole.name || editRole.permissions.length === 0) return;

    try {
      const updatedRole = await roleService.editRole(editRole.id, {
        ...editRole,
        permissions: editRole.permissions || [], // Ensure permissions is not null
      });
      setRoles(roles.map((role) => (role.id === editRole.id ? updatedRole : role)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing role:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await roleService.deleteRole(roleId);
      setRoles(roles.filter((role) => role.id !== roleId));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleTogglePermission = (permission, role) => {
    const updatePermissions = role.permissions.includes(permission)
      ? role.permissions.filter((p) => p !== permission)
      : [...role.permissions, permission];

    if (role === editRole) {
      setEditRole({ ...editRole, permissions: updatePermissions });
    } else {
      setNewRole({ ...newRole, permissions: updatePermissions });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Roles List</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              placeholder="Role Name"
            />
            <div>
              <label className="block mb-2">Permissions</label>
              {permissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handleTogglePermission(permission, newRole)}
                  />
                  <span className="ml-2">{permission}</span>
                </label>
              ))}
            </div>
            <button onClick={handleAddRole} className="p-2 bg-blue-500 text-white mt-4">
              Add Role
            </button>
            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-red-500 text-white mt-4">
              Cancel
            </button>
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
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              placeholder="Role Name"
            />
            <div>
              <label className="block mb-2">Permissions</label>
              {permissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editRole.permissions?.includes(permission)}
                    onChange={() => handleTogglePermission(permission, editRole)}
                  />
                  <span className="ml-2">{permission}</span>
                </label>
              ))}
            </div>
            <button onClick={handleEditRole} className="p-2 bg-blue-500 text-white mt-4">
              Save Changes
            </button>
            <button onClick={() => setIsEditModalOpen(false)} className="p-2 bg-red-500 text-white mt-4">
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Role Name</th>
            <th className="py-2 px-4 border-b">Permissions</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b">{role.name}</td>
              <td className="py-2 px-4 border-b">
                {(role.permissions || []).join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {
                    setEditRole(role);
                    setIsEditModalOpen(true);
                  }}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
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
