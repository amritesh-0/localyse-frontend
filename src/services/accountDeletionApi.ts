import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const accountDeletionApi = {
  submitRequest: async (data: { email: string; reason?: string; requestType: 'full' | 'partial'; details?: string }) => {
    const response = await axios.post(`${API_URL}/account-deletion`, data);
    return response.data;
  },
};
