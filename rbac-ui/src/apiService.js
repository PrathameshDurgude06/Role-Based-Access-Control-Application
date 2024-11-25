import axios from 'axios';

// Update API URL to match your backend URL
const API_URL = 'http://localhost:8080/users'; // Backend running on port 8080

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // You should return the user data, not the entire response object
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

export const addUser = async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data; // Return the saved user data
  } catch (error) {
    throw new Error('Error adding user: ' + error.message);
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return response.data; // Return response from backend, typically success message
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data; // Return the success message from the backend
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};
