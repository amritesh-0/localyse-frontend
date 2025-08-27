import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserPlus, MapPin, CheckCircle, Youtube, Instagram, Users, Film, Image as ImageIcon } from 'lucide-react';

interface InfluencerProfileCardProps {
  profileImageUrl?: string;
  fullName: string;
  city?: string;
  state?: string;
  followers?: string;
  niche: string;
  instagramTotalPost?: number;
  gender?: string;
  instagramUsername?: string;
  youtubeSubscriberCount?: string | number;
  youtubeVideoCount?: string | number;
  youtubeChannelId?: string;
  onSendRequest?: () => void;
  requestStatus?: string | null;
  onTrackAds?: () => void;
}

const InfluencerProfileCard: React.FC<InfluencerProfileCardProps> = ({
  profileImageUrl = 'https://cdn-icons-png.flaticon.com/512/7915/7915522.png',
  fullName,
  city,
  state,
  followers,
  niche = '',
  instagramTotalPost,
  gender,
  instagramUsername,
  youtubeSubscriberCount,
  youtubeVideoCount,
  youtubeChannelId,
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

  const formatCount = (value?: string | number) => {
    if (value === undefined || value === null) return undefined;
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(num)) return String(value);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const toTitleCase = (text?: string) => {
    if (!text) return text;
    return text
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const displayNiche = toTitleCase(niche);
  const displayGender = gender ? toTitleCase(gender) : undefined;
  const displayLocation = location;

  return (
    <Card
      padding="none"
      className="max-w-[340px] min-w-[300px] bg-white rounded-xl border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 pb-3 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex justify-center mb-3">
          <div className="relative">
            <img
              src={profileImageUrl}
              alt={`${fullName} profile`}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white shadow">
              <CheckCircle size={8} className="text-white" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-slate-900 leading-tight tracking-tight">{fullName}</h2>
          {(displayNiche || displayGender) && (
            <div className="flex items-center justify-center gap-2">
              {displayNiche && <span className="text-xs text-indigo-600 font-medium">{displayNiche}</span>}
              {displayNiche && displayGender && <span className="text-slate-300">•</span>}
              {displayGender && <span className="text-[10px] text-slate-500">{displayGender}</span>}
            </div>
          )}
          {displayLocation && (
            <div className="flex items-center justify-center space-x-1 text-slate-600">
              <MapPin size={12} className="text-slate-400" />
              <span className="text-xs">{displayLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Instagram */}
        {(followers !== undefined || instagramTotalPost !== undefined || instagramUsername) && (
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-white border border-slate-200">
                <Instagram size={13} className="text-pink-500" />
                <span className="text-[11px] font-semibold text-slate-800">Instagram</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-4">
                {followers !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-slate-700">
                    <Users size={12} className="text-slate-500" />
                    <span className="font-medium">{formatFollowers(followers)}</span> followers
                  </span>
                )}
                {instagramTotalPost !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-slate-700">
                    <ImageIcon size={12} className="text-slate-500" />
                    <span className="font-medium">{instagramTotalPost.toLocaleString()}</span> posts
                  </span>
                )}
              </div>
              {instagramUsername && (
                <a
                  href={`https://instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-indigo-700 hover:text-indigo-800"
                >
                  @{instagramUsername}
                </a>
              )}
            </div>
          </div>
        )}

        {/* YouTube */}
        {(youtubeSubscriberCount !== undefined || youtubeVideoCount !== undefined || youtubeChannelId) && (
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-white border border-slate-200">
                <Youtube size={13} className="text-red-500" />
                <span className="text-[11px] font-semibold text-slate-800">YouTube</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-4">
                {youtubeSubscriberCount !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-slate-700">
                    <Users size={12} className="text-slate-500" />
                    <span className="font-medium">{formatCount(youtubeSubscriberCount)}</span> subs
                  </span>
                )}
                {youtubeVideoCount !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-slate-700">
                    <Film size={12} className="text-slate-500" />
                    <span className="font-medium">{formatCount(youtubeVideoCount)}</span> videos
                  </span>
                )}
              </div>
              {youtubeChannelId && (
                <a
                  href={`https://youtube.com/channel/${youtubeChannelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-indigo-700 hover:text-indigo-800"
                >
                  Channel
                </a>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-1">
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