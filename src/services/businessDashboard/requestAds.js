import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/requestAds`;


export const getInfluencerAds = async (influencerId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/influencer/${influencerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer ads:', error);
    throw error;
  }
};

// Send request to influencer with selected ad or new campaign data
export const sendRequestToInfluencer = async ({ influencerId, adId, campaignData }) => {
  try {
    const token = getToken();
    const isFormData = campaignData instanceof FormData;

    // Prepare request body
    const data = isFormData
      ? campaignData
      : {
          influencerId,
          adId,
          campaignData,
        };

    // Set headers
    const headers = {
      'Authorization': `Bearer ${token}`,
      ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
    };

    // Send POST request
    const response = await axios.post(`${API_BASE_URL}/sendRequest`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error sending request to influencer:', error);
    throw error;
  }
};

// Fetch request status for a business user and influencer
export const getRequestStatus = async (influencerId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/status/${influencerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.status;
  } catch (error) {
    console.error('Error fetching request status:', error);
    throw error;
  }
};

// Fetch accepted campaign ad IDs per influencer for current business user
export const getAcceptedAdsPerInfluencer = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/acceptedAds`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching accepted ads per influencer:', error);
    throw error;
  }
};

