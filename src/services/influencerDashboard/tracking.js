import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/influencerDashboard/tracking`;


// Update submitTrackingDetails to accept adId and send trackingDetails in body
export const submitTrackingDetails = async (adId, submission) => {
  const token = getToken();
  const response = await axios.post(
    `${API_BASE_URL}/${adId}`,
    { submission },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update getTrackingDetailsForInfluencer to accept adId param
export const getTrackingDetailsForInfluencer = async (adId) => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/${adId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
