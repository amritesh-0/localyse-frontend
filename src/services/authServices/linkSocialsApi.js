import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE = `${baseUrl}/api/linkSocials/status`;

export const fetchLinkedSocials = async () => {
  const token = getToken();
  try {
    const response = await axios.get(API_BASE, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching linked socials:', error);
    return {};
  }
};
