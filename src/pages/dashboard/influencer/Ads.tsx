import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, DollarSign, CheckCircle, XCircle,
  AlertCircle, Tag, Calendar, List
} from 'lucide-react';

import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import type { Ad } from '../../../services/influencerDashboard/availableAds';
import * as availableAdsService from '../../../services/influencerDashboard/availableAds';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`rounded-lg p-4 shadow-lg ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <div className="flex items-center space-x-2">
          {type === 'success' ? (
            <CheckCircle size={20} className="text-green-600" />
          ) : (
            <XCircle size={20} className="text-red-600" />
          )}
          <p className={`font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const InfluencerAds = () => {
  const [availableAds, setAvailableAds] = useState<Ad[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const userId = localStorage.getItem('userId') ?? '';

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await availableAdsService.fetchAvailableAds();
        if (data.success) {
          const userId = localStorage.getItem('userId') ?? '';
          const adsWithAppliedFlag = data.ads.map((ad: any) => {
            const appliedInfluencers = ad.appliedInfluencers?.map((id: any) => id.toString()) || [];
            // Use the hasApplied flag from backend if present, else fallback to checking appliedInfluencers
            const hasAppliedFlag = ad.hasApplied !== undefined ? ad.hasApplied : appliedInfluencers.includes(userId);
            return {
              ...ad,
              appliedInfluencers,
              isApplied: hasAppliedFlag,
              hasApplied: hasAppliedFlag,
            };
          });
          setAvailableAds(adsWithAppliedFlag);
        } else {
          showToast('Failed to load ads', 'error');
        }
      } catch (error) {
        showToast('Error loading ads', 'error');
      }
    };
    loadAds();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApply = async (adId: string) => {
    try {
      const data = await availableAdsService.applyForAd(adId);
      if (data.success) {
        setAvailableAds((prevAds) =>
          prevAds.map((ad: any) =>
            ad._id === adId
              ? {
                  ...ad,
                  appliedInfluencers: [...(ad.appliedInfluencers || []), userId],
                  isApplied: true,
                  hasApplied: true,
                }
              : ad
          )
        );
        showToast('Successfully applied for campaign!', 'success');
      } else {
        showToast('Failed to apply for campaign', 'error');
      }
    } catch (error) {
      showToast('Error applying for campaign', 'error');
    }
  };

  const handleReject = async (adId: string) => {
    try {
      const data = await availableAdsService.markAdNotInterested(adId);
      if (data.success) {
        setAvailableAds((prev: any) => prev.filter((ad: any) => ad._id !== adId));
        showToast('Campaign removed from your feed', 'success');
      } else {
        showToast('Failed to remove campaign', 'error');
      }
    } catch (error) {
      showToast('Error removing campaign', 'error');
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Available Campaigns</h1>
        <p className="text-slate-600 mb-6">
          Discover and apply for campaigns that match your profile
        </p>
      </div>

      <Card className="flex flex-wrap items-center gap-4 p-4 mb-6">
        <select className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Food & Beverage</option>
          <option>Fashion & Beauty</option>
          <option>Health & Fitness</option>
          <option>Technology</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Budgets</option>
          <option>$0 - $500</option>
          <option>$501 - $1000</option>
          <option>$1001+</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Durations</option>
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>1 Month</option>
        </select>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableAds.map((ad, index) => {
          const isApplied = ad.hasApplied;
          return (
            <motion.div
              key={ad._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden shadow-lg rounded-lg">
                <div className="relative h-52">
                  {ad.image ? (
                    <img
                      src={ad.image?.url}
                      alt={ad.campaignName}
                      className="h-full w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white truncate">
                      {ad.campaignName}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm text-slate-700 line-clamp-3">{ad.campaignDescription}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Tag size={14} /> Platforms: {ad.platforms.join(', ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <List size={14} /> Tasks: {ad.taskCount}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <strong>Type:</strong> {ad.barterOrPaid}
                    </span>
                    {ad.barterOrPaid === 'paid' && (
                      <span className="flex items-center gap-1 text-green-600">
                        <DollarSign size={14} /> ${ad.budget?.toLocaleString()}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(ad.startDate)} - {formatDate(ad.endDate)}
                    </span>
                  </div>

                  {ad.requirements && (
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-slate-900">Requirements:</h4>
                      <p className="text-sm text-slate-600 whitespace-pre-line">{ad.requirements}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 mt-4 max-w-full overflow-hidden">
                    <Button
                      variant="primary"
                      className="flex-1 min-w-0"
                      onClick={() => handleApply(ad._id)}
                      icon={isApplied ? <CheckCircle size={16} className="text-green-600" /> : <CheckCircle size={16} />}
                      disabled={isApplied}
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, pointerEvents: isApplied ? 'none' : 'auto' }}
                    >
                      {isApplied ? 'Applied' : 'Apply'}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 min-w-0"
                      onClick={() => handleReject(ad._id)}
                      icon={<XCircle size={16} className={isApplied ? 'text-gray-400' : ''} />}
                      disabled={isApplied}
                      hidden={isApplied}
                      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, pointerEvents: isApplied ? 'none' : 'auto' }}
                    >
                      Not Interested
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default InfluencerAds;
