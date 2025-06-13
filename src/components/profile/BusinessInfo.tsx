import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Save } from 'lucide-react';

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
          <Input
            label="State"
            id="state"
            placeholder="Your state"
            value={formData.state}
            onChange={handleChange}
          />
          <Input
            label="City"
            id="city"
            placeholder="Your city"
            value={formData.city}
            onChange={handleChange}
          />
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
