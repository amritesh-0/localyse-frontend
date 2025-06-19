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

const BusinessInfo = ({ data, onSave, loading }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessWebsite: '',
    phoneNumber: '',
    industry: '',
    state: '',
    city: '',
    additionalInfo: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        businessName: data.businessName || '',
        businessWebsite: data.businessWebsite || '',
        phoneNumber: data.phoneNumber || '',
        industry: data.industry || '',
        state: data.state || '',
        city: data.city || '',
        additionalInfo: data.additionalInfo || '',
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
      <h3 className="mb-4 text-lg font-medium text-slate-900">Business Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Business Name"
            id="businessName"
            placeholder="Your business name"
            value={formData.businessName}
            onChange={handleChange}
          />
          <Input
            label="Business Website"
            id="businessWebsite"
            placeholder="Your business website"
            value={formData.businessWebsite}
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
          <Input
            label="Industry"
            id="industry"
            placeholder="Your industry"
            value={formData.industry}
            onChange={handleChange}
          />
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
            <label htmlFor="additionalInfo" className="mb-1.5 block text-sm font-medium text-slate-700">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              rows={3}
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Any additional information about your business"
              value={formData.additionalInfo}
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

export default BusinessInfo;
