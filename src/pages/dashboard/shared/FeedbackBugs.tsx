import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bug, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Star,
  Clock,
  Shield,
  Camera,
  X,
  Upload,
  FileText
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import feedbackBugsApi from '../../../services/sharedDashboard/feedbackBugsApi';

interface FeedbackFormData {
  type: 'bug' | 'feedback' | 'feature';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;
  browserInfo: string;
  screenshots: File[];
  contactEmail: string;
  allowContact: boolean;
}

const FeedbackBugs = () => {
  const [activeTab, setActiveTab] = useState<'bug' | 'feedback' | 'feature'>('bug');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [formData, setFormData] = useState<FeedbackFormData>({
    type: 'bug',
    priority: 'medium',
    title: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    browserInfo: navigator.userAgent,
    screenshots: [],
    contactEmail: '',
    allowContact: true
  });

  const tabs = [
    {
      id: 'bug' as const,
      label: 'Bug Report',
      icon: <Bug size={20} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'feedback' as const,
      label: 'General Feedback',
      icon: <MessageSquare size={20} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'feature' as const,
      label: 'Feature Request',
      icon: <Lightbulb size={20} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { value: 'high', label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { value: 'critical', label: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTabChange = (tab: 'bug' | 'feedback' | 'feature') => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, type: tab }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );
    
    if (validFiles.length !== files.length) {
      showToastMessage('Some files were skipped. Only images under 5MB are allowed.', 'error');
    }
    
    setFormData(prev => ({ 
      ...prev, 
      screenshots: [...prev.screenshots, ...validFiles].slice(0, 5) // Max 5 files
    }));
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
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );
    
    if (validFiles.length !== files.length) {
      showToastMessage('Some files were skipped. Only images under 5MB are allowed.', 'error');
    }
    
    setFormData(prev => ({ 
      ...prev, 
      screenshots: [...prev.screenshots, ...validFiles].slice(0, 5)
    }));
  };

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToastMessage('Please provide a title', 'error');
      return false;
    }
    if (!formData.description.trim()) {
      showToastMessage('Please provide a description', 'error');
      return false;
    }
    if (formData.type === 'bug' && !formData.stepsToReproduce.trim()) {
      showToastMessage('Please provide steps to reproduce the bug', 'error');
      return false;
    }
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      showToastMessage('Please provide a valid email address', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare FormData for multipart/form-data submission
      const formPayload = new FormData();
      formPayload.append('type', formData.type);
      formPayload.append('priority', formData.priority);
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('stepsToReproduce', formData.stepsToReproduce);
      formPayload.append('expectedBehavior', formData.expectedBehavior);
      formPayload.append('actualBehavior', formData.actualBehavior);
      formPayload.append('browserInfo', formData.browserInfo);
      formPayload.append('contactEmail', formData.contactEmail);
      formPayload.append('allowContact', formData.allowContact ? 'true' : 'false');

      // Append screenshots files
      formData.screenshots.forEach((file) => {
        formPayload.append('screenshots', file);
      });

      // Call API service to submit feedback with FormData
      await feedbackBugsApi.submitFeedback(formPayload, true);

      setIsSubmitted(true);
      showToastMessage('Your report has been submitted successfully!', 'success');

      // Reset form
      setFormData({
        type: activeTab,
        priority: 'medium',
        title: '',
        description: '',
        stepsToReproduce: '',
        expectedBehavior: '',
        actualBehavior: '',
        browserInfo: navigator.userAgent,
        screenshots: [],
        contactEmail: '',
        allowContact: true
      });

    } catch (error) {
      showToastMessage('Failed to submit report. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setActiveTab('bug');
    setFormData({
      type: 'bug',
      priority: 'medium',
      title: '',
      description: '',
      stepsToReproduce: '',
      expectedBehavior: '',
      actualBehavior: '',
      browserInfo: navigator.userAgent,
      screenshots: [],
      contactEmail: '',
      allowContact: true
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center p-12">
              <div className="mb-6">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Thank You!</h1>
                <p className="text-lg text-slate-600">Your report has been submitted successfully</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Shield size={24} className="text-green-600" />
                  <h2 className="text-xl font-semibold text-green-800">Our Promise</h2>
                </div>
                <p className="text-green-700 font-medium mb-2">
                  ⚡ We'll review your submission within 24 hours
                </p>
                <p className="text-green-700 font-medium">
                  🚀 Resolution target: Within 2 business days
                </p>
              </div>

              <div className="space-y-4 text-left bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-slate-900 flex items-center space-x-2">
                  <Clock size={18} className="text-primary-600" />
                  <span>What happens next?</span>
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">1.</span>
                    <span>Our team will review your submission and assign it to the appropriate specialist</span>
                  </li>
                  {/* <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">2.</span>
                    <span>You'll receive an email confirmation with a tracking ID within 1 hour</span>
                  </li> */}
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">2.</span>
                    <span>We'll keep you updated on progress and notify you when resolved</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetForm}
                  variant="primary"
                  icon={<MessageSquare size={18} />}
                >
                  Submit Another Report
                </Button>
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                >
                  Back to Dashboard
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Help Us Improve Localyse</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Found a bug or have feedback? We'd love to hear from you! Your input helps us make localyse better for everyone.
            </p>
            
            {/* Promise Banner
            <div className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Shield size={24} />
                <h2 className="text-xl font-semibold">Our Commitment to You</h2>
              </div>
              <p className="text-primary-100">
                ⚡ <strong>24-hour response</strong> • 🚀 <strong>2-day resolution target</strong> • 💬 <strong>Regular updates</strong>
              </p>
            </div> */}
          </div>

          <Card className="p-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-100 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `${tab.bgColor} ${tab.color} ${tab.borderColor} border shadow-sm`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Priority Selection
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Priority Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorityOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.priority === option.value
                          ? `${option.bgColor} ${option.color} border-current`
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={option.value}
                        checked={formData.priority === option.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div> */}

              {/* Title */}
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={`Brief ${activeTab === 'bug' ? 'bug' : activeTab === 'feature' ? 'feature' : 'feedback'} summary`}
                required
              />

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={`Provide detailed information about the ${activeTab}...`}
                  required
                />
              </div>

              {/* Bug-specific fields */}
              {activeTab === 'bug' && (
                <div className="space-y-6 bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 flex items-center space-x-2">
                    <Bug size={20} />
                    <span>Bug Details</span>
                  </h3>
                  
                  <div>
                    <label htmlFor="stepsToReproduce" className="block text-sm font-medium text-slate-700 mb-2">
                      Steps to Reproduce *
                    </label>
                    <textarea
                      id="stepsToReproduce"
                      name="stepsToReproduce"
                      value={formData.stepsToReproduce}
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="1. Go to... 2. Click on... 3. Notice that..."
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expectedBehavior" className="block text-sm font-medium text-slate-700 mb-2">
                        Expected Behavior
                      </label>
                      <textarea
                        id="expectedBehavior"
                        name="expectedBehavior"
                        value={formData.expectedBehavior}
                        onChange={handleInputChange}
                        rows={3}
                        className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="What should happen?"
                      />
                    </div>

                    <div>
                      <label htmlFor="actualBehavior" className="block text-sm font-medium text-slate-700 mb-2">
                        Actual Behavior
                      </label>
                      <textarea
                        id="actualBehavior"
                        name="actualBehavior"
                        value={formData.actualBehavior}
                        onChange={handleInputChange}
                        rows={3}
                        className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="What actually happens?"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Screenshots Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Screenshots (Optional)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-300 hover:border-primary-500'
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <Upload size={32} className="mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 mb-2">
                    Drag and drop images here, or click to select
                  </p>
                  <p className="text-sm text-slate-500">
                    Max 5 files, 5MB each. PNG, JPG, GIF supported.
                  </p>
                </div>

                {/* Screenshot Preview */}
                {formData.screenshots.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.screenshots.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeScreenshot(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Browser Info */}
              <div>
                <label htmlFor="browserInfo" className="block text-sm font-medium text-slate-700 mb-2">
                  Browser Information
                </label>
                <textarea
                  id="browserInfo"
                  name="browserInfo"
                  value={formData.browserInfo}
                  onChange={handleInputChange}
                  rows={2}
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 text-sm"
                  readOnly
                />
                <p className="mt-1 text-xs text-slate-500">
                  This information helps us reproduce and fix issues faster
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                
                <Input
                  label="Email (Optional)"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />

                <div className="mt-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="allowContact"
                      checked={formData.allowContact}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to be contacted about this submission for clarification or updates
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  icon={isSubmitting ? <Clock size={18} className="animate-spin" /> : <Send size={18} />}
                  className="bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 px-8 py-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>

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

export default FeedbackBugs;