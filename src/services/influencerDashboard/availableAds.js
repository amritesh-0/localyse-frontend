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

export const applyForAd = async (adId) => {
  const response = await axios.post(`${API_BASE}/apply`, { adId 
}, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const markAdNotInterested = async (adId) => {
  const response = await axios.post(`${API_BASE}/not-interested`, { adId
    }, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
   });
  return response.data;
};
