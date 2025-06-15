import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api/business/applications`;

export const fetchApplications = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, message: 'Failed to fetch applications' };
  }
};

export const acceptApplication = async (applicationId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${applicationId}/accept`, null, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error accepting application:', error);
    return { success: false, message: 'Failed to accept application' };
  }
};

export const declineApplication = async (applicationId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${applicationId}/decline`, null, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error declining application:', error);
    return { success: false, message: 'Failed to decline application' };
  }
};
