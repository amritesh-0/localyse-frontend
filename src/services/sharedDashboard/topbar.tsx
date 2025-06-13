import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api`;

export const fetchNotifications = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return [];
  }
};

export const fetchProfileImage = async () => {
    const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/profileImage`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data.profileImageUrl;
  } catch (error) {
    console.error('Failed to fetch profile image:', error);
    return null;
  }
};
