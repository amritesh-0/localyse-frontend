import axios from 'axios';

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE}/auth/me`, {
      withCredentials: true, // 🔑 Needed for CORS + cookies
    });
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch current user:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Unable to fetch current user'
    );
  }
};
