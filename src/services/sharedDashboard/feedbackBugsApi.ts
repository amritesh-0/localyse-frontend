import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api`;

const submitFeedback = async (data: any, isFormData = false) => {
  const config = isFormData
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : {};
  const response = await axios.post(`${API_BASE_URL}/feedbackbugs`, data, config);
  return response.data;
};

export default {
  submitFeedback,
};
