import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Phone, Globe, FileText } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { upsertBusinessOnboarding , getBusinessOnboarding} from '../../services/OnboardingData/onboardingApi';

const BusinessOnboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    phoneNumber: '',
    businessWebsite: '',
    state: '',
    city: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await getBusinessOnboarding();
        setFormData({
          businessName: data.businessName || '',
          industry: data.industry || '',
          phoneNumber: data.phoneNumber || '',
          businessWebsite: data.businessWebsite || '',
          state: data.state || '',
          city: data.city || '',
          additionalInfo: data.additionalInfo || ''
        });
      } catch (error) {
        setFetchError('Failed to load business onboarding data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }
    
    if (formData.businessWebsite && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.businessWebsite)) {
      newErrors.businessWebsite = 'Invalid website URL';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.additionalInfo.trim()) {
      newErrors.additionalInfo = 'Additional information is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      try {
        await upsertBusinessOnboarding(formData);
        // Navigate to LinkSocials page
        window.location.href = '/onboarding/linksocials';
      } catch (error) {
        setFetchError('Failed to save business onboarding data.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormComplete = () => {
    return (
      formData.businessName.trim() !== '' &&
      formData.industry.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.additionalInfo.trim() !== ''
    );
  };

  return (
    <div className="min-h-screen bg-primary-50 py-16">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card padding="lg" className="mx-auto">
            {/* Logo and Progress Bar */}
            <div className="mb-8">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-primary-700">Suzao</h2>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 w-1/2 rounded-full bg-primary-500"></div>
              </div>
              <p className="mt-2 text-center text-sm text-slate-600">Step 1 of 2</p>
            </div>

            <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Tell us about your business
            </h1>

            {fetchError && (
              <p className="mb-4 text-center text-red-600">{fetchError}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Business Name"
                id="businessName"
                value={formData.businessName}
                placeholder="Business Name"
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                icon={<Building2 size={18} className="text-slate-400" />}
                error={errors.businessName}
              />

              <Input
                label="Industry"
                id="industry"
                value={formData.industry}
                placeholder="Industry"
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                error={errors.industry}
              />

              <Input
                label="Phone Number"
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                placeholder="Phone Number"
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                icon={<Phone size={18} className="text-slate-400" />}
                error={errors.phoneNumber}
              />

              <Input
                label="Business Website (Optional)"
                id="businessWebsite"
                value={formData.businessWebsite}
                placeholder="Business Website"
                onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })}
                icon={<Globe size={18} className="text-slate-400" />}
                error={errors.businessWebsite}
              />

              <Input
                label="State"
                id="state"
                value={formData.state}
                placeholder="State"
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                error={errors.state}
              />

              <Input
                label="City"
                id="city"
                value={formData.city}
                placeholder="City"
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                error={errors.city}
              />

              <div>
                <label htmlFor="additionalInfo" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Additional Information
                </label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                    className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us more about your business..."
                  />
                </div>
                {errors.additionalInfo && (
                  <p className="mt-1 text-sm text-red-600">{errors.additionalInfo}</p>
                )}
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={!isFormComplete() || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Next'
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default BusinessOnboarding;
