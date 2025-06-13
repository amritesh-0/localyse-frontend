import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Users, Calendar } from 'lucide-react';
import Card from '../../../components/ui/Card';

const Overview = () => {
  const stats = [
    {
      title: 'Total Ads',
      value: '120',
      change: '+10',
      icon: <Calendar className="text-primary-500" />,
    },
    {
      title: 'Active Ads',
      value: '45',
      change: '+5',
      icon: <Users className="text-secondary-500" />,
    },
    {
      title: 'Engagement',
      value: '75%',
      change: '+3%',
      icon: <TrendingUp className="text-accent-500" />,
    },
    {
      title: 'Total Spend',
      value: '$12,500',
      change: '+$1,200',
      icon: <BarChart className="text-primary-500" />,
    },
  ];

  const campaignActivity = [
    {
      campaign: 'Summer Sale',
      influencer: 'Sarah Wilson',
      status: 'Active',
      performance: 'Above Target',
    },
    {
      campaign: 'Back to School',
      influencer: 'Michael Chen',
      status: 'Active',
      performance: 'On Target',
    },
    {
      campaign: 'Holiday Promo',
      influencer: 'Emma Johnson',
      status: 'Pending',
      performance: 'Not Started',
    },
    {
      campaign: 'Winter Clearance',
      influencer: 'David Brown',
      status: 'Draft',
      performance: 'Not Started',
    },
  ];

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
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Influencer</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase text-slate-500">Performance</th>
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
                      {activity.performance}
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
