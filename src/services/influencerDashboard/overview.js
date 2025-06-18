import axios from 'axios';
import {getToken} from '../../utils/auth'; // Adjust the import path as necessary

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${baseUrl}/api/influencer/overview`;

// Fetch influencer dashboard overview data
export const fetchInfluencerOverview = async () => {
    const token = getToken();
  try {
    const response = await axios.get(API_URL, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.data || !response.data.success) {
      throw new Error('Failed to fetch influencer overview data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer overview:', error);
    throw error;
  }
};
