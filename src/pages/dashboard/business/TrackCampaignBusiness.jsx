// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   ExternalLink, 
//   Image as ImageIcon,
// } from 'lucide-react';
// import Card from '../../../components/ui/Card';
// import Button from '../../../components/ui/Button';
// import { getTrackingDetailsForBusiness, updateBusinessApprovalStatus } from '../../../services/businessDashboard/tracking';

// const TrackCampaignBusiness = () => {
//   const { adId } = useParams();
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [businessStatus, setBusinessStatus] = useState(null);
//   const [businessMessage, setBusinessMessage] = useState('');
//   const [rejectionReason, setRejectionReason] = useState('');
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [isLoading, setIsLoading] = useState(true);
//   const [submissions, setSubmissions] = useState([]);
//   const [campaignName, setCampaignName] = useState('');
//   const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

//   useEffect(() => {
//     if (adId) {
//       fetchTrackingDetails(adId);
//     }
//   }, [adId]);

//   const fetchTrackingDetails = async (adId) => {
//     try {
//       setIsLoading(true);
//       const data = await getTrackingDetailsForBusiness(adId);
//       if (data) {
//         setBusinessStatus(data.businessStatus);
//         setBusinessMessage(data.businessMessage || '');
//         let normalizedSubmissions = [];
//         if (Array.isArray(data.submissions)) {
//           normalizedSubmissions = data.submissions;
//         } else if (data.submissions && typeof data.submissions === 'object') {
//           normalizedSubmissions = [data.submissions];
//         }
//         setSubmissions(normalizedSubmissions);
//         setCampaignName(data.campaignName || '');
//       } else {
//         setBusinessStatus(null);
//         setBusinessMessage('');
//         setSubmissions([]);
//         setCampaignName('');
//       }
//     } catch (error) {
//       console.error('Failed to fetch tracking details:', error);
//       setBusinessStatus(null);
//       setBusinessMessage('');
//       setSubmissions([]);
//       setCampaignName('');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusChange = async (submissionId, newStatus) => {
//     setCurrentSubmissionId(submissionId);
//     try {
//       // Ensure submissionId is string
//       const payload = {
//         businessStatus: newStatus,
//         businessMessage: '',
//       };
//       if (submissionId) {
//         payload.submissionId = submissionId.toString();
//       }
//       await updateBusinessApprovalStatus(adId, payload);
//       setSubmissions(prev =>
//         prev.map(sub =>
//           sub._id.toString() === submissionId.toString() ? { ...sub, status: newStatus, businessMessage: '' } : sub
//         )
//       );
//       setToastMessage('Status updated successfully!');
//       setToastType('success');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     } catch (error) {
//       setToastMessage('Failed to update status');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     } finally {
//       setCurrentSubmissionId(null);
//     }
//   };

//   const handleRejectClick = (submissionId) => {
//     setCurrentSubmissionId(submissionId);
//     setShowRejectionModal(true);
//   };

