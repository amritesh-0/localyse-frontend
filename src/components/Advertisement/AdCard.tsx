import React from 'react';
import { Calendar, Hash, DollarSign, Users, Trash2, Clock } from 'lucide-react';

interface AdCardProps {
  ad: {
    _id: string;
    campaignName: string;
    startDate: string;
    endDate: string;
    platforms: string[];
    taskCount: number;
    barterOrPaid: string;
    budget?: number;
    requirements?: string;
    image?: {
      url: string;
      public_id: string;
    };
    campaignDescription?: string;
  };
  onDelete?: (id: string) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};

const getDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const isCampaignActive = (startDate: string, endDate: string): boolean => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

const getPlatformStyle = (platform: string): string => {
  const styles: Record<string, string> = {
    'instagram': 'bg-indigo-100 text-indigo-800',
    'youtube': 'bg-rose-100 text-rose-800',
    'facebook': 'bg-blue-100 text-blue-800',
    'twitter': 'bg-sky-100 text-sky-800',
  };
  return styles[platform.toLowerCase()] || 'bg-slate-100 text-slate-800';
};

const AdCard: React.FC<AdCardProps> = ({ ad, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(ad._id);
    }
  };

  const isActive = isCampaignActive(ad.startDate, ad.endDate);
  const today = new Date();
  const start = new Date(ad.startDate);
  const duration = getDaysBetween(ad.startDate, ad.endDate);
  
  let statusText = '';
  let statusClasses = '';
  
  if (today < start) {
    statusText = 'Upcoming';
    statusClasses = 'bg-amber-100 text-amber-800';
  } else if (isActive) {
    statusText = 'Active';
    statusClasses = 'bg-emerald-100 text-emerald-800';
  } else {
    statusText = 'Ended';
    statusClasses = 'bg-slate-100 text-slate-700';
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col overflow-hidden relative">
      {/* Status Badge */}
      <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses}`}>
        {statusText}
      </div>

      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 z-10 bg-white/90 p-1.5 rounded-full shadow-sm 
            hover:bg-red-50 hover:shadow transition-all duration-300 opacity-0 
            group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
          aria-label="Delete campaign"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      )}

      {/* Image Section */}
      {/* {ad.image ? ( */}
        <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
          <img
            src={ad.image?.url || ''}
            alt={ad.campaignName}
            className="absolute top-0 left-0 w-full h-full object-cover 
              transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full p-4">
            <h3 className="text-white text-xl font-semibold line-clamp-2 text-shadow">
              {ad.campaignName}
            </h3>
          </div>
        </div>
      {/* // )
      //  : (
      //   <div className="h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl flex items-center px-6">
      //     <h3 className="text-white text-xl font-semibold">{ad.campaignName}</h3>
      //   </div>
      // )
      // } */}

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col">
        {!ad.image && (
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{ad.campaignName}</h3>
        )}
        
        {ad.campaignDescription && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {ad.campaignDescription}
          </p>
        )}

        {/* Campaign Details */}
        <div className="space-y-3 text-sm mt-auto">
          {/* Platforms */}
          <div className="flex flex-wrap gap-2">
            {ad.platforms.map((platform) => (
              <span
                key={platform}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                  font-medium transform transition-transform duration-300 hover:scale-105
                  ${getPlatformStyle(platform)}`}
              >
                {platform}
              </span>
            ))}
          </div>

          {/* Duration */}
          <div className="flex justify-between items-center text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-500" />
              <span>{formatDate(ad.startDate)} - {formatDate(ad.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock size={16} className="text-slate-500" />
              <span>{duration} days</span>
            </div>
          </div>

          {/* Task Count */}
          <div className="flex items-center gap-2 text-slate-700">
            <Hash size={16} className="text-slate-500" />
            <span>{ad.taskCount} {ad.taskCount === 1 ? 'post' : 'posts'} required</span>
          </div>

          {/* Budget - Highlight if paid */}
          {ad.barterOrPaid === 'paid' && ad.budget && (
            <div className="flex items-center gap-2 font-medium text-indigo-700">
              <DollarSign size={16} className="text-indigo-600" />
              <span>${ad.budget.toLocaleString()}</span>
            </div>
          )}

          {/* Requirements */}
          {ad.requirements && (
            <div className="flex items-center gap-2 text-slate-700">
              <Users size={16} className="text-slate-500" />
              <span className="line-clamp-1">{ad.requirements}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar - Campaign Type */}
      <div className={`py-2 px-5 text-center text-sm font-medium ${
        ad.barterOrPaid === 'paid' 
          ? 'bg-emerald-50 text-emerald-700' 
          : 'bg-amber-50 text-amber-700'
      }`}>
        {ad.barterOrPaid === 'paid' ? 'Paid Campaign' : 'Barter Campaign'}
      </div>
    </div>
  );
};

export default AdCard;