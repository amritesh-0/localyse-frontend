import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/password`;

// Send forgot password email
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// Reset password using token and new password
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, { token, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
