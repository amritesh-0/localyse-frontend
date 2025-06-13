import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/instagram`;

export const getInstagramInsights = async () => {
  const token = getToken();
  try {
    if (!token) throw new Error('User token not found');

    const response = await axios.get(`${API_BASE_URL}/insights`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Instagram insights:', error?.response?.data || error.message);
    throw error;
  }
};
