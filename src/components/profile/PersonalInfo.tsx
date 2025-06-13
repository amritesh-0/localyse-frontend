import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Save } from 'lucide-react';

const PersonalInfo = ({ data, onSave, loading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: 'male',
    dateOfBirth: '',
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
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : '',
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
          <div className="md:col-span-2">
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
          <Input
            label="Date of Birth"
            id="dateOfBirth"
            type="date"
            placeholder="Your date of birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
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
