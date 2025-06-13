import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { postAd, getAds, deleteAd } from '../../../services/businessDashboard/postAds';
import CreateCampaignCard from '../../../components/Advertisement/CreateCampaignCard';
import AdCard from '../../../components/Advertisement/AdCard';

const PostAds = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: '',
    platforms: [] as string[],
    startDate: '',
    endDate: '',
    taskCount: '',
    barterOrPaid: 'barter' as 'barter' | 'paid',
    budget: '',
    requirements: '',
    campaignDescription: '',
    image: null as { url: string; public_id: string } | null,
    file: null as File | null,
  });
  const [ads, setAds] = useState<any[]>([]);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, checked, files, type } = e.target as HTMLInputElement;

    if (name === 'platforms') {
      const updatedPlatforms = checked
        ? [...formData.platforms, value]
        : formData.platforms.filter((p) => p !== value);
      setFormData({ ...formData, platforms: updatedPlatforms });
    } else if (type === 'file' && files && files.length > 0) {
      setFormData({ ...formData, image: { url: URL.createObjectURL(files[0]), public_id: '' }, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchAds = async () => {
    try {
      const data = await getAds();
      if (Array.isArray(data)) {
        setAds(data);
      } else {
        setAds([]);
        console.error('Expected ads data to be an array but got:', data);
      }
    } catch (error) {
      console.error('Failed to fetch ads:', error);
      setAds([]);
    }
  };

  const handleDeleteAd = async (id: string) => {
    try {
      await deleteAd(id);
      setDeleteToast(true);
      setTimeout(() => setDeleteToast(false), 3000);
      fetchAds();
    } catch (error) {
      console.error('Failed to delete ad:', error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('campaignName', formData.campaignName);
      data.append('platforms', JSON.stringify(formData.platforms));
      data.append('startDate', formData.startDate);
      data.append('endDate', formData.endDate);
      data.append('taskCount', formData.taskCount);
      data.append('barterOrPaid', formData.barterOrPaid);
      data.append('budget', formData.budget);
      data.append('requirements', formData.requirements);
      data.append('campaignDescription', formData.campaignDescription);
      if (formData.file) {
        data.append('image', formData.file);
      }

      // @ts-ignore
      await postAd(data);
      togglePopup();
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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      fetchAds();
    } catch (error) {
      console.error('Failed to post ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const [deleteToast, setDeleteToast] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaign Management</h1>
          <p className="text-slate-600 mt-1">Create and manage your influencer marketing campaigns</p>
        </div>
        <Button
          onClick={togglePopup}
          icon={<Plus size={18} />}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
        >
          Create Campaign
        </Button>
      </div>

      <AnimatePresence>
        {isPopupOpen && (
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
              transition={{ type: 'spring', duration: 0.3 }}
            >
              <CreateCampaignCard
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                togglePopup={togglePopup}
                loading={loading}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ads.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="mb-4 text-slate-400">
              <MessageSquare size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No campaigns yet</h3>
            <p className="text-slate-600 mt-1">Create your first campaign to get started</p>
          </div>
        ) : (
          ads.map((ad: any) => (
            <motion.div
              key={ad._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdCard ad={ad} onDelete={handleDeleteAd} />
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg"
          >
            Campaign created successfully!
          </motion.div>
        )}

        {deleteToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-red-100 text-red-800 px-6 py-3 rounded-lg shadow-lg"
          >
            Campaign deleted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostAds;
