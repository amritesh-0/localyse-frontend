import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Components
import InfluencerProfileCard from '../../../components/Influencer/InfluencerProfileCard';
import AvailableInfluencerModal from '../../../components/Influencer/AvailableInfluencerModal';

// Services
import { getAds } from '../../../services/businessDashboard/postAds';
import { getAvailableInfluencers } from '../../../services/businessDashboard/availableInfluencers';
import { getRequestStatus, getAcceptedAdsPerInfluencer , sendRequestToInfluencer} from '../../../services/businessDashboard/requestAds';

interface Influencer {
  _id: string;
  user?: string;
  instagramInsights?: {
    followers_count: number;
    media_count: number;
    username: string;
    profile_picture_url: string;
    insights: any[];
  } | null;
  personalInfo?: {
    fullName: string;
    gender: string;
    city: string;
    state: string;
    niche?: string;
  };
}

interface FormData {
  campaignName: string;
  platforms: string[];
  startDate: string;
  endDate: string;
  taskCount: string;
  barterOrPaid: 'barter' | 'paid';
  budget: string;
  requirements: string;
  campaignDescription: string;
  image: {
    url: string;
    public_id: string;
  } | null;
  file?: File | null;
}

const AvailableInfluencers = () => {
  const navigate = useNavigate();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'options' | 'postedAds' | 'createCampaign'>('options');
  const [ads, setAds] = useState<any[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [selectedInfluencerId, setSelectedInfluencerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    platforms: [],
    startDate: '',
    endDate: '',
    taskCount: '',
    barterOrPaid: 'barter',
    budget: '',
    requirements: '',
    campaignDescription: '',
    image: null,
    file: null,
  });

  // New state to track request statuses per influencer
  const [requestStatuses, setRequestStatuses] = useState<Record<string, string | null>>({});
  // New state to track accepted campaign ad IDs per influencer
  const [acceptedAdIds, setAcceptedAdIds] = useState<Record<string, string>>({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Effects
  useEffect(() => {
    fetchInfluencers();
  }, []);

  useEffect(() => {
    if (modalView === 'postedAds' && selectedInfluencerId) {
      fetchAds();
    }
  }, [modalView, selectedInfluencerId]);

  // Fetch Functions
  const fetchInfluencers = async () => {
    setIsLoading(true);
    try {
      const data = await getAvailableInfluencers();
      if (Array.isArray(data)) {
        // Map backend data to frontend structure
        const mappedInfluencers = data.map((influencer: any) => ({
          ...influencer,
          personalInfo: {
            ...influencer.personalInfo,
            fullName: influencer.personalInfo?.name || '',
          },
        }));
        setInfluencers(mappedInfluencers);

        // Fetch request status for each influencer
        const statuses: Record<string, string | null> = {};
        // Fetch accepted ad IDs per influencer from new API
        const adIds: Record<string, string> = await getAcceptedAdsPerInfluencer();
        console.log('Accepted Ad IDs:', adIds);

        await Promise.all(
          mappedInfluencers.map(async (inf) => {
            try {
              const status = await getRequestStatus(inf._id);
              statuses[inf._id] = status;
            } catch (error) {
              statuses[inf._id] = null;
            }
          })
        );
        setRequestStatuses(statuses);
        setAcceptedAdIds(adIds);
      } else {
        console.error('Expected influencers data to be an array but got:', data);
        setInfluencers([]);
      }
    } catch (error) {
      console.error('Failed to fetch influencers:', error);
      setInfluencers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // New function to refresh acceptedAdIds
  const refreshAcceptedAdIds = async () => {
    try {
      const adIds: Record<string, string> = await getAcceptedAdsPerInfluencer();
      setAcceptedAdIds(adIds);
      console.log('Refreshed Accepted Ad IDs:', adIds);
    } catch (error) {
      console.error('Failed to refresh accepted ad IDs:', error);
    }
  };
  
  // Handler for sending existing ad to influencer
  const handleSendExistingAd = async (adId: string) => {
    if (!selectedInfluencerId) return;
    try {
      await sendRequestToInfluencer({
        influencerId: selectedInfluencerId,
        adId,
        campaignData: null
      });
      setToastMessage('Request sent successfully!');
      setShowToast(true);
      closeModal();
      setTimeout(() => setShowToast(false), 3000);

      // Update request status to pending after sending request
      setRequestStatuses(prev => ({
        ...prev,
        [selectedInfluencerId]: 'pending',
      }));

      // Refresh acceptedAdIds after sending request
      await refreshAcceptedAdIds();
    } catch (error) {
      console.error('Failed to send request:', error);
      setToastMessage('Failed to send request. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInfluencerId) return;
    try {
      setIsSubmitting(true);
      const formPayload = new FormData();
      formPayload.append('influencerId', selectedInfluencerId);
      formPayload.append('adId', ''); // no adId when creating new campaign

      // Append campaignData as JSON string
      const campaignData = { ...formData };
      delete campaignData.file; // remove file from campaignData
      formPayload.append('campaignData', JSON.stringify(campaignData));

      // Append image file if exists
      if (formData.file) {
        formPayload.append('image', formData.file);
      }

      await sendRequestToInfluencer({
        influencerId: selectedInfluencerId,
        adId: '',
        campaignData: formPayload,
      });

      setToastMessage('Request sent successfully!');
      setShowToast(true);
      closeModal();
      setIsSubmitting(false);
      setTimeout(() => setShowToast(false), 3000);

      // Update request status to pending after sending request
      setRequestStatuses(prev => ({
        ...prev,
        [selectedInfluencerId]: 'pending',
      }));

      // Refresh acceptedAdIds after sending request
      await refreshAcceptedAdIds();
    } catch (error) {
      console.error('Failed to send request:', error);
      setToastMessage('Failed to send request. Please try again.');
      setShowToast(true);
      setIsSubmitting(false);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const fetchAds = async () => {
    if (!selectedInfluencerId) {
      return;
    }
    try {
      const data = await getAds();
      setAds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
      setAds([]);
    }
  };

// Handlers
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked;
  const files = (e.target as HTMLInputElement).files;

  if (name === 'platforms') {
    setFormData(prev => ({
      ...prev,
      platforms: checked
        ? [...prev.platforms, value]
        : prev.platforms.filter(p => p !== value)
    }));
  } else if (type === 'file' && files && files.length > 0) {
    setFormData(prev => ({
      ...prev,
      image: null, // clear previous image preview
      file: files[0],
    }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  // Modal Functions
  const openModal = (influencerId: string) => {
    setSelectedInfluencerId(influencerId);
    setModalView('options');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsSubmitting(false);
    setIsModalOpen(false);
    setModalView('options');
    setSelectedInfluencerId(null);
    setFormData({
      campaignName: '',
      platforms: [],
      startDate: '',
      endDate: '',
      taskCount: '',
      barterOrPaid: 'barter',
      budget: '',
      requirements: '',
      campaignDescription: '',
      image: null,
      file: null,
    });
  };

  // Handler for Track Ads button click
  const handleTrackAds = (adId: string) => {
    navigate(`/dashboard/business/track-campaign/${adId}`);
  };

  // Filter Functions
  const filteredInfluencers = influencers.filter(influencer => {
    const name = influencer.personalInfo?.fullName || '';
    const location = `${influencer.personalInfo?.city || ''} ${influencer.personalInfo?.state || ''}`.trim();
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === 'all' || influencer.personalInfo?.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  const uniqueNiches = ['all', ...new Set(influencers.map(inf => inf.personalInfo?.niche))];

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Available Influencers</h1>
        
        
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search influencers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 
                focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 
                focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 appearance-none bg-white"
            >
              {uniqueNiches.map(niche => (
                <option key={niche} value={niche}>
                  {(niche ? niche.charAt(0).toUpperCase() + niche.slice(1) : '')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Influencers Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredInfluencers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">No influencers found matching your criteria.</p>
            </div>
          ) : (
            filteredInfluencers.map((influencer) => {
              const status = requestStatuses[influencer._id];
              return (
                <motion.div key={influencer._id} variants={itemVariants} className="relative">
                  <InfluencerProfileCard
                    profileImageUrl={
                      influencer.instagramInsights?.profile_picture_url || ''
                    }
                    fullName={
                      influencer.personalInfo?.fullName || ''
                    }
                    city={influencer.personalInfo?.city || ''}
                    state={influencer.personalInfo?.state || ''}
                    followers={
                      influencer.instagramInsights?.followers_count?.toLocaleString() || '0'
                    }
                    niche={influencer.personalInfo?.niche || ''}
                    instagramReach={
                      influencer.instagramInsights?.insights?.find(i => i.name === 'reach')?.values[0]?.value || 0
                    }
                    gender={influencer.personalInfo?.gender || ''}
                    instagramUsername={influencer.instagramInsights?.username || ''}
                    onSendRequest={() => openModal(influencer._id || '')}
                    requestStatus={status}
                    onTrackAds={() => handleTrackAds(acceptedAdIds[influencer._id] || '')}
                  />
                </motion.div>
              );
            })
          )}
        </motion.div>
      )}

      {/* Modal */}
      <AvailableInfluencerModal
        isModalOpen={isModalOpen}
        modalView={modalView}
        ads={ads}
        formData={formData}
        loading={isSubmitting}
        closeModal={closeModal}
        setModalView={setModalView}
        handleSendExistingAd={handleSendExistingAd}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableInfluencers;
