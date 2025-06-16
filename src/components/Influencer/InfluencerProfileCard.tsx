import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserPlus, Instagram, MapPin, Users, Star, CheckCircle } from 'lucide-react';

interface InfluencerProfileCardProps {
  profileImageUrl?: string;
  fullName: string;
  city?: string;
  state?: string;
  followers: string;
  niche: string;
  instagramReach?: number;
  gender?: string;
  instagramUsername?: string;
  onSendRequest?: () => void;
  requestStatus?: string | null;
  onTrackAds?: () => void;
}

const InfluencerProfileCard: React.FC<InfluencerProfileCardProps> = ({
  profileImageUrl = 'https://cdn-icons-png.flaticon.com/512/7915/7915522.png',
  fullName,
  city,
  state,
  followers = '0',
  niche = '',
  instagramReach,
  gender,
  instagramUsername,
  onSendRequest,
  requestStatus,
  onTrackAds,
}) => {
  const location = [city, state].filter(Boolean).join(', ');

  const formatFollowers = (followersStr: string) => {
    const num = parseInt(followersStr.replace(/,/g, ''));
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return followersStr;
  };

  return (
    <Card
      padding="none"
      className="max-w-[320px] min-w-[280px] bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Simplified header */}
      <div className="p-6 pb-4 border-b border-slate-100">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={profileImageUrl}
              alt={`${fullName} profile`}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
            />
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white">
              <CheckCircle size={10} className="text-white" />
            </div>
          </div>
        </div>

        {/* Name and basic info */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 leading-tight">{fullName}</h2>
          
          {/* Location */}
          {location ? (
            <div className="flex items-center justify-center space-x-1 text-slate-600">
              <MapPin size={14} className="text-slate-400" />
              <span className="text-sm">{location}</span>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Location not specified</p>
          )}

          {/* Niche badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            <Star size={12} className="mr-1 text-slate-500" />
            {niche}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 pt-4 space-y-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Followers */}
          <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-center mb-1">
              <Users size={16} className="text-slate-500" />
            </div>
            <p className="text-lg font-semibold text-slate-900">{formatFollowers(followers)}</p>
            <p className="text-xs text-slate-600">Followers</p>
          </div>

          {/* Instagram Reach */}
          {instagramReach !== undefined && (
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-center mb-1">
                <Instagram size={16} className="text-slate-500" />
              </div>
              <p className="text-lg font-semibold text-slate-900">{instagramReach.toLocaleString()}</p>
              <p className="text-xs text-slate-600">Daily Reach</p>
            </div>
          )}
        </div>

        {/* Additional info */}
        {(gender || instagramUsername) && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            {gender && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Gender:</span>
                <span className="text-slate-900 font-medium capitalize">{gender}</span>
              </div>
            )}
            
            {instagramUsername && (
              <div className="flex justify-center">
                <a
                  href={`https://instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors duration-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300"
                >
                  <Instagram size={14} />
                  <span className="text-sm font-medium">{instagramUsername}</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {requestStatus === 'pending' ? (
            <Button
              variant="secondary"
              size="md"
              disabled
              fullWidth
              className="bg-amber-50 text-amber-700 border-amber-200 cursor-not-allowed"
              icon={<UserPlus size={16} />}
              iconPosition="left"
            >
              Request Pending
            </Button>
          ) : requestStatus === 'accepted' ? (
            <Button
              variant="primary"
              size="md"
              onClick={onTrackAds}
              fullWidth
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              Track Campaign
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={onSendRequest}
              fullWidth
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
              icon={<UserPlus size={16} />}
              iconPosition="left"
            >
              Send Request
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default InfluencerProfileCard;