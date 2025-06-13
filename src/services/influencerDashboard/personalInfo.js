import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api/personal-info`;

// Modified to accept userId parameter and call the new endpoint
export const getPersonalInfo = async (userId) => {
  const token = getToken();
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const upsertPersonalInfo = async (personalInfoData) => {
  const token = getToken();
  try {
    const response = await axios.post(API_URL, personalInfoData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
