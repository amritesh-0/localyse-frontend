import axiosInstance from '../../utils/axiosInstance';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api`;


// Create a new payment submission (business)
export const createPaymentSubmission = async (data) => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const res = await axiosInstance.post(`${API_BASE_URL}/payments`, data,
    { headers }
  );
  return res.data;
};

// Get payment submissions (for influencer or business)
export const getPaymentSubmissions = async (params = {}) => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const res = await axiosInstance.get(`${API_BASE_URL}/payments`, { params, headers }
  );
  return res.data;
};

// Update payment status (influencer)
export const updatePaymentStatus = async (id, status, issueDescription = '', adId = undefined) => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const res = await axiosInstance.patch(`${API_BASE_URL}/payments/${id}/status`, { status, issueDescription, adId },
    { headers }
  );
  return res.data;
}; 