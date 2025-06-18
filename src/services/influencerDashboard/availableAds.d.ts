export interface Ad {
  _id: string;
  image?: { url: string };
  campaignName: string;
  campaignDescription: string;
  platforms: string[];
  taskCount: number;
  barterOrPaid: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  requirements?: string;
}

export function fetchAvailableAds(): Promise<{ success: boolean; ads: Ad[] }>;
export function fetchApplications(): Promise<any>;
export function applyForAd(adId: string, message: string): Promise<any>;
export function markAdNotInterested(adId: string, message: string): Promise<any>;
