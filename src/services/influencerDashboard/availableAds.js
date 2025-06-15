import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE = `${baseUrl}/api/availableAds`;


export const fetchAvailableAds = async () => {
  const response = await axios.get(`${API_BASE}/ads`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

export const fetchApplications = async () => {
  const response = await axios.get(`${API_BASE}/applications`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const applyForAd = async (adId, message) => {
  const response = await axios.post(`${API_BASE}/apply`, { adId, message 
}, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const markAdNotInterested = async (adId, message) => {
  const response = await axios.post(`${API_BASE}/not-interested`, { adId, message
    }, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
   });
  return response.data;
};
