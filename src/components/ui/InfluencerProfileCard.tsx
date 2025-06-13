import React from 'react';
import Card from './Card';
import Button from './Button';
import { UserPlus } from 'lucide-react';

import { Instagram } from 'lucide-react';

interface InfluencerProfileCardProps {
  profileImageUrl?: string;
  username: string;
  fullName: string;
  city: string;
  state: string;
  followers: string;
  niche: string;
  instagramReach?: number;
  gender?: string;
  onSendRequest?: () => void;
}

const InfluencerProfileCard: React.FC<InfluencerProfileCardProps> = ({
  profileImageUrl = 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', // Fashion boutique rack placeholder
  fullName,
  username,
  city,
  state,
  followers,
  niche,
  instagramReach,
  gender,
  onSendRequest,
}) => {
  return (
    <Card
      padding="md"
      className="max-w-[300px] min-w-[250px] bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 font-sans"
    >
      {/* Profile Image */}
      <img
        src={profileImageUrl}
        alt={`${username} profile`}
        className="w-24 h-24 rounded-full object-cover mt-2"
      />

      {/* Influencer Details */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{fullName}</h2>
        <p className="text-sm text-gray-600">{city},{state}</p>
        <p className="text-sm text-gray-600">{followers} followers</p>
        {instagramReach !== undefined && (
          <p className="text-sm text-gray-600">Reach (day): {instagramReach.toLocaleString()}</p>
        )}
        <p className="text-sm text-gray-600 italic">{niche}</p>
        {gender && <p className="text-sm text-gray-600">Gender: {gender}</p>}
        {username && (
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <a
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-indigo-600 hover:underline"
            >
              <Instagram size={16} />
              <span>{username}</span>
            </a>
          </p>
        )}
      </div>

      {/* Send Request Button */}
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
    </Card>
  );
};

export default InfluencerProfileCard;
