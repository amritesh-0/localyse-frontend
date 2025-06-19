import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import DatePicker from 'react-datepicker';
import { User, Phone, FileText, Tag } from 'lucide-react';
import { FaMars, FaVenus } from "react-icons/fa";
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import "react-datepicker/dist/react-datepicker.css";
import { getInfluencerOnboarding, upsertInfluencerOnboarding } from '../../services/OnboardingData/onboardingApi';

const stateCityMap: Record<string, string[]> = {
  Rajasthan: ['Jaipur'],
  Bihar: ['Siwan', 'Chhapra', 'Gopalganj'],
  UP: ['Gorakhpur'],
  'West Bengal': ['Kolkata'],
  Delhi: ['New Delhi'],
};

const InfluencerOnboarding = () => {
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    niche: '',
    bio: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await getInfluencerOnboarding();
        setFormData({
          state: data.state || '',
          city: data.city || '',
          fullName: data.fullName || '',
          phoneNumber: data.phoneNumber || '',
          gender: data.gender || '',
          niche: data.niche || '',
          bio: data.bio || ''
        });
      } catch (error) {
        setFetchError('Failed to load influencer onboarding data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.niche) {
      newErrors.niche= 'niche is required';
    }
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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
        // Prepare data to match backend expected fields
        const data = {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          niche: formData.niche,
          bio: formData.bio,
          state: formData.state,
          city: formData.city,
        };
        await upsertInfluencerOnboarding(data);
        // Navigate to next onboarding step
        window.location.href = '/onboarding/linksocials';
      } catch (error) {
        setFetchError('Failed to save influencer onboarding data.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormComplete = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.gender !== '' &&
      formData.niche !== '' &&
      formData.bio.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.city.trim() !== ''
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
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 w-1/2 rounded-full bg-primary-500"></div>
              </div>
              <p className="mt-2 text-center text-sm text-slate-600">Step 1 of 2</p>
            </div>

            <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Tell us about yourself
            </h1>

            {fetchError && (
              <p className="mb-4 text-center text-red-600">{fetchError}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                id="fullName"
                value={formData.fullName}
                placeholder="Full Name"
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                icon={<User size={18} className="text-slate-400" />}
                error={errors.fullName}
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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-xl border p-4 ${
                      formData.gender === 'male'
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="sr-only"
                    />
                    <FaMars size={18} className="mr-2" />
                    <span className="font-medium">Male</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-xl border p-4 ${
                      formData.gender === 'female'
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="sr-only"
                    />
                    <FaVenus size={18} className="mr-2" />
                    <span className="font-medium">Female</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  
                </label>
                <Input
                  label="Niche"
                  id="niche"
                  value={formData.niche}
                  placeholder="Niche (eg. Fashion, Travel, Tech)"
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  icon={<Tag size={18} className="text-slate-400" />}
                  error={errors.niche}
                />
              </div>

              <div>
                <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-slate-700">
                  State
                </label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => {
                    const selectedState = e.target.value;
                    setFormData({
                      ...formData,
                      state: selectedState,
                      city: '' // reset city when state changes
                    });
                  }}
                  className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityMap).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">
                  City
                </label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!formData.state}
                  className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  <option value="">Select City</option>
                  {formData.state &&
                    stateCityMap[formData.state].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Bio
                </label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
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

export default InfluencerOnboarding;
