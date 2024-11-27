import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/roles";

const roleService = {
  getAllRoles: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  addRole: async (newRole) => {
    // Ensure permissions is never null
    const roleToAdd = {
      ...newRole,
      permissions: newRole.permissions || [], // Default to an empty array if permissions are null or undefined
    };
    const response = await axios.post(API_BASE_URL, roleToAdd);
    return response.data;
  },

  editRole: async (roleId, updatedRole) => {
    // Ensure permissions is never null
    const roleToUpdate = {
      ...updatedRole,
      permissions: updatedRole.permissions || [], // Default to an empty array if permissions are null or undefined
    };
    const response = await axios.put(`${API_BASE_URL}/${roleId}`, roleToUpdate);
    return response.data;
  },

  deleteRole: async (roleId) => {
    await axios.delete(`${API_BASE_URL}/${roleId}`);
  },

  getAllPermissions: async () => {
    const permissionsResponse = await axios.get("http://localhost:8080/api/roles/permissions");
    return permissionsResponse.data;
  },
};

export default roleService;
