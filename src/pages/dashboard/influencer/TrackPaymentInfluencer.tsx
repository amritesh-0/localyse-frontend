import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Eye,
  Shield,
  User,
  Hash,
  DollarSign,
  Calendar,
  Building,
  Download,
  ExternalLink,
  X,
  AlertCircle,
  IndianRupee
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import UPISetup from './UPIsetup';
import { getUPIDetails, upsertUPIDetails } from '../../../services/sharedDashboard/upiApi';
import { getPaymentSubmissions, updatePaymentStatus } from '../../../services/sharedDashboard/paymentApi';
import { useParams } from 'react-router-dom';

interface PaymentProof {
  _id: string;
  ad: string;
  campaignName: string;
  businessName: string;
  amount: number;
  currency: string;
  transactionId?: string;
  submittedOn: string;
  proofFile?: string;
  proofFileName?: string;
  proofFileType?: string;
  transactionMessage?: string;
  status: 'pending' | 'confirmed' | 'issue_reported';
  dueDate?: string;
  issueDescription?: string;
}

interface UPIDetails {
  upiId: string;
  accountHolderName: string;
  isVerified: boolean;
}

const TrackPaymentInfluencer = () => {
  const [upiDetails, setUpiDetails] = useState<UPIDetails | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentProof | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProofs, setPaymentProofs] = useState<PaymentProof[]>([]);
  const { adId } = useParams();

  useEffect(() => {
    if (adId) {
      fetchUPIDetails();
      fetchPaymentProofs();
    }
  }, [adId]);

  const fetchUPIDetails = async () => {
    try {
      const data = await getUPIDetails({ adId });
      setUpiDetails(data);
    } catch (err) {
      setUpiDetails(null);
    }
  };

  const fetchPaymentProofs = async () => {
    try {
      const data = await getPaymentSubmissions({ adId });
      setPaymentProofs(data);
    } catch (err) {
      setPaymentProofs([]);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleUPIUpdate = async (details: UPIDetails) => {
    try {
      await upsertUPIDetails({ ...details, adId });
      showToastMessage('UPI details saved successfully!', 'success');
      fetchUPIDetails();
    } catch (err) {
      showToastMessage('Failed to save UPI details', 'error');
    }
  };

  const handleConfirmPayment = async (paymentId: string) => {
    setIsSubmitting(true);
    try {
      await updatePaymentStatus(paymentId, 'confirmed', '', adId);
      showToastMessage('Payment confirmed successfully!', 'success');
      fetchPaymentProofs();
    } catch (error) {
      showToastMessage('Failed to confirm payment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReportIssue = async () => {
    if (!reportReason.trim()) {
      showToastMessage('Please describe the issue', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await updatePaymentStatus(selectedPayment?._id || '', 'issue_reported', reportReason, adId);
      setShowReportModal(false);
      setReportReason('');
      setSelectedPayment(null);
      showToastMessage('Issue reported successfully. Our team will investigate.', 'success');
      fetchPaymentProofs();
    } catch (error) {
      showToastMessage('Failed to report issue', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'issue_reported':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'issue_reported':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Payment Confirmed';
      case 'issue_reported':
        return 'Issue Reported';
      default:
        return 'Pending Verification';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-slate-900">Payment Tracking</h1>
        <p className="text-slate-600 mt-2">
          Manage your UPI details and track payment confirmations from businesses
        </p>
      </div>

      {/* UPI Setup Component */}
      <UPISetup 
        upiDetails={upiDetails}
        onUPIUpdate={handleUPIUpdate}
        showToast={showToastMessage}
      />

      {/* Payment Proofs Section */}
      {upiDetails && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <h2 className="text-2xl font-bold text-slate-900">Payment Confirmations</h2>
            <div className="text-sm text-slate-500">
              {paymentProofs.filter(p => p.status === 'pending').length} pending verification
            </div>
          </div>

          {paymentProofs.length === 0 ? (
            <Card className="p-12 text-center">
              <IndianRupee size={48} className="mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Payment Proofs Yet</h3>
              <p className="text-slate-600">
                Payment confirmations from businesses will appear here once they upload proof of payment.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {paymentProofs.map((payment, index) => (
                <motion.div
                  key={payment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 w-full">
                    <div className="p-0 w-full">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2 sm:gap-0 w-full">
                        <div className="w-full">
                          <h3 className="text-xl font-semibold text-slate-900 mb-1">
                            {payment.campaignName}
                          </h3>
                          <div className="flex items-center space-x-2 text-slate-600">
                            <Building size={16} />
                            <span>{payment.businessName}</span>
                          </div>
                        </div>
                        
                        <div className="text-right w-full sm:w-auto">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {formatCurrency(payment.amount, payment.currency)}
                          </div>
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                            {getStatusIcon(payment.status)}
                            <span>{getStatusText(payment.status)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="grid grid-cols-1 gap-6 w-full md:grid-cols-2 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar size={16} className="text-slate-400" />
                            <span className="text-slate-600">Payment Date:</span>
                            <span className="font-medium text-slate-900">
                              {new Date(payment.submittedOn).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {payment.transactionId && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Hash size={16} className="text-slate-400" />
                              <span className="text-slate-600">Transaction ID:</span>
                              <span className="font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
                                {payment.transactionId}
                              </span>
                            </div>
                          )}

                        </div>

                        {/* Payment Proof */}
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-3">Payment Proof</h4>
                          
                          {payment.proofFile && (
                            <div className="mb-3">
                              <button
                                onClick={() => {
                                  setSelectedImage(payment.proofFile || '');
                                  setShowImageModal(true);
                                }}
                                className="relative group overflow-hidden rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
                              >
                                <img
                                  src={payment.proofFile}
                                  alt="Payment proof"
                                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                  <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </button>
                            </div>
                          )}

                          {payment.proofFileName && payment.proofFile && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <FileText size={20} className="text-slate-500" />
                              <span className="text-sm font-medium text-slate-700 break-all flex-1">
                                {payment.proofFileName}
                              </span>
                              <div>
                                <a
                                  href={payment.proofFile}
                                  download={payment.proofFileName}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button size="sm" variant="outline" icon={<Download size={14} />}>Download</Button>
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      {payment.transactionMessage && (
                        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Message from Business</h4>
                          <p className="text-sm text-slate-600">{payment.transactionMessage}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {payment.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          <Button
                            onClick={() => handleConfirmPayment(payment._id)}
                            disabled={isSubmitting}
                            icon={<CheckCircle size={16} />}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          >
                            Confirm Payment Received
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowReportModal(true);
                            }}
                            icon={<AlertTriangle size={16} />}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            Report Issue
                          </Button>
                        </div>
                      )}

                      {payment.status === 'confirmed' && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle size={20} />
                          <span className="font-medium">Payment confirmed and processed</span>
                        </div>
                      )}

                      {payment.status === 'issue_reported' && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <AlertTriangle size={20} />
                          <span className="font-medium">Issue reported - Our team is investigating</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
              <img
                src={selectedImage}
                alt="Payment proof"
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {showReportModal && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Report Payment Issue</h3>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="rounded-full p-2 text-slate-600 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle size={16} className="text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Campaign: {selectedPayment.campaignName}</p>
                      <p className="text-sm text-red-700">Amount: {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="reportReason" className="block text-sm font-medium text-slate-700 mb-2">
                    Describe the issue *
                  </label>
                  <textarea
                    id="reportReason"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    rows={4}
                    className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please describe the payment issue in detail..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowReportModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReportIssue}
                    disabled={isSubmitting || !reportReason.trim()}
                    icon={isSubmitting ? <Clock size={16} className="animate-spin" /> : <AlertTriangle size={16} />}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isSubmitting ? 'Reporting...' : 'Report Issue'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 z-50 rounded-lg px-6 py-4 shadow-lg max-w-md ${
              toastType === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              {toastType === 'success' ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <AlertTriangle size={20} className="text-red-600" />
              )}
              <span className="font-medium">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackPaymentInfluencer;