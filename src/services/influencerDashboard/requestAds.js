import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/influencerDashboard/requestAds`;

// Fetch requests received by influencer
export const getRequestsForInfluencer = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer requests:', error);
    throw error;
  }
};

// Update request status (accept or reject)
export const updateRequestStatus = async (requestId, status) => {
  try {
    const token = getToken();
    const response = await axios.patch(`${API_BASE_URL}/${requestId}`, { status }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};


