import axios from 'axios';
import { getToken } from '../../utils/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = `${baseUrl}/api`;

/**
 * Fetch YouTube insights for the authenticated user.
 * This calls the backend API endpoint that fetches YouTube analytics data.
 * @returns {Promise<Object>} YouTube insights data
 */
export const fetchYouTubeInsights = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/youtube/insights`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include', // include cookies for auth if needed
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch YouTube insights');
  }

  return await response.json();
};
