
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserPlus, Instagram, MapPin, Users } from 'lucide-react';

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
  profileImageUrl = 'https://cdn-icons-png.flaticon.com/512/7915/7915522.png', // Fashion boutique rack placeholder
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

  return (
    <Card
      padding="md"
      className="max-w-[300px] min-w-[250px] bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 font-sans"
    >
      {/* Profile Image */}
      <img
        src={profileImageUrl}
        alt={`${fullName} profile`}
        className="w-24 h-24 rounded-full object-cover mt-2"
      />

      {/* Influencer Details */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{fullName}</h2>
        {location ? (
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <MapPin size={16} />
            <span>{location}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 italic">Unknown location</p>
        )}
        <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
          <Users size={16} />
          <span>{followers} followers</span>
        </p>
        {instagramReach !== undefined && (
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <Instagram size={16} />
            <span>Reach (day): {instagramReach.toLocaleString()}</span>
          </p>
        )}
        <p className="text-sm text-gray-600 italic">{niche}</p>
        {gender && (
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <span>Gender: {gender}</span>
          </p>
        )}
        {instagramUsername && (
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-indigo-600 hover:underline"
            >
              <Instagram size={16} />
              <span>{instagramUsername}</span>
            </a>
          </p>
        )}
      </div>

      {/* Request Button */}
      {requestStatus === 'pending' ? (
        <Button
          variant="secondary"
          size="md"
          disabled
          className="px-6 py-2 flex items-center space-x-2 cursor-not-allowed"
          icon={<UserPlus size={20} />}
          iconPosition="left"
        >
          Requested
        </Button>
      ) : requestStatus === 'accepted' ? (
        <Button
          variant="primary"
          size="md"
          onClick={onTrackAds}
          className="px-6 py-2 flex items-center space-x-2"
        >
          Track Ads
        </Button>
      ) : (
        <Button
          variant="primary"
          size="md"
          onClick={onSendRequest}
          className="px-6 py-2 flex items-center space-x-2"
          icon={<UserPlus size={20} />}
          iconPosition="left"
        >
          Send Request
        </Button>
      )}
    </Card>
  );
};

export default InfluencerProfileCard;
