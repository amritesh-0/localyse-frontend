import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, ExternalLink, CheckCircle } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { fetchLinkedSocials } from '../../services/authServices/linkSocialsApi';
import { getToken } from '../../utils/auth';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  isLinked: boolean;
}

import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/authServices/authApi';

const LinkSocials = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram size={24} />,
      color: 'hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200',
      isLinked: false,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook size={24} />,
      color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200',
      isLinked: false,
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter size={24} />,
      color: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200',
      isLinked: false,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube size={24} />,
      color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-200',
      isLinked: false,
    },
  ]);

  const [showToast, setShowToast] = useState(false);
  const [lastLinkedPlatform, setLastLinkedPlatform] = useState('');
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const linkedSocials = await fetchLinkedSocials();
        console.log('Linked socials data from API:', linkedSocials);
        setPlatforms((prevPlatforms) =>
          prevPlatforms.map((platform) => {
            if (platform.id === 'instagram') {
              console.log('Setting Instagram isLinked to:', linkedSocials.instagram_linked || false);
              return { ...platform, isLinked: linkedSocials.instagram_linked || false };
            }
            // For other platforms, always set isLinked to false since linking not implemented
            let isLinked = false;
            switch (platform.id) {
              case 'facebook':
              case 'twitter':
              case 'youtube':
                isLinked = false;
                break;
              default:
                isLinked = false;
            }
            return {
              ...platform,
              isLinked,
            };
          })
        );
      } catch (error) {
        console.error('Error fetching linked socials:', error);
      }
    };

    const fetchUserType = async () => {
      try {
        const user = await getCurrentUser();
        setUserType(user.type);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchStatus();
    fetchUserType();

    // Check URL query params for Instagram connect success - client side to update immediately
    const url = window.location.href;
    console.log('Current URL:', url);
    const queryString = url.includes('?') ? url.substring(url.indexOf('?'), url.indexOf('#') > -1 ? url.indexOf('#') : url.length) : '';
    console.log('Parsed query string:', queryString);
    const params = new URLSearchParams(queryString);
    if (params.get('connected') === 'instagram') {
      setPlatforms((prevPlatforms) =>
        prevPlatforms.map((platform) =>
          platform.id === 'instagram' ? { ...platform, isLinked: true } : platform
        )
      );
      // Remove the query parameter from the URL to prevent repeated setting
      const url = new URL(window.location.href);
      url.searchParams.delete('connected');
      window.history.replaceState({}, document.title, url.toString());
    }
  }, []);
  const handleConnect = async (platformId: string) => {
    if (platformId === 'instagram') {
      const backendUrl = import.meta.env.VITE_API_BASE_URL || 'https://public-otters-enjoy.loca.lt';

      const token = getToken();
      console.log('Instagram OAuth login token:', token);

      const oauthUrl = `${backendUrl}/api/instagram/login?state=${encodeURIComponent(token)}`;
      console.log('Redirecting to Instagram OAuth URL:', oauthUrl);

      window.location.href = oauthUrl;
    } else if (platformId === 'facebook' || platformId === 'twitter' || platformId === 'youtube') {
      alert(platformId.charAt(0).toUpperCase() + platformId.slice(1) + ' linking coming soon!');
    }
  };

  const hasLinkedAccounts = platforms.some(platform => platform.isLinked);

  const handleGoToDashboard = () => {
    if (!userType) return;
    if (userType === 'influencer') {
      navigate('/dashboard/influencer');
    } else if (userType === 'business') {
      navigate('/dashboard/business');
    }
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
            <div className="mb-8">
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 w-2/2 rounded-full bg-primary-500"></div>
              </div>
              <p className="mt-2 text-center text-sm text-slate-600">Step 2 of 2</p>
            </div>

            <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Link Your Social Accounts
            </h1>

            <p className="mb-8 text-center text-slate-600">
              Connect your social media accounts to start managing your campaigns
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 ${platform.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {platform.icon}
                      <span className="font-medium">{platform.name}</span>
                    </div>

                    {platform.isLinked ? (
                      <span className="flex items-center space-x-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        <CheckCircle size={14} />
                        <span>Linked</span>
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConnect(platform.id)}
                        icon={<ExternalLink size={14} />}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                fullWidth
                disabled={!hasLinkedAccounts}
                onClick={handleGoToDashboard}
                className={`transition-all duration-300 ${hasLinkedAccounts ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}`}
              >
                Go to Dashboard
              </Button>

              <p className="mt-4 text-center text-sm text-slate-500">
                {hasLinkedAccounts
                  ? 'You can add more accounts later from your dashboard'
                  : 'Please connect at least one social account to continue'}
              </p>
            </div>
          </Card>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        {showToast && (
          <div className="rounded-lg bg-green-100 p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-600" />
              <p className="font-medium text-green-800">
                Successfully linked {lastLinkedPlatform}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LinkSocials;
