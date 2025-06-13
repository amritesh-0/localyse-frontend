import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Upload,
  Link as LinkIcon,
  MessageSquare,
  Calendar,
  Send,
  AlertCircle,
  Image as ImageIcon,
  PlusCircle,
  Trash2
} from 'lucide-react';
import { getTrackingDetailsForInfluencer, submitTrackingDetails } from '../../../services/influencerDashboard/tracking';
import Loader from '../../../components/ui/Loader';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const PLATFORM_OPTIONS = [
  { value: 'instagram story', label: 'Instagram Story' },
  { value: 'instagram post', label: 'Instagram Post' },
  { value: 'instagram reels', label: 'Instagram Reels' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'youtube', label: 'YouTube' },
];

const TrackCampaignInfluencer = () => {
  const { adId } = useParams();
  const [campaignName, setCampaignName] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [formState, setFormState] = useState({
    links: [{ url: '', platform: '' }],
    description: '',
    screenshot: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTrackingDetailsForInfluencer(adId);
        setCampaignName(data.campaignName || 'Unnamed Campaign');
        setSubmissions(data.submissions || []);
      } catch (error) {
        console.error('Failed to fetch tracking details', error);
        setErrorMessage('Failed to load campaign data.');
      } finally {
        setLoading(false);
      }
    };
    if (adId) {
      fetchData();
    }
  }, [adId]);

  const handleInputChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleLinkChange = (index, field, value) => {
    setFormState(prev => {
      const newLinks = [...prev.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, links: newLinks };
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleAddLink = () => {
    setFormState(prev => ({
      ...prev,
      links: [...prev.links, { url: '', platform: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validate all links have url and platform
    for (let i = 0; i < formState.links.length; i++) {
      const link = formState.links[i];
      if (!link.url || !link.platform) {
        setErrorMessage('Please fill in all required fields for all links (URL and platform).');
        return;
      }
    }
    if (!formState.description) {
      setErrorMessage('Please fill in the description.');
      return;
    }

    setSubmitting(true);
    const submission = {
      links: formState.links,
      notes: formState.description,
      screenshot: formState.screenshot || '',
      status: 'pending',
      submittedAt: new Date(),
    };

    try {
      await submitTrackingDetails(adId, submission);
      setSuccessMessage('Submission successful!');
      setFormState({ links: [{ url: '', platform: '' }], description: '', screenshot: '' });
      // Refresh submissions
      const data = await getTrackingDetailsForInfluencer(adId);
      setSubmissions(data.submissions || []);

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrorMessage('Failed to submit. Please try again.');
      console.error('Submit error:', error);
    } finally {
      setSubmitting(false);
    }
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
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SubmissionCard = ({ submission, index }) => {
    const status = submission.status || 'pending';
    
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
          <p className="text-sm text-slate-500 mt-1">
            Submitted on {formatDate(submission.submittedAt)}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Screenshot */}
          {submission.screenshot && (
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <h4 className="font-medium text-slate-700">Screenshot</h4>
              </div>
              <img
                src={submission.screenshot}
                alt={`Submission ${index + 1} Screenshot`}
                className="w-full h-48 object-cover rounded-lg border border-slate-200"
              />
            </div>
          )}

          {/* Content Links */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LinkIcon className="w-4 h-4 text-slate-500" />
              <h4 className="font-medium text-slate-700">Content Links</h4>
            </div>
            {submission.links && submission.links.length > 0 ? (
              submission.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group mb-2"
                >
                  <span className="text-sm text-primary-600 group-hover:text-primary-700 truncate flex-1">
                    {link.url} ({link.platform})
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
                </a>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No links provided</p>
            )}
          </div>

          {/* Description */}
          {submission.notes && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <h4 className="font-medium text-slate-700">Description</h4>
              </div>
              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                {submission.notes}
              </p>
            </div>
          )}

          {/* Business Feedback */}
          {submission.businessMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-medium text-red-700">Feedback</h4>
              </div>
              <p className="text-sm text-red-700 whitespace-pre-wrap">
                {submission.businessMessage}
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Campaign Submissions</h1>
        <p className="text-slate-600">Submit your content and track approval status</p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{campaignName}</span>
        </div>
      </div>

      {/* Submission Form */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-semibold text-slate-900">Submit New Content</h2>
          <p className="text-slate-600 mt-1">Share your content link and provide details about your submission</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content Links */}
          {formState.links.map((link, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <LinkIcon className="w-4 h-4" />
                  Content Link *
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={e => handleLinkChange(index, 'url', e.target.value)}
                  placeholder="https://platform.com/p/your-post"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  Platform *
                </label>
                <select
                  value={link.platform}
                  onChange={e => handleLinkChange(index, 'platform', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="" disabled>Select platform</option>
                  {PLATFORM_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                {formState.links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormState(prev => {
                        const newLinks = prev.links.filter((_, i) => i !== index);
                        return { ...prev, links: newLinks };
                      });
                      if (errorMessage) setErrorMessage('');
                    }}
                    className="text-red-600 hover:text-red-800 p-2 rounded"
                    aria-label="Delete link"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                {index === formState.links.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="text-green-600 hover:text-green-800 p-2 rounded"
                    aria-label="Add link"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <MessageSquare className="w-4 h-4" />
              Description *
            </label>
            <textarea
              value={formState.description}
              onChange={e => handleInputChange('description', e.target.value)}
              placeholder="Describe your content, mention key points covered, engagement received, etc."
              required
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Upload className="w-4 h-4" />
              Screenshot URL (Optional)
            </label>
            <input
              type="url"
              value={formState.screenshot}
              onChange={e => handleInputChange('screenshot', e.target.value)}
              placeholder="https://example.com/screenshot.jpg"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1">
              Provide a direct link to a screenshot of your content for verification
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={submitting || formState.links.some(link => !link.url || !link.platform) || !formState.description}
            className="w-full"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Submit Content
              </span>
            )}
          </Button>

          {/* Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 font-medium">{successMessage}</p>
                </div>
              </motion.div>
            )}
            
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 font-medium">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Card>

      {/* Previous Submissions */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Your Submissions ({submissions.length})
          </h2>
        </div>
        
        {submissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((submission, index) => (
              <SubmissionCard 
                key={index} 
                submission={submission} 
                index={index} 
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Submissions Yet</h3>
            <p className="text-slate-500">Submit your first content using the form above</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackCampaignInfluencer;