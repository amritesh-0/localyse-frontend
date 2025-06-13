import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';
import AdCard from '../Advertisement/AdCard';
import CreateCampaignCard from '../Advertisement/CreateCampaignCard';

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
}

interface AvailableInfluencerModalProps {
  isModalOpen: boolean;
  modalView: 'options' | 'postedAds' | 'createCampaign';
  ads: any[];
  formData: FormData;
  loading?: boolean;
  closeModal: () => void;
  setModalView: (view: 'options' | 'postedAds' | 'createCampaign') => void;
  handleSendExistingAd: (adId: string) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const AvailableInfluencerModal = ({
  isModalOpen,
  modalView,
  ads = [],
  formData,
  loading = false,
  closeModal,
  setModalView,
  handleSendExistingAd,
  handleSubmit,
  handleInputChange,
}: AvailableInfluencerModalProps) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg overflow-hidden bg-white rounded-xl shadow-xl"
          >
            {/* Modal Header */}
            <div className="relative border-b border-slate-200">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 p-2 rounded-full text-slate-400 
                  hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
              >
                <X size={20} />
              </button>

              {modalView !== 'options' && (
                <button
                  onClick={() => setModalView('options')}
                  className="absolute left-4 top-4 p-2 rounded-full text-slate-400 
                    hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              <h2 className="p-6 text-xl font-semibold text-center text-slate-900">
                {modalView === 'options' && 'Send Request'}
                {modalView === 'postedAds' && 'Choose from Posted Ads'}
                {modalView === 'createCampaign' && 'Create New Campaign'}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalView === 'options' && (
                <div className="space-y-4">
                  <Button
                    onClick={() => setModalView('postedAds')}
                    variant="outline"
                    className="w-full py-3"
                  >
                    Choose from Posted Ads
                  </Button>
                  <Button
                    onClick={() => setModalView('createCampaign')}
                    variant="primary"
                    className="w-full py-3"
                  >
                    Create New Campaign
                  </Button>
                </div>
              )}

              {modalView === 'postedAds' && (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                  {!ads || ads.length === 0 ? (
                    <p className="text-center text-slate-600">No posted ads available.</p>
                  ) : (
                    <div className="grid gap-4">
                      {ads.map((ad) => (
                        <div key={ad._id} className="relative">
                          <AdCard ad={ad} />
                          <Button
                            onClick={() => handleSendExistingAd(ad._id)}
                            variant="primary"
                            className="absolute bottom-4 right-4 py-2 px-4"
                          >
                            Use This Ad
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {modalView === 'createCampaign' && (
                <div className="flex justify-center">
                  <CreateCampaignCard
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    togglePopup={closeModal}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvailableInfluencerModal;
