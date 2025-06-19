import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Save } from 'lucide-react';

const stateCityMap = {
  Rajasthan: ['Jaipur'],
  Bihar: ['Siwan', 'Chhapra', 'Gopalganj'],
  UP: ['Gorakhpur'],
  'West Bengal': ['Kolkata'],
  Delhi: ['New Delhi'],
};

const PersonalInfo = ({ data, onSave, loading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: 'male',
    niche: '',
    bio: '',
    state: '',
    city: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
        gender: data.gender || 'male',
        niche: data.niche || '',
        bio: data.bio || '',
        state: data.state || '',
        city: data.city || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: '', // reset city when state changes
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-medium text-slate-900">Personal Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Full Name"
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            id="phoneNumber"
            type="tel"
            placeholder="Your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <div className="md:col-span-2 flex items-center space-x-4">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <select
                id="gender"
                className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex-1">
              <Input
                label="Niche"
                id="niche"
                placeholder="Your niche"
                value={formData.niche}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-slate-700">
              State
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={handleStateChange}
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select State</option>
              {Object.keys(stateCityMap).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">
              City
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={handleCityChange}
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
          </div>
          <div className="md:col-span-2">
            <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-slate-700">
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit" icon={<Save size={16} />} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PersonalInfo;
