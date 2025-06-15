import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Application } from '../../../services/businessDashboard/applications';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Instagram,
  Search,
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import * as applicationsService from '../../../services/businessDashboard/applications';

const BusinessApplications: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadApplications = async () => {
      const data = await applicationsService.fetchApplications();
      if (data.success) {
        // Deduplicate by _id before setting state
        const uniqueApps = data.applications.filter((app, index, self) =>
          index === self.findIndex(t => t._id === app._id)
        );
        setApplications(uniqueApps);
        setFilteredApplications(uniqueApps);
      } else {
        showToastHandler('Failed to load applications', 'error');
      }
    };
    loadApplications();
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        ((app.influencerOnboarding?.fullName && app.influencerOnboarding?.fullName.toLowerCase().includes(lowerSearch)) ||
         (app.ad?.campaignName && app.ad.campaignName.toLowerCase().includes(lowerSearch)))
      );
    }

    if (sortBy === 'newest') {
      filtered = filtered.sort((a, b) => (b.deadline ?? '').localeCompare(a.deadline ?? ''));
    } else if (sortBy === 'oldest') {
      filtered = filtered.sort((a, b) => (a.deadline ?? '').localeCompare(b.deadline ?? ''));
    } else if (sortBy === 'followers') {
      filtered = filtered.sort((a, b) => {
        const bFollowers = (b.influencerOnboarding?.instagramInsights?.followers_count ?? (b.influencer as any)?.followers) ?? 0;
        const aFollowers = (a.influencerOnboarding?.instagramInsights?.followers_count ?? (a.influencer as any)?.followers) ?? 0;
        return bFollowers - aFollowers;
      });
    }

    setFilteredApplications(filtered);
  }, [applications, statusFilter, searchTerm, sortBy]);

  const showToastHandler = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAccept = async (applicationId: string) => {
    const data = await applicationsService.acceptApplication(applicationId);
    if (data.success) {
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: 'accepted' } : app
        )
      );
      showToastHandler('Application accepted successfully!', 'success');
    } else {
      showToastHandler('Failed to accept application', 'error');
    }
  };

  const handleReject = async (applicationId: string) => {
    const data = await applicationsService.declineApplication(applicationId);
    if (data.success) {
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: 'rejected' } : app
        )
      );
      showToastHandler('Application rejected.', 'success');
    } else {
      showToastHandler('Failed to reject application', 'error');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram size={16} className="text-pink-500" />;
      case 'youtube': return <TrendingUp size={16} className="text-red-500" />;
      case 'facebook': return <TrendingUp size={16} className="text-blue-600" />;
      case 'twitter': return <TrendingUp size={16} className="text-sky-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      icon: <Users className="text-primary-500" />,
      color: 'bg-primary-50'
    },
    {
      title: 'Pending Review',
      value: applications.filter(app => app.status === 'pending').length,
      icon: <Clock className="text-yellow-500" />,
      color: 'bg-yellow-50'
    },
    {
      title: 'Accepted',
      value: applications.filter(app => app.status === 'accepted').length,
      icon: <CheckCircle className="text-green-500" />,
      color: 'bg-green-50'
    },
    {
      title: 'Total Reach',
      value: formatNumber(applications.reduce((sum, app) => sum + (app.influencerOnboarding?.instagramInsights?.followers_count ?? 0), 0)),
      icon: <TrendingUp className="text-blue-500" />,
      color: 'bg-blue-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Influencer Applications</h1>
        <p className="text-slate-600">
          Review and manage applications from influencers for your campaigns
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="flex items-center p-4 sm:p-6">
              <div className={`mr-4 rounded-full ${stat.color} p-3`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search influencers or campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-0 sm:space-x-3 items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="followers">Most Followers</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApplications.length === 0 ? (
          <Card className="p-12 text-center">
            <Users size={48} className="mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-700">No applications found</h3>
            <p className="text-slate-500">Try adjusting your filters or search keyword.</p>
          </Card>
        ) : (
          filteredApplications.map(app => (
            <Card key={app._id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={(app as any).influencerOnboarding?.instagramInsights?.profile_picture_url || 'https://via.placeholder.com/150'}
                    alt={(app as any).influencerOnboarding?.fullName || 'Influencer'}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{(app as any).influencerOnboarding?.fullName}</h3>
                    <p className="text-sm text-slate-500 flex items-center space-x-1">
                      <a
                        href={`https://instagram.com/${(app as any).influencerOnboarding?.instagramInsights?.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline flex items-center space-x-1"
                      >
                        <Instagram size={14} />
                        <span>{(app as any).influencerOnboarding?.instagramInsights?.username || 'username'}</span>
                      </a>
                     <span> • </span>
                      <span>{(app as any).influencerOnboarding?.instagramInsights?.followers_count ? formatNumber((app as any).influencerOnboarding?.instagramInsights?.followers_count) : 'N/A'} followers</span>
                      <span>•</span>
                      <span>{(app as any).influencerOnboarding?.city}, {(app as any).influencerOnboarding?.state}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(app.status ?? '')}`}>
                  {getStatusIcon(app.status ?? '')} {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : ''}
                </span>
              </div>
              <div>
                <p className="text-slate-700 text-sm">{app.message}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span><strong>Campaign:</strong> {app.ad?.campaignName}</span>
                  <span><strong>Deadline:</strong> {app.ad && (app.ad as any).endDate ? new Date((app.ad as any).endDate).toLocaleDateString() : ''}</span>
                  <span><strong>Budget:</strong> {app.ad && (app.ad as any).budget != null ? `$${(app.ad as any).budget}` : 'barter'}</span>
                  <span className="flex space-x-2 items-center">
                    {app.ad && (app.ad as any).platforms?.map((p: string) => (
                      <span key={p}>{getPlatformIcon(p)}</span>
                    ))}
                  </span>
                </div>
                {app.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => handleAccept(app._id)} className="bg-green-500 text-white">Accept</Button>
                    <Button onClick={() => handleReject(app._id)} className="bg-red-500 text-white">Reject</Button>
                  </div>
                )}
                {app.status === 'accepted' && (
                  <div>
                    <Button
                      onClick={() => navigate(`/dashboard/business/track-campaign/${app.ad?._id || ''}`)}
                      variant="primary"
                      className=""
                    >
                      Track Ads
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BusinessApplications;
