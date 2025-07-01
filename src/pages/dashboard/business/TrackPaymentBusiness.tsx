import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Hash, 
  MessageSquare,
  User,
  CreditCard,
  Eye,
  X,
  Image as ImageIcon,
  Download,
  Building,
  Calendar,
  IndianRupee
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { getUPIDetails } from '../../../services/sharedDashboard/upiApi';
import { getPaymentSubmissions, createPaymentSubmission } from '../../../services/sharedDashboard/paymentApi';
import { useParams } from 'react-router-dom';
import { getTrackingDetailsForBusiness } from '../../../services/businessDashboard/tracking';

interface ConnectedInfluencer {
  id: string;
  name: string;
  // username: string;
  // avatar: string;
  upiId: string;
  accountHolderName: string;
  campaignName: string;
  agreedAmount: number;
  currency: string;
}

interface PaymentSubmission {
  id: string;
  paymentNumber: number;
  amount: number;
  currency: string;
  proofFile: string;
  proofFileName: string;
  proofFileType: 'image' | 'pdf';
  transactionMessage: string;
  transactionId?: string;
  submittedOn: string;
  status: 'pending' | 'confirmed' | 'issue_reported';
  issueDescription?: string;
}

const TrackPaymentBusiness = () => {
  const [connectedInfluencer, setConnectedInfluencer] = useState<ConnectedInfluencer | null>(null);
  const [paymentSubmissions, setPaymentSubmissions] = useState<PaymentSubmission[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [dragActive, setDragActive] = useState(false);
  const [influencerId, setInfluencerId] = useState<string | null>(null);
  const [upiNotFound, setUpiNotFound] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    proofFile: null as File | null,
    transactionMessage: '',
    transactionId: ''
  });

  const { adId } = useParams();

  useEffect(() => {
    if (adId) {
      fetchInfluencerIdAndDetails();
    }
  }, [adId]);

  const fetchInfluencerIdAndDetails = async () => {
    try {
      const trackingData = await getTrackingDetailsForBusiness(adId);
      console.log('Tracking data:', trackingData);
      if (trackingData && trackingData.influencerId) {
        setInfluencerId(trackingData.influencerId);
        fetchInfluencerDetails(trackingData.influencerId);
        fetchPaymentSubmissions(trackingData.influencerId);
      } else {
        console.log('No influencerId found in tracking data');
      }
    } catch (err) {
      console.error('Error fetching tracking details:', err);
      setInfluencerId(null);
      setConnectedInfluencer(null);
      setPaymentSubmissions([]);
    }
  };

  const fetchInfluencerDetails = async (influencerId: string) => {
    try {
      const data = await getUPIDetails({ influencerId, adId });
      setConnectedInfluencer(prev => ({
        id: prev?.id || influencerId,
        name: prev?.name || data.accountHolderName || '',
        upiId: data.upiId || '',
        accountHolderName: data.accountHolderName || '',
        campaignName: prev?.campaignName || '',
        agreedAmount: prev?.agreedAmount || 0,
        currency: 'INR',
      }));
      setUpiNotFound(false);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setUpiNotFound(true);
      } else {
        setUpiNotFound(false);
      }
      setConnectedInfluencer(null);
      console.error('Error fetching UPI details:', err);
    }
  };

  useEffect(() => {
    if (adId) {
      const fetchTrackingData = async () => {
        try {
          const trackingData = await getTrackingDetailsForBusiness(adId);
          setConnectedInfluencer(prev => ({
            id: prev?.id || '',
            name: prev?.name || '',
            upiId: prev?.upiId || '',
            accountHolderName: prev?.accountHolderName || '',
            campaignName: trackingData.campaignName || '',
            agreedAmount: trackingData.budget || 0,
            currency: 'INR',
          }));
        } catch (err) {
          console.error('Error fetching tracking data:', err);
        }
      };
      fetchTrackingData();
    }
  }, [adId]);

  const fetchPaymentSubmissions = async (influencerId: string) => {
    try {
      const data = await getPaymentSubmissions({ influencerId, adId });
      setPaymentSubmissions(data);
    } catch (err) {
      setPaymentSubmissions([]);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          setFormData(prev => ({ ...prev, proofFile: file }));
        } else {
          showToastMessage('File size must be less than 10MB', 'error');
        }
      } else {
        showToastMessage('Please upload an image or PDF file', 'error');
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        if (file.size <= 10 * 1024 * 1024) {
          setFormData(prev => ({ ...prev, proofFile: file }));
        } else {
          showToastMessage('File size must be less than 10MB', 'error');
        }
      } else {
        showToastMessage('Please upload an image or PDF file', 'error');
      }
    }
  };

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      showToastMessage('Please enter a valid payment amount', 'error');
      return false;
    }
    if (!formData.proofFile) {
      showToastMessage('Please upload payment proof', 'error');
      return false;
    }
    if (!formData.transactionMessage.trim()) {
      showToastMessage('Please provide a transaction message', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !influencerId) return;
    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('ad', adId || '');
      uploadFormData.append('influencer', influencerId);
      uploadFormData.append('amount', formData.amount);
      uploadFormData.append('currency', 'INR');
      uploadFormData.append('transactionMessage', formData.transactionMessage);
      if (formData.transactionId) {
        uploadFormData.append('transactionId', formData.transactionId);
      }
      if (formData.proofFile) {
        uploadFormData.append('proofFile', formData.proofFile);
      }

      await createPaymentSubmission(uploadFormData);
      fetchPaymentSubmissions(influencerId);
      setFormData({ amount: '', proofFile: null, transactionMessage: '', transactionId: '' });
      showToastMessage('Payment proof submitted successfully!', 'success');
    } catch (error) {
      showToastMessage('Failed to submit payment proof', 'error');
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
        return 'Pending Confirmation';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (upiNotFound) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="p-8 max-w-md mx-auto text-center">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">UPI Details Not Found</h2>
          <p className="text-slate-600 mb-4">
            This influencer has not added their UPI details yet.<br />
            Kindly wait till they set up their UPI to enable payments.
          </p>
        </Card>
      </div>
    );
  }

  if (!connectedInfluencer) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Clock size={48} className="mx-auto mb-4 text-slate-400 animate-spin" />
          <p className="text-slate-600">Payment details on the way...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Payment Tracking</h1>
        <p className="text-slate-600 mt-2">
          Upload payment proofs and track payment confirmations with your connected influencer
        </p>
      </div>

      {/* Connected Influencer Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <img
                src={connectedInfluencer.avatar}
                alt={connectedInfluencer.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              /> */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {connectedInfluencer.name}
                </h2>
                {/* <p className="text-slate-600">{connectedInfluencer.username}</p> */}
                <div className="flex flex-col mt-2 text-sm space-y-1">
                  <div className="flex items-center space-x-1">
                    <Building size={14} className="text-primary-600" />
                    <span className="text-slate-700">{connectedInfluencer.campaignName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* <IndianRupee size={14} className="text-green-600" /> */}
                    <span className="font-medium text-green-700">
                      Budget:
                      {' '}
                      {formatCurrency(connectedInfluencer.agreedAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-medium text-slate-700 mb-2">UPI Details</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <User size={14} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-900">
                    {connectedInfluencer.accountHolderName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard size={14} className="text-slate-500" />
                  <span className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded">
                    {connectedInfluencer.upiId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Payment Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Upload size={20} className="text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Upload Payment Proof</h2>
              <p className="text-slate-600">Submit payment #{paymentSubmissions.length + 1}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Amount */}
            <Input
              label="Payment Amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              icon={<IndianRupee size={18} className="text-slate-400" />}
              required
            />

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Payment Proof (Image or PDF) *
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-300 hover:border-primary-500 hover:bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                
                {formData.proofFile ? (
                  <div className="space-y-4">
                    {formData.proofFile.type.startsWith('image/') ? (
                      <div className="relative inline-block">
                        <img
                          src={URL.createObjectURL(formData.proofFile)}
                          alt="Payment proof preview"
                          className="max-w-xs max-h-48 rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, proofFile: null }))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3 bg-slate-100 rounded-lg p-4 max-w-xs mx-auto">
                        <FileText size={24} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">
                          {formData.proofFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, proofFile: null }))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <p className="text-sm text-slate-600">
                      File selected: {formData.proofFile.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload size={48} className="mx-auto text-slate-400" />
                    <div>
                      <p className="text-lg font-medium text-slate-700">
                        Drag and drop your payment proof here
                      </p>
                      <p className="text-slate-500">or click to browse files</p>
                    </div>
                    <p className="text-sm text-slate-400">
                      Supports: JPG, PNG, PDF (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction Message */}
            <div>
              <label htmlFor="transactionMessage" className="block text-sm font-medium text-slate-700 mb-2">
                Transaction Message *
              </label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3 top-3 text-slate-400" />
                <textarea
                  id="transactionMessage"
                  name="transactionMessage"
                  value={formData.transactionMessage}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe the payment details, campaign milestone, or any relevant information..."
                  required
                />
              </div>
            </div>

            {/* Transaction ID (Optional) */}
            <Input
              label="Transaction ID (Optional)"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              placeholder="TXN123456789"
              icon={<Hash size={18} className="text-slate-400" />}
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                icon={isSubmitting ? <Clock size={18} className="animate-spin" /> : <Send size={18} />}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-3"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Payment Proof'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Payment Submissions History */}
      {paymentSubmissions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Payment History</h2>
            <div className="text-sm text-slate-500">
              {paymentSubmissions.filter(p => p.status === 'pending').length} pending confirmation
            </div>
          </div>

          <div className="space-y-6">
            {paymentSubmissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">
                          Payment #{index + 1}
                        </h3>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Calendar size={16} />
                          <span>Submitted on {new Date(submission.submittedOn).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {formatCurrency(submission.amount)}
                        </div>
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span>{getStatusText(submission.status)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Payment Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Transaction Details</h4>
                          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                            {submission.transactionId && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Hash size={14} className="text-slate-400" />
                                <span className="text-slate-600">Transaction ID:</span>
                                <span className="font-mono text-slate-900 bg-white px-2 py-1 rounded">
                                  {submission.transactionId}
                                </span>
                              </div>
                            )}
                            <div className="text-sm">
                              <div className="flex items-start space-x-2">
                                <MessageSquare size={14} className="text-slate-400 mt-0.5" />
                                <div>
                                  <span className="text-slate-600">Message:</span>
                                  <p className="text-slate-900 mt-1">{submission.transactionMessage}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Proof */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Payment Proof</h4>
                        
                        {submission.proofFileType === 'image' ? (
                          <button
                            onClick={() => {
                              setSelectedImage(submission.proofFile);
                              setShowImageModal(true);
                            }}
                            className="relative group overflow-hidden rounded-lg border border-slate-200 hover:border-primary-300 transition-colors w-full"
                          >
                            <img
                              src={submission.proofFile}
                              alt="Payment proof"
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </button>
                        ) : (
                          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <FileText size={24} className="text-slate-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-700">{submission.proofFileName}</p>
                              <p className="text-xs text-slate-500">PDF Document</p>
                            </div>
                            <Button size="sm" variant="outline" icon={<Download size={14} />}>
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Issue Description (if any) */}
                    {submission.status === 'issue_reported' && submission.issueDescription && (
                      <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-red-800">Reported Issue</h4>
                            <p className="text-sm text-red-700 mt-1">{submission.issueDescription}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
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

export default TrackPaymentBusiness;