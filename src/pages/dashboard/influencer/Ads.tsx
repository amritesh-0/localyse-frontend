import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, CheckCircle, XCircle,
  AlertCircle, Calendar,
  IndianRupee
} from 'lucide-react';

import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import type { Ad } from '../../../services/influencerDashboard/availableAds';

interface AdWithStatus extends Ad {
  applicationStatus?: string;
  hasApplied?: boolean;
}
import * as availableAdsService from '../../../services/influencerDashboard/availableAds';
import * as applicationsService from '../../../services/influencerDashboard/availableAds';

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
  const [availableAds, setAvailableAds] = useState<AdWithStatus[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [currentAdId, setCurrentAdId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [actionType, setActionType] = useState<'apply' | 'reject' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>('All Budgets');
  const [selectedStatus, setSelectedStatus] = useState<string>('Status');
  const userId = localStorage.getItem('userId') ?? '';

  // Function to fetch ads and applications and merge status
  const loadAdsAndApplications = async () => {
    try {
        const adsData = await availableAdsService.fetchAvailableAds();
        // console.log('adsData:', adsData);
        const appsData = await applicationsService.fetchApplications();
        // console.log('appsData:', appsData);
        if (adsData.success && appsData.success) {
          // Map applications by adId for quick lookup
          const appMap = new Map();
          appsData.applications.forEach((app: any) => {
            appMap.set(app.ad._id, app);
          });
          // Merge application status into ads
          const adsWithStatus = adsData.ads.map((ad: any) => {
            const application = appMap.get(ad._id);
            let status = 'none';
            if (application) {
              status = application.status.toLowerCase(); // normalize status string
            }
            return {
              ...ad,
              applicationStatus: status,
              hasApplied: status !== 'none' && status !== 'rejected',
            };
          });
          console.log('adsWithStatus:', adsWithStatus);
          setAvailableAds(adsWithStatus);
          setApplications(appsData.applications);
        } else {
          showToast('Failed to load ads or applications', 'error');
        }
    } catch (error) {
      showToast('Error loading ads or applications', 'error');
    }
  };

  useEffect(() => {
    loadAdsAndApplications();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openMessagePopup = (adId: string, type: 'apply' | 'reject') => {
    setCurrentAdId(adId);
    setActionType(type);
    setMessage('');
    setShowMessagePopup(true);
  };

  const closeMessagePopup = () => {
    setShowMessagePopup(false);
    setCurrentAdId(null);
    setActionType(null);
    setMessage('');
    setIsSubmitting(false);
  };

  const handleSubmitMessage = async () => {
    if (!currentAdId || !actionType) {
      showToast('Invalid action', 'error');
      return;
    }
    if (!message.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      let data;
      if (actionType === 'apply') {
        data = await availableAdsService.applyForAd(currentAdId, message);
      } else {
        data = await availableAdsService.markAdNotInterested(currentAdId, message);
      }
      if (data.success) {
        await loadAdsAndApplications();
        showToast(actionType === 'apply' ? 'Successfully applied for campaign!' : 'Campaign removed from your feed', 'success');
        closeMessagePopup();
      } else {
        showToast('Failed to submit message', 'error');
        setIsSubmitting(false);
      }
    } catch (error) {
      showToast('Error submitting message', 'error');
      setIsSubmitting(false);
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

  // Filtering logic based on selectedBudget and selectedStatus
  const filteredAds = availableAds.filter((ad) => {
    let budgetMatch = true;
    let statusMatch = true;

    // Budget filter
    if (selectedBudget === '₹0 - ₹500') {
      budgetMatch = ad.budget !== undefined && ad.budget >= 0 && ad.budget <= 500;
    } else if (selectedBudget === '₹501 - ₹2000') {
      budgetMatch = ad.budget !== undefined && ad.budget >= 501 && ad.budget <= 2000;
    } else if (selectedBudget === '₹2001+') {
      budgetMatch = ad.budget !== undefined && ad.budget >= 2001;
    }

    // Status filter
    if (selectedStatus === 'Available') {
      statusMatch = ad.applicationStatus === 'none';
    } else if (selectedStatus === 'Requested') {
      statusMatch = ad.applicationStatus === 'pending';
    } else if (selectedStatus === 'Approved') {
      statusMatch = ad.applicationStatus === 'accepted';
    }

    return budgetMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Available Campaigns</h1>
        <p className="text-slate-600 mb-6">
          Discover and apply for campaigns that match your profile
        </p>
      </div>

      <Card className="flex flex-wrap items-center gap-4 p-4 mb-6">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-500" />
          <span className="text-sm text-slate-600">Sort by:</span>
        </div>
        <select
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedBudget}
          onChange={(e) => setSelectedBudget(e.target.value)}
        >
          <option>All Budgets</option>
          <option>₹0 - ₹500</option>
          <option>₹501 - ₹2000</option>
          <option>₹2001+</option>
        </select>
        <select
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option>Status</option>
          <option>Available</option>
          <option>Requested</option>
          <option>Approved</option>
        </select>
      </Card>

      {filteredAds.length === 0 ? (
        <div className="text-center text-slate-600 text-lg py-10">
          No available ads in your location right now.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAds.map((ad, index) => {
            const status = ad.applicationStatus;
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

                    <div className="flex flex-wrap gap-3 text-sm text-slate-900">
                      <span className="flex items-center gap-1">
                      <strong>Platforms:</strong> {ad.platforms.join(', ')}
                      </span>
                      <span className="flex items-center gap-1">
                       <strong>Post/Stories:</strong>{ad.taskCount}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <strong>Type:</strong> {ad.barterOrPaid}
                      </span>
                      {ad.barterOrPaid === 'paid' && (
                        <span className="flex items-center gap-1 text-green-600">
                          <IndianRupee size={14}/>{ad.budget?.toLocaleString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        <strong>Due: </strong>{formatDate(ad.endDate)}
                      </span>
                    </div>
      
                    {ad.requirements && (
                      <div>
                        <h3 className="mb-1 text-lg font-medium text-slate-900">Requirements:</h3>
                        <p className="text-sm text-slate-600 whitespace-pre-line">{ad.requirements}</p>
                      </div>
                    )}

                    <div className="flex space-x-3 mt-4 max-w-full overflow-hidden">
                    {(status === 'accepted') ? (
                        <Button
                          variant="primary"
                          className="flex-1 min-w-0"
                          onClick={() => {
                            // Navigate to track page
                            window.location.href = `/dashboard/influencer/track-campaign/${ad._id}`;
                          }}
                        >
                          Track Ads
                        </Button>
                      ) : (status === 'pending' || (status === 'none' && ad.hasApplied)) ? (
                        <Button
                          variant="primary"
                          className="flex-1 min-w-0"
                          disabled
                          icon={<CheckCircle size={16} className="text-green-600" />}
                        >
                          Applied
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            className="flex-1 min-w-0"
                            onClick={() => openMessagePopup(ad._id, 'apply')}
                            icon={<CheckCircle size={16} />}
                            disabled={showMessagePopup && currentAdId === ad._id && isSubmitting}
                          >
                            Apply
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 min-w-0"
                            onClick={() => openMessagePopup(ad._id, 'reject')}
                            icon={<XCircle size={16} />}
                            disabled={showMessagePopup && currentAdId === ad._id && isSubmitting}
                          >
                            Not Interested
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )
    }
      {showMessagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4">
              {actionType === 'apply' ? 'Apply for Campaign' : 'Not Interested'}
            </h2>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
            />
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={closeMessagePopup}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmitMessage} disabled={isSubmitting} className="flex items-center justify-center">
          {isSubmitting ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : null}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default InfluencerAds;
