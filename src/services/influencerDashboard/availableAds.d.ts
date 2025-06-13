export interface Ad {
  _id: string;
  user: string;
  campaignName: string;
  platforms: string[];
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  taskCount: number;
  barterOrPaid: 'barter' | 'paid';
  budget?: number;
  requirements?: string;
  image?: {
    url?: string;
    public_id?: string;
  };
  campaignDescription?: string;
  hasApplied?: boolean;
  appliedInfluencers?: string[];
}

export function fetchAvailableAds(): Promise<{ success: boolean; ads: Ad[] }>;
export function applyForAd(adId: string): Promise<{ success: boolean; message: string }>;
export function markAdNotInterested(adId: string): Promise<{ success: boolean; message: string }>;
