import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, User, Mail, Lock, Bell, CreditCard, Shield } from 'lucide-react';
import Card from '../../../components/ui/Card';
import PersonalInfo from '../../../components/profile/PersonalInfo';
import LinkedAccounts from '../../../components/profile/LinkedAccounts';
import Security from '../../../components/profile/Security';
import Notifications from '../../../components/profile/Notifications';
import Billing from '../../../components/profile/Billing';
import Privacy from '../../../components/profile/Privacy';
import { getPersonalInfo, upsertPersonalInfo } from '../../../services/influencerDashboard/personalInfo';
import { fetchProfileImage } from '../../../services/sharedDashboard/topbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [personalInfoData, setPersonalInfoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={16} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={16} /> },
  ];

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      setLoading(true);
      try {
        const data = await getPersonalInfo();
        setPersonalInfoData(data);
      } catch (error) {
        console.error('Failed to fetch personal info:', error);
      } finally {
        setLoading(false);
      }
    };
    const loadProfileImage = async () => {
      const url = await fetchProfileImage();
      setProfileImageUrl(url);
    };
    fetchPersonalInfo();
    loadProfileImage();
  }, []);

  const handleSave = async (updatedData) => {
    setLoading(true);
    try {
      const savedData = await upsertPersonalInfo(updatedData);
      setPersonalInfoData(savedData);
    } catch (error) {
      console.error('Failed to save personal info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600">
          Manage your profile, preferences, and account settings.
        </p>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full sm:mb-0">
              <img
              src={profileImageUrl || 'https://cdn-icons-png.flaticon.com/512/7915/7915522.png'}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
              {/* <button className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-1.5 text-white shadow-md hover:bg-primary-700">
                <Camera size={16} />
              </button> */}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{personalInfoData?.fullName || 'Hi! user'}</h2>
              <p className="text-slate-600">Influencer Account · Premium Plan</p>
              {/* <p className="mt-1 text-sm text-slate-500">Member since March 2025</p> */}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'profile' && (
          <>
            <PersonalInfo data={personalInfoData} onSave={handleSave} loading={loading} />
            <LinkedAccounts />
          </>
        )}

        {activeTab === 'security' && <Security />}

        {activeTab === 'notifications' && <Notifications />}

        {activeTab === 'billing' && <Billing />}

        {activeTab === 'privacy' && <Privacy />}
      </div>
    </div>
  );
};

export default Profile;
