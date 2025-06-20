import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Users, Calendar } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { getOverviewData } from '../../../services/businessDashboard/overview';

const Overview = () => {
  const [stats, setStats] = useState([]);
  const [campaignActivity, setCampaignActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const data = await getOverviewData();
        setStats(data.stats);
        setCampaignActivity(data.campaignActivity);
        setLoading(false);
      } catch (err) {
        setError('Failed to load overview data');
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return <div>Seat relax! Loading overview...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600">
          Welcome back! Here's what's happening with your campaigns.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="flex items-center">
              <div className="mr-4 rounded-full bg-slate-100 p-3">
                {stat.title === 'Total Ads' && <Calendar className="text-primary-500" />}
                {stat.title === 'Active Ads' && <Users className="text-secondary-500" />}
                {stat.title === 'Engagement' && <TrendingUp className="text-accent-500" />}
                {stat.title === 'Total Spend' && <BarChart className="text-primary-500" />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-2xl font-bold text-slate-900">{stat.value}</h2>
                  <span className="text-xs font-medium text-green-600">{stat.change}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Campaign Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">Campaign Activity</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Campaign</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Influencer</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">budget</th>
                </tr>
              </thead>
              <tbody>
                {campaignActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-slate-200 last:border-0">
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-slate-900">
                      {activity.campaign}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-slate-600">
                      {activity.influencer}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          activity.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : activity.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-slate-600">
                      {activity.budget}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;