//   const handleRejectionSubmit = async () => {
//     if (!rejectionReason.trim()) {
//       setToastMessage('Please provide a reason for rejection');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }
//     try {
//       await updateBusinessApprovalStatus(adId, { submissionId: currentSubmissionId, businessStatus: 'rejected', businessMessage: rejectionReason });
//       setSubmissions(prev =>
//         prev.map(sub =>
//           sub._id === currentSubmissionId ? { ...sub, status: 'rejected', businessMessage: rejectionReason } : sub
//         )
//       );
//       setShowRejectionModal(false);
//       setRejectionReason('');
//       setToastMessage('Submission rejected');
//       setToastType('success');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     } catch (error) {
//       setToastMessage('Failed to reject submission');
//       setToastType('error');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     } finally {
//       setCurrentSubmissionId(null);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowImageModal(true);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'approved':
//         return <CheckCircle className="text-project-primary" size={20} />;
//       case 'declined':
//         return <XCircle className="text-project-primary" size={20} />;
//       case 'pending':
//         return <Clock className="text-project-primary" size={20} />;
//       case 'rejected':
//         return <XCircle className="text-red-600" size={20} />;
//       default:
//         return null;
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'approved':
//         return 'bg-project-primary-light text-project-primary-dark';
//       case 'declined':
//         return 'bg-project-primary-light text-project-primary-dark';
//       case 'pending':
//         return 'bg-project-primary-light text-project-primary-dark';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return '';
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { 
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric'
//     };
//     return date.toLocaleDateString('en-US', options);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Track Campaign Submissions</h1>
//         <p className="text-slate-600">Monitor and verify influencer content submissions</p>
//       </div>

//       {/* Campaign Name Display */}
//       <div className="mb-4 text-lg font-semibold text-slate-900">
//         Campaign: {campaignName || adId}
//       </div>

//       {/* Business Status */}
//       {businessStatus && (
//         <div className={`p-4 rounded-md mb-6 text-sm font-medium ${getStatusBadgeClass(businessStatus)}`}>
//           <div className="flex items-center gap-2">
//             {getStatusIcon(businessStatus)}
//             <span>{businessStatus.charAt(0).toUpperCase() + businessStatus.slice(1)}</span>
//           </div>
//           {businessMessage && <p className="mt-1">{businessMessage}</p>}
//         </div>
//       )}

//       {/* Submissions Grid */}
//       <div className="space-y-6">
//         {/* Pending Submissions */}
//         <div>
//           <h2 className="text-lg font-semibold text-slate-900">Pending Submissions</h2>
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {submissions && submissions.filter(sub => sub.status === 'pending').length > 0 ? (
//               submissions.filter(sub => sub.status === 'pending').map((submission, index) => {
//                 const status = submission.status || 'pending';
//                 const message = submission.businessMessage || '';
//                 return (
//                   <Card key={submission._id || index} className="p-5 border border-slate-300 shadow-md rounded-lg hover:shadow-lg transition-all duration-300 flex flex-col">
//                     <div className="flex justify-between items-center mb-3">
//                       <h3 className="text-lg font-semibold text-slate-900">Submission {index + 1}</h3>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(status)}`}>
//                         {getStatusIcon(status)}
//                         <span className="ml-1 capitalize">{status}</span>
//                       </span>
//                     </div>
//                     {submission.screenshot && (
//                       <img
//                         src={submission.screenshot}
//                         alt={`Submission ${index + 1} Screenshot`}
//                         className="mb-3 rounded-lg max-h-48 w-full object-cover cursor-pointer"
//                         onClick={() => handleImageClick(submission.screenshot)}
//                       />
//                     )}
//                     <div className="mb-3 flex-grow">
//                       <h4 className="font-medium text-slate-700 mb-1">Content Links:</h4>
//                       {submission.links && submission.links.length > 0 ? (
//                         submission.links.map((link, idx) => (
//                           <a
//                             key={idx}
//                             href={link.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block text-indigo-600 hover:text-indigo-800 truncate"
//                           >
//                             {link.platform}: {link.url}
//                           </a>
//                         ))
//                       ) : (
//                         <p className="text-slate-500">No content links provided</p>
//                       )}
//                     </div>
//                     {submission.notes && (
//                       <div>
//                         <h4 className="font-medium text-slate-700 mb-1">Notes:</h4>
//                         <p className="text-slate-600 whitespace-pre-wrap break-words">{submission.notes}</p>
//                       </div>
//                     )}
//                     <div className="flex gap-4 mt-4 items-center">
//                       <select
//                         value={submission.status || 'pending'}
//                         onChange={(e) => handleStatusChange(submission._id, e.target.value)}
//                         disabled={isLoading}
//                         className="border border-gray-300 rounded px-2 py-1"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="approved">Approved</option>
//                         <option value="declined">Declined</option>
//                         <option value="rejected">Rejected</option>
//                       </select>
//                       <Button
//                         variant="outline"
//                         onClick={() => handleRejectClick(submission._id)}
//                         disabled={isLoading}
//                         className="text-red-600 border-red-600 hover:bg-red-100"
//                       >
//                         Reject with Reason
//                       </Button>
//                     </div>
//                     {message && (
//                       <p className="mt-2 text-sm text-red-600 whitespace-pre-wrap">{message}</p>
//                     )}
//                   </Card>
//                 );
//               })
//             ) : (
//               <p className="text-slate-600 col-span-full">No pending submissions</p>
//             )}
//           </div>
//         </div>

//         {/* Completed Submissions */}
//         <div>
//           <h2 className="text-lg font-semibold text-slate-900">Submission History</h2>
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {submissions && submissions.filter(sub => sub.status !== 'pending').length > 0 ? (
//               submissions.filter(sub => sub.status !== 'pending').map((submission, index) => {
//                 const status = submission.status || 'pending';
//                 const message = submission.businessMessage || '';
//                 return (
//                   <Card key={submission._id || index} className="p-5 border border-slate-300 shadow-md rounded-lg hover:shadow-lg transition-all duration-300 flex flex-col">
//                     <div className="flex justify-between items-center mb-3">
//                       <h3 className="text-lg font-semibold text-slate-900">Submission {index + 1}</h3>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(status)}`}>
//                         {getStatusIcon(status)}
//                         <span className="ml-1 capitalize">{status}</span>
//                       </span>
//                     </div>
//                     {submission.screenshot && (
//                       <img
//                         src={submission.screenshot}
//                         alt={`Submission ${index + 1} Screenshot`}
//                         className="mb-3 rounded-lg max-h-48 w-full object-cover cursor-pointer"
//                         onClick={() => handleImageClick(submission.screenshot)}
//                       />
//                     )}
//                     <div className="mb-3 flex-grow">
//                       <h4 className="font-medium text-slate-700 mb-1">Content Links:</h4>
//                       {submission.links && submission.links.length > 0 ? (
//                         submission.links.map((link, idx) => (
//                           <a
//                             key={idx}
//                             href={link.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block text-indigo-600 hover:text-indigo-800 truncate"
//                           >
//                             {link.platform}: {link.url}
//                           </a>
//                         ))
//                       ) : (
//                         <p className="text-slate-500">No content links provided</p>
//                       )}
//                     </div>
//                     {submission.notes && (
//                       <div>
//                         <h4 className="font-medium text-slate-700 mb-1">Notes:</h4>
//                         <p className="text-slate-600 whitespace-pre-wrap break-words">{submission.notes}</p>
//                       </div>
//                     )}
//                     <div className="flex gap-4 mt-4 items-center">
//                       <select
//                         value={submission.status || 'pending'}
//                         onChange={(e) => handleStatusChange(submission._id, e.target.value)}
//                         disabled={isLoading}
//                         className="border border-gray-300 rounded px-2 py-1"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="approved">Approved</option>
//                         <option value="declined">Declined</option>
//                         <option value="rejected">Rejected</option>
//                       </select>
//                       <Button
//                         variant="outline"
//                         onClick={() => handleRejectClick(submission._id)}
//                         disabled={isLoading}
//                         className="text-red-600 border-red-600 hover:bg-red-100"
//                       >
//                         Reject with Reason
//                       </Button>
//                     </div>
//                     {message && (
//                       <p className="mt-2 text-sm text-red-600 whitespace-pre-wrap">{message}</p>
//                     )}
//                   </Card>
//                 );
//               })
//             ) : (
//               <p className="text-slate-600 col-span-full">No submissions yet</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Rejection Modal */}
//       <AnimatePresence>
//         {showRejectionModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="w-full max-w-md"
//             >
//               <Card className="p-6">
//                 <h3 className="mb-4 text-lg font-semibold text-slate-900">Reject Submission</h3>
//                 <textarea
//                   value={rejectionReason}
//                   onChange={(e) => setRejectionReason(e.target.value)}
//                   placeholder="Please provide a reason for rejection..."
//                   className="mb-4 w-full rounded-xl border border-slate-300 p-3 focus:border-project-primary focus:outline-none focus:ring-2 focus:ring-project-primary"
//                   rows={4}
//                 />
//                 <div className="flex justify-end space-x-3">
//                   <Button variant="outline" onClick={() => setShowRejectionModal(false)}>
//                     Cancel
//                   </Button>
//                   <Button variant="primary" onClick={handleRejectionSubmit} className="bg-project-primary hover:bg-project-primary-dark">
//                     Submit
//                   </Button>
//                 </div>
//               </Card>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Image Modal */}
//       <AnimatePresence>
//         {showImageModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
//             onClick={() => setShowImageModal(false)}
//           >
//             <motion.img
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               src={selectedImage}

//               alt="Submission Screenshot"
//               className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Toast Notification */}
//       <AnimatePresence>
//         {showToast && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className={`fixed bottom-4 right-4 z-50 rounded-lg px-6 py-3 shadow-lg ${
//               toastType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}
//           >
//             {toastMessage}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default TrackCampaignBusiness;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Image as ImageIcon,
  Eye,
  MessageSquare,
  Calendar,
  Link as LinkIcon
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { getTrackingDetailsForBusiness, updateBusinessApprovalStatus } from '../../../services/businessDashboard/tracking';

const TrackCampaignBusiness = () => {
  const { adId } = useParams();
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [businessStatus, setBusinessStatus] = useState(null);
  const [businessMessage, setBusinessMessage] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

  useEffect(() => {
    if (adId) {
      fetchTrackingDetails(adId);
    }
  }, [adId]);

  const fetchTrackingDetails = async (adId) => {
    try {
      setIsLoading(true);
      const data = await getTrackingDetailsForBusiness(adId);
      if (data) {
        setBusinessStatus(data.businessStatus);
        setBusinessMessage(data.businessMessage || '');
        let normalizedSubmissions = [];
        if (Array.isArray(data.submissions)) {
          normalizedSubmissions = data.submissions;
        } else if (data.submissions && typeof data.submissions === 'object') {
          normalizedSubmissions = [data.submissions];
        }
        setSubmissions(normalizedSubmissions);
        setCampaignName(data.campaignName || '');
      } else {
        setBusinessStatus(null);
        setBusinessMessage('');
        setSubmissions([]);
        setCampaignName('');
      }
    } catch (error) {
      console.error('Failed to fetch tracking details:', error);
      setBusinessStatus(null);
      setBusinessMessage('');
      setSubmissions([]);
      setCampaignName('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (submissionId, newStatus) => {
    setCurrentSubmissionId(submissionId);
    try {
      const payload = {
        businessStatus: newStatus,
        businessMessage: '',
      };
      if (submissionId) {
        payload.submissionId = submissionId.toString();
      }
      await updateBusinessApprovalStatus(adId, payload);
      setSubmissions(prev =>
        prev.map(sub =>
          sub._id.toString() === submissionId.toString() ? { ...sub, status: newStatus, businessMessage: '' } : sub
        )
      );
      setToastMessage('Status updated successfully!');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage('Failed to update status');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setCurrentSubmissionId(null);
    }
  };

  const handleRejectClick = (submissionId) => {
    setCurrentSubmissionId(submissionId);
    setShowRejectionModal(true);
  };

  const handleRejectionSubmit = async () => {
    if (!rejectionReason.trim()) {
      setToastMessage('Please provide a reason for rejection');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      await updateBusinessApprovalStatus(adId, { submissionId: currentSubmissionId, businessStatus: 'rejected', businessMessage: rejectionReason });
      setSubmissions(prev =>
        prev.map(sub =>
          sub._id === currentSubmissionId ? { ...sub, status: 'rejected', businessMessage: rejectionReason } : sub
        )
      );
      setShowRejectionModal(false);
      setRejectionReason('');
      setToastMessage('Submission rejected');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage('Failed to reject submission');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setCurrentSubmissionId(null);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-orange-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'declined':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const SubmissionCard = ({ submission, index, isPending = false }) => {
    const status = submission.status || 'pending';
    const message = submission.businessMessage || '';

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Submission #{index + 1}</h3>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(status)}`}>
              {getStatusIcon(status)}
              <span className="capitalize">{status}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Screenshot */}
          {submission.screenshot && (
            <div className="relative group">
              <img
                src={submission.screenshot}
                alt={`Submission ${index + 1} Screenshot`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform group-hover:scale-[1.02]"
                onClick={() => handleImageClick(submission.screenshot)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )}

          {/* Content Links */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LinkIcon className="w-4 h-4 text-slate-500" />
              <h4 className="font-medium text-slate-700">Content Links</h4>
            </div>
            {submission.links && submission.links.length > 0 ? (
              <div className="space-y-2">
                {submission.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                  >
                    <span className="text-sm font-medium text-slate-600">{link.platform}:</span>
                    <span className="text-sm text-primary-600 group-hover:text-primary-700 truncate flex-1">{link.url}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No content links provided</p>
            )}
          </div>

         {/* Notes */}
{submission.notes && (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <MessageSquare className="w-4 h-4 text-slate-500" />
      <h4 className="font-medium text-slate-700">Notes</h4>
    </div>
    <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg break-words whitespace-pre-wrap border border-slate-200">
      {submission.notes}
    </div>
  </div>
)}

         {/* Business Message */}
     {message && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-2">
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-4.25a.75.75 0 11-1.5 0v-1.5a.75.75 0 111.5 0v1.5zm0-6a.75.75 0 10-1.5 0v3a.75.75 0 001.5 0V7.75z"
          clipRule="evenodd"
        />
      </svg>
      <h5 className="text-sm font-semibold text-red-800">Rejection Reason</h5>
    </div>
    <div className="text-sm text-red-700 break-words whitespace-pre-wrap">
      {message}
    </div>
  </div>
)}

        </div>

        {/* Actions */}
        {isPending && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="flex gap-3">
              <select
                value={submission.status || 'pending'}
                onChange={(e) => handleStatusChange(submission._id, e.target.value)}
                disabled={isLoading || currentSubmissionId === submission._id}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approve</option>
                <option value="declined">Decline</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRejectClick(submission._id)}
                disabled={isLoading || currentSubmissionId === submission._id}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const pendingSubmissions = submissions.filter(sub => sub.status === 'pending');
  const completedSubmissions = submissions.filter(sub => sub.status !== 'pending');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Campaign Submissions</h1>
        <p className="text-slate-600">Monitor and review influencer content submissions</p>
        {campaignName && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{campaignName}</span>
          </div>
        )}
      </div>

      {/* Campaign Status */}
      {businessStatus && (
        <Card className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStatusBadgeClass(businessStatus)}`}>
            {getStatusIcon(businessStatus)}
            <span className="font-medium capitalize">Campaign {businessStatus}</span>
          </div>
          {businessMessage && (
            <p className="mt-3 text-slate-600">{businessMessage}</p>
          )}
        </Card>
      )}

      {/* Pending Submissions */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-yellow-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Pending Review ({pendingSubmissions.length})
          </h2>
        </div>
        
        {pendingSubmissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingSubmissions.map((submission, index) => (
              <SubmissionCard 
                key={submission._id || index} 
                submission={submission} 
                index={index} 
                isPending={true}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Pending Submissions</h3>
            <p className="text-slate-500">All submissions have been reviewed</p>
          </Card>
        )}
      </div>

      {/* Completed Submissions */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Submission History ({completedSubmissions.length})
          </h2>
        </div>
        
        {completedSubmissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {completedSubmissions.map((submission, index) => (
              <SubmissionCard 
                key={submission._id || index} 
                submission={submission} 
                index={index} 
                isPending={false}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Submissions Yet</h3>
            <p className="text-slate-500">Submissions will appear here once influencers start submitting content</p>
          </Card>
        )}
      </div>

      {/* Rejection Modal */}
      <AnimatePresence>
        {showRejectionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Reject Submission</h3>
                <p className="text-slate-600 mb-4">Please provide a reason for rejecting this submission:</p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  rows={4}
                />
                <div className="flex justify-end gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowRejectionModal(false);
                      setRejectionReason('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleRejectionSubmit}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Reject Submission
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Submission Screenshot"
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg border ${
              toastType === 'success' 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {toastType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackCampaignBusiness;