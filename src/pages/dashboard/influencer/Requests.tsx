import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, DollarSign, MessageSquare } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { getRequestsForInfluencer, updateRequestStatus } from '../../../services/influencerDashboard/requestAds';
import { useNavigate } from 'react-router-dom';

const InfluencerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getRequestsForInfluencer();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await updateRequestStatus(requestId, 'accepted');
      setToastMessage('Campaign request accepted!');
      setToastType('success');
      setShowToast(true);
      fetchRequests();
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to accept request:', error);
      setToastMessage('Failed to accept request.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await updateRequestStatus(requestId, 'rejected');
      setToastMessage('Campaign request declined');
      setToastType('error');
      setShowToast(true);
      fetchRequests();
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to reject request:', error);
      setToastMessage('Failed to decline request.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Campaign Requests</h1>
        <p className="text-slate-600">
          Review and respond to campaign requests from businesses
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests.filter(r => r.status !== 'rejected').length === 0 ? (
          <p className="text-center text-slate-600">No campaign requests found.</p>
        ) : (
          requests.filter(r => r.status !== 'rejected').map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={request.ad.image?.url || ''}
                      alt={request.ad.campaignName || ''}
                      className="h-48 w-full object-cover md:h-full"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-slate-900">{request.ad.campaignName}</h3>
                      <p className="text-sm text-slate-600">{request.business.name || ''}</p>
                    </div>

                    <div className="mb-4 flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>Due: {new Date(request.ad.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 font-medium text-green-600">
                        <DollarSign size={16} />
                        <span>{request.ad.budget}</span>
                      </div>
                    </div>

                    <div className="mb-6 rounded-lg bg-slate-50 p-4">
                      <div className="flex items-start space-x-2">
                        <MessageSquare size={16} className="mt-1 text-slate-400" />
                        <p className="text-sm text-slate-600">{request.ad.campaignDescription}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {request.status === 'accepted' ? (
                        <>
                          <Button
                            variant="primary"
                            disabled
                            icon={<CheckCircle size={16} />}
                          >
                            Accepted
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => navigate(`/dashboard/influencer/track-campaign/${request.ad._id}`)}
                          >
                            Track Ads
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            onClick={() => handleAccept(request._id)}
                            icon={<CheckCircle size={16} />}
                            disabled={request.status !== 'pending'}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReject(request._id)}
                            icon={<XCircle size={16} />}
                            disabled={request.status !== 'pending'}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`rounded-lg p-4 shadow-lg ${
              toastType === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              {toastType === 'success' ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <XCircle size={20} className="text-red-600" />
              )}
              <p className={`font-medium ${
                toastType === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {toastMessage}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InfluencerRequests;
