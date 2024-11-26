import axios from 'axios';

// Update API URL to match your backend URL
const API_URL = 'http://localhost:8080/users'; // Backend running on port 8080
const ROLE_API_URL = 'http://localhost:8080/roles';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Returning user data from response
  } catch (error) {
    throw new Error('Error fetching users: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const addUser = async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data; // Returning saved user data
  } catch (error) {
    throw new Error('Error adding user: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return response.data; // Returning updated user data
  } catch (error) {
    throw new Error('Error updating user: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    return; // No content to return
  } catch (error) {
    throw new Error('Error deleting user: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const fetchRoles = async () => {
  try {
    const response = await axios.get(ROLE_API_URL);
    return response.data; // Returning list of roles
  } catch (error) {
    throw new Error('Error fetching roles: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const fetchPermissions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/permissions'); // Assuming permissions endpoint
    return response.data; // Returning list of permissions
  } catch (error) {
    throw new Error('Error fetching permissions: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const addRole = async (newRole) => {
  try {
    const response = await axios.post(ROLE_API_URL, newRole);
    return response.data; // Returning the newly created role
  } catch (error) {
    throw new Error('Error adding role: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const updateRole = async (roleId, updatedRole) => {
  try {
    const response = await axios.put(`${ROLE_API_URL}/${roleId}`, updatedRole);
    return response.data; // Returning the updated role
  } catch (error) {
    throw new Error('Error updating role: ' + (error.response ? error.response.data.message : error.message));
  }
};

export const deleteRole = async (roleId) => {
  try {
    await axios.delete(`${ROLE_API_URL}/${roleId}`);
    return; // No content to return
  } catch (error) {
    throw new Error('Error deleting role: ' + (error.response ? error.response.data.message : error.message));
  }
};
