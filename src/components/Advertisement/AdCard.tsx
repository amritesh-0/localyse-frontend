import React from 'react';
import { Calendar, Hash, IndianRupee, Users, Trash2, Clock, Star, TrendingUp } from 'lucide-react';

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
    'instagram': 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border border-pink-200',
    'youtube': 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200',
    'facebook': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200',
    'twitter': 'bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 border border-sky-200',
    'tiktok': 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200',
  };
  return styles[platform.toLowerCase()] || 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200';
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
  let statusIcon = null;
  
  if (today < start) {
    statusText = 'Upcoming';
    statusClasses = 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200';
    statusIcon = <Clock size={12} />;
  } else if (isActive) {
    statusText = 'Active';
    statusClasses = 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200';
    statusIcon = <TrendingUp size={12} />;
  } else {
    statusText = 'Ended';
    statusClasses = 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200';
    statusIcon = <Star size={12} />;
  }

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden relative border border-slate-100 hover:border-primary-200 transform hover:-translate-y-1">
      {/* Status Badge */}
      <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-sm ${statusClasses}`}>
        {statusIcon}
        <span>{statusText}</span>
      </div>

      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg 
            hover:bg-red-50 hover:shadow-xl transition-all duration-300 opacity-0 
            group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 border border-red-100"
          aria-label="Delete campaign"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      )}

      {/* Header Section with Gradient */}
      <div className="relative">
        {ad.image ? (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={ad.image.url}
              alt={ad.campaignName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">
                {ad.campaignName}
              </h3>
            </div>
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative h-full flex items-center justify-center p-6">
              <h3 className="text-white text-xl font-bold text-center leading-tight drop-shadow-lg">
                {ad.campaignName}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col space-y-4">
        {/* Campaign Description */}
        {ad.campaignDescription && (
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {ad.campaignDescription}
          </p>
        )}

        {/* Platforms */}
        <div className="flex flex-wrap gap-2">
          {ad.platforms.map((platform) => (
            <span
              key={platform}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs 
                font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-md
                ${getPlatformStyle(platform)}`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          ))}
        </div>

        {/* Campaign Details Grid */}
        <div className="space-y-4 mt-auto">
          {/* Date Range */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-700">
                <Calendar size={16} className="text-primary-500" />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">
                  {formatDate(ad.startDate)} - {formatDate(ad.endDate)}
                </div>
                <div className="text-xs text-slate-500 flex items-center justify-end space-x-1">
                  <Clock size={12} />
                  <span>{duration} days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Count & Budget */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
              <div className="flex items-center space-x-2 mb-1">
                <Hash size={14} className="text-blue-500" />
                <span className="text-xs font-medium text-blue-700">Posts</span>
              </div>
              <div className="text-lg font-bold text-blue-900">{ad.taskCount}</div>
            </div>

            {ad.barterOrPaid === 'paid' && ad.budget ? (
              <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                <div className="flex items-center space-x-2 mb-1">
                  <IndianRupee size={14} className="text-green-500" />
                  <span className="text-xs font-medium text-green-700">Budget</span>
                </div>
                <div className="text-lg font-bold text-green-900">${ad.budget.toLocaleString()}</div>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Star size={14} className="text-amber-500" />
                  <span className="text-xs font-medium text-amber-700">Type</span>
                </div>
                <div className="text-sm font-bold text-amber-900">Barter</div>
              </div>
            )}
          </div>

          {/* Requirements */}
          {ad.requirements && (
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-start space-x-2">
                <Users size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium text-purple-700 mb-1">Requirements</div>
                  <div className="text-sm text-purple-900 leading-relaxed">{ad.requirements}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className={`py-3 px-6 text-center text-sm font-semibold border-t ${
        ad.barterOrPaid === 'paid' 
          ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-100' 
          : 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-100'
      }`}>
        <div className="flex items-center justify-center space-x-2">
          {ad.barterOrPaid === 'paid' ? (
            <>
              <IndianRupee size={16} />
              <span>Paid Campaign</span>
            </>
          ) : (
            <>
              <Star size={16} />
              <span>Barter Campaign</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCard;