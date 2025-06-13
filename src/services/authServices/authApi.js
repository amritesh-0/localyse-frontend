import axiosInstance from '../../utils/axiosInstance';

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error?.response?.data || error.message);
    throw new Error(
      error?.response?.data?.message || 'Unable to fetch current user'
    );
  }
};
