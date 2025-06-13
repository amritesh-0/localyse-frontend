import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/businessDashboard/tracking`;

// Update getTrackingDetailsForBusiness to accept adId param
export const getTrackingDetailsForBusiness = async (adId) => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/${adId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update updateBusinessApprovalStatus to accept adId param and approvalData
export const updateBusinessApprovalStatus = async (adId, approvalData) => {
  const token = getToken();
  const response = await axios.patch(
    `${API_BASE_URL}/${adId}`,
    approvalData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
