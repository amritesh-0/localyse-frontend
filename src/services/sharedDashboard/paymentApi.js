import axiosInstance from '../../utils/axiosInstance';

// Create a new payment submission (business)
export const createPaymentSubmission = async (data) => {
  const res = await axiosInstance.post('/api/payments', data);
  return res.data;
};

// Get payment submissions (for influencer or business)
export const getPaymentSubmissions = async (params = {}) => {
  const res = await axiosInstance.get('/api/payments', { params });
  return res.data;
};

// Update payment status (influencer)
export const updatePaymentStatus = async (id, status, issueDescription = '', adId = undefined) => {
  const res = await axiosInstance.patch(`/api/payments/${id}/status`, { status, issueDescription, adId });
  return res.data;
}; 