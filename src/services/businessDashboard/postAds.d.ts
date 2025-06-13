export interface AdData {
  campaignName: string;
  platforms: string[];
  startDate: string;
  endDate: string;
  taskCount: string | number;
  barterOrPaid: 'barter' | 'paid';
  budget?: string | number;
  requirements?: string;
}

export interface Ad extends AdData {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export function postAd(adData: AdData): Promise<Ad>;
export function getAds(): Promise<Ad[]>;
