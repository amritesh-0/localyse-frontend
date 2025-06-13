import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/availableInfluencers`;


// Fetch list of available influencers
export const getAvailableInfluencers = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_BASE_URL,{
        withCredentials: true,
        headers: {
        Authorization: `Bearer ${token}`,
      },}
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching available influencers:', error);
    throw error;
  }
};
