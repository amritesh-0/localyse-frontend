import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE = `${baseUrl}/api`;
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE}/auth/me`)
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error?.response?.data || error.message);
    throw new Error(
      error?.response?.data?.message || 'Unable to fetch current user'
    );
  }
};
