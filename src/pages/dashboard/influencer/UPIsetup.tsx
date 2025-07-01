import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  CreditCard, 
  CheckCircle, 
  Hash, 
  User, 
  Shield, 
  Save, 
  Clock 
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { upsertUPIDetails } from '../../../services/sharedDashboard/upiApi';

interface UPIDetails {
  upiId: string;
  accountHolderName: string;
  isVerified: boolean;
}

interface UPISetupProps {
  upiDetails: UPIDetails | null;
  onUPIUpdate: (details: UPIDetails) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

const UPISetup: React.FC<UPISetupProps> = ({ upiDetails, onUPIUpdate, showToast }) => {
  const [isSettingUpUPI, setIsSettingUpUPI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    accountHolderName: ''
  });

  const handleUPISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!upiForm.upiId || !upiForm.accountHolderName) {
      showToast('Please fill in all UPI details', 'error');
      return;
    }

    // Validate UPI ID format
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upiRegex.test(upiForm.upiId)) {
      showToast('Please enter a valid UPI ID', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await upsertUPIDetails({
        upiId: upiForm.upiId,
        accountHolderName: upiForm.accountHolderName,
      });
      onUPIUpdate({
        upiId: upiForm.upiId,
        accountHolderName: upiForm.accountHolderName,
        isVerified: true,
      });
      setIsSettingUpUPI(false);
      showToast('UPI details saved successfully!', 'success');
      
    } catch (error) {
      showToast('Failed to save UPI details', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If UPI is not set up, show setup form
  if (!upiDetails) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone size={32} className="text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Set Up Your UPI Details</h2>
            <p className="text-slate-600 max-w-md mx-auto">
              Add your UPI ID to receive payments securely. This information will be shared with businesses for payment processing.
            </p>
          </div>

          {!isSettingUpUPI ? (
            <div className="text-center">
              <Button
                onClick={() => setIsSettingUpUPI(true)}
                icon={<CreditCard size={18} />}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
              >
                Add UPI Details
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUPISubmit} className="max-w-md mx-auto space-y-6">
              <Input
                label="UPI ID"
                name="upiId"
                value={upiForm.upiId}
                onChange={(e) => setUpiForm({ ...upiForm, upiId: e.target.value })}
                placeholder="yourname@paytm"
                icon={<Hash size={18} className="text-slate-400" />}
                required
              />

              <Input
                label="Account Holder Name"
                name="accountHolderName"
                value={upiForm.accountHolderName}
                onChange={(e) => setUpiForm({ ...upiForm, accountHolderName: e.target.value })}
                placeholder="Full name as per bank account"
                icon={<User size={18} className="text-slate-400" />}
                required
              />

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Shield size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Security Note</p>
                    <p className="text-sm text-blue-700">
                      Your UPI details are encrypted and only shared with businesses for payment purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSettingUpUPI(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  icon={isSubmitting ? <Clock size={18} className="animate-spin" /> : <Save size={18} />}
                  fullWidth
                >
                  {isSubmitting ? 'Saving...' : 'Save UPI Details'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </motion.div>
    );
  }

  // If UPI is set up, show configured details
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">UPI Details Configured</h3>
              <p className="text-green-700">
                <span className="font-medium">{upiDetails.accountHolderName}</span> • {upiDetails.upiId}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingUpUPI(true)}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Edit Details
          </Button>
        </div>
      </Card>

      {/* Edit Form Modal */}
      {isSettingUpUPI && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Edit UPI Details</h3>
              
              <form onSubmit={handleUPISubmit} className="space-y-6">
                <Input
                  label="UPI ID"
                  name="upiId"
                  value={upiForm.upiId || upiDetails.upiId}
                  onChange={(e) => setUpiForm({ ...upiForm, upiId: e.target.value })}
                  placeholder="yourname@paytm"
                  icon={<Hash size={18} className="text-slate-400" />}
                  required
                />

                <Input
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={upiForm.accountHolderName || upiDetails.accountHolderName}
                  onChange={(e) => setUpiForm({ ...upiForm, accountHolderName: e.target.value })}
                  placeholder="Full name as per bank account"
                  icon={<User size={18} className="text-slate-400" />}
                  required
                />

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSettingUpUPI(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    icon={isSubmitting ? <Clock size={18} className="animate-spin" /> : <Save size={18} />}
                    fullWidth
                  >
                    {isSubmitting ? 'Updating...' : 'Update Details'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UPISetup;