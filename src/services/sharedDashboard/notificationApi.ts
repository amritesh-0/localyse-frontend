import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/notifications`;

export const createNotification = async (notificationData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, notificationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw error;
  }
};
