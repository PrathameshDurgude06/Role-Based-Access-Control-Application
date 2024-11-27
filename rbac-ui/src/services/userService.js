import axios from "axios";

// Base URL for API
const API_URL = "http://localhost:8080/users";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(
      error.response?.data?.message || "Error fetching users"
    );
  }
};

// Add a new user
export const addUser = async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw new Error(
      error.response?.data?.message || "Error adding user"
    );
  }
};

// Update an existing user
export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error(
      error.response?.data?.message || "Error updating user"
    );
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw new Error(
      error.response?.data?.message || "Error deleting user"
    );
  }
};
