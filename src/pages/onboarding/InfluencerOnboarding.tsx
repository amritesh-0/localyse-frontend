import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { User, Phone, CalendarDays, FileText, Scale as Male, Scale as Female } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import "react-datepicker/dist/react-datepicker.css";
import { getInfluencerOnboarding, upsertInfluencerOnboarding } from '../../services/OnboardingData/onboardingApi';

const InfluencerOnboarding = () => {
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: null as Date | null,
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
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
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
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
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
        dateOfBirth: formData.dateOfBirth,
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
      formData.dateOfBirth !== null &&
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
                    <Male size={18} className="mr-2" />
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
                    <Female size={18} className="mr-2" />
                    <span className="font-medium">Female</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Date of Birth
                </label>
                <div className="relative">
                  <CalendarDays size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                    dateFormat="MMMM d, yyyy"
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholderText="Select your date of birth"
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>
              
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
