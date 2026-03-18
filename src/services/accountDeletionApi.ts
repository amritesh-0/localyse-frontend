import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api`;

export const accountDeletionApi = {
  submitRequest: async (data: { email: string; reason?: string; requestType: 'full' | 'partial'; details?: string }) => {
    const response = await axios.post(`${API_URL}/account-deletion`, data);
    return response.data;
  },
};
