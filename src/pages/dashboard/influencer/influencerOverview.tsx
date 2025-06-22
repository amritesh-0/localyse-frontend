
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Users, Calendar } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { fetchInfluencerOverview } from '../../../services/influencerDashboard/overview';

const Overview = () => {
  const [stats, setStats] = useState([]);
  const [campaignActivity, setCampaignActivity] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        setLoading(true);
        const data = await fetchInfluencerOverview();
        setStats([
          {
            title: 'Active Campaigns',
            value: data.stats.activeCampaigns,
            // change: '+3', // You can calculate or fetch real change data
            icon: <Calendar className="text-primary-500" />,
          },
          {
            title: 'Total Ad Requests',
            value: data.stats.totalAdRequests,
            // change: '+15%', // You can calculate or fetch real change data
            icon: <Users className="text-secondary-500" />,
          },
          {
            title: 'Engagement Rate',
            value: `${data.stats.engagementRate}%`,
            // change: '+0.6%', // You can calculate or fetch real change data
            icon: <TrendingUp className="text-accent-500" />,
          },
          {
            title: 'Total Revenue',
            value: `$${data.stats.totalRevenue}`,
            // change: '+0.4', // You can calculate or fetch real change data
            icon: <BarChart className="text-primary-500" />,
          },
        ]);
        setCampaignActivity(data.campaignActivity);
        setRecentActivities(data.recentActivities);
        setError(null);
      } catch (err) {
        setError('Failed to load overview data');
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  if (loading) {
    return <div>Seat relax! Creating overview for you...</div>;
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
                {stat.icon}
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
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Business</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Budget</th>
                </tr>
              </thead>
              <tbody>
                {campaignActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-slate-200 last:border-0">
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-slate-900">
                      {activity.campaign}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-sm text-slate-600">
                      {activity.business}
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

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">Recent Activities</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex">
                <div className="mr-4 mt-1 h-2 w-2 rounded-full bg-primary-500"></div>
                <div>
                  <p className="text-sm text-slate-600">{activity.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(activity.time).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;

