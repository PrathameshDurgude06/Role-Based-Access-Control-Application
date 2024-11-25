import React, { useState } from "react";

// Generate unique ID for roles and permissions
const generateId = () => Math.random().toString(36).substr(2, 9);

const Permissions = () => {
  // Define available permissions
  const permissions = [
    { id: generateId(), name: "View Users" },
    { id: generateId(), name: "Manage Roles" },
    { id: generateId(), name: "Edit Permissions" },
  ];

  // Define available roles with assigned permissions
  const [roles, setRoles] = useState([
    { id: generateId(), name: "Admin", permissions: ["View Users", "Manage Roles", "Edit Permissions"] },
    { id: generateId(), name: "User", permissions: ["View Users"] },
    { id: generateId(), name: "Manager", permissions: ["View Users", "Manage Roles"] },
  ]);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Handle role selection to edit permissions
  const handleEditPermissions = (role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  // Handle permission toggling for a selected role
  const handlePermissionToggle = (permission) => {
    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((perm) => perm !== permission)
      : [...selectedRole.permissions, permission];

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
  };

  // Save the updated permissions to the roles array
  const handleSavePermissions = () => {
    setRoles(roles.map((role) =>
      role.id === selectedRole.id ? selectedRole : role
    ));
    setIsEditModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Permissions List</h1>

      {/* Role-Permission Mapping Table */}
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Permissions</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="p-2 border">{role.name}</td>
              <td className="p-2 border">
                <ul>
                  {role.permissions.map((permission) => (
                    <li key={permission} className="text-sm">{permission}</li>
                  ))}
                </ul>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEditPermissions(role)}
                  className="p-2 bg-blue-500 text-white rounded-none hover:bg-blue-600"
                >
                  Edit Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Permissions Modal */}
      {isEditModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Permissions for {selectedRole.name}</h2>

            {permissions.map((permission) => (
              <div key={permission.id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id={permission.id}
                  checked={selectedRole.permissions.includes(permission.name)}
                  onChange={() => handlePermissionToggle(permission.name)}
                  className="mr-2"
                />
                <label htmlFor={permission.id}>{permission.name}</label>
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSavePermissions}
                className="p-2 bg-green-500 text-white rounded-none hover:bg-green-600"
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
    </div>
  );
};

export default Permissions;
