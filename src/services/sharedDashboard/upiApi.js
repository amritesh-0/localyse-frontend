import axiosInstance from '../../utils/axiosInstance';

// Upsert UPI details (influencer)
export const upsertUPIDetails = async (upiDetails) => {
  const res = await axiosInstance.post('/api/upi', upiDetails);
  return res.data;
};

// Get UPI details (for influencer or business)
export const getUPIDetails = async (params = {}) => {
  const res = await axiosInstance.get('/api/upi', { params });
  return res.data;
}; 