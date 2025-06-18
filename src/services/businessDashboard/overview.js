import axios from 'axios';
import {getToken} from '../../utils/auth'; // Adjust the import path as necessary

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api/business/overview`;


// Function to get overview data from backend
export const getOverviewData = async () => {
    const token = getToken();
  try {
    const response = await axios.get(API_URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching overview data:', error);
    throw error;
  }
};
