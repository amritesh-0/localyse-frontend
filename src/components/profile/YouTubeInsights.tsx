import React, { useEffect, useState } from 'react';
import { fetchYouTubeInsights } from '../../services/OnboardingData/youtubeInsightsApi';

const YouTubeInsights = () => {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInsights = async () => {
      try {
        const data = await fetchYouTubeInsights();
        console.log('YouTube Insights:', data);
        setInsights(data);
      } catch (err) {
        console.error('Error fetching YouTube insights:', err);
        setError('Failed to load YouTube insights');
      } finally {
        setLoading(false);
      }
    };

    getInsights();
  }, []);

  if (loading) {
    return <p>Loading YouTube insights...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!insights) {
    return <p>No YouTube insights available.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-slate-900 mb-4">YouTube Analytics</h3>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(insights, null, 2)}</pre>
    </div>
  );
};

export default YouTubeInsights;
