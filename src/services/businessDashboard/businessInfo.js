import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api/business-info`;

export const getBusinessInfo = async () => {
  const token = getToken();
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}; // <-- FIXED: Added closing brace here

export const upsertBusinessInfo = async (businessInfoData) => {
  const token = getToken();
  try{
  const response = await axios.post(API_URL, businessInfoData, {
    withCredentials: true,
     headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
}
 catch (error) {
    console.error(error);
    return null;
  }
};
