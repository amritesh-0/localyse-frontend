export interface Application {
  _id: string;
  influencer?: {
    name: string;
    profileImage?: string;
  };
  influencerOnboarding?: {
    fullName?: string;
    city?: string;
    state?: string;
    instagramInsights?: {
      username?: string;
      followers_count?: number;
      profile_picture_url?: string;
    };
  };
  ad?: {
    campaignName: string;
    endDate?: string;
    budget?: number;
    platforms?: string[];
  };
  deadline?: string;
  budget?: number;
  message?: string;
  status?: string;
}

export interface FetchApplicationsResponse {
  success: boolean;
  applications: Application[];
}


export interface ApiResponse {
  success: boolean;
  message?: string;
  trackingId?: string;
}

export function fetchApplications(): Promise<FetchApplicationsResponse>;
export function acceptApplication(applicationId: string): Promise<ApiResponse>;
export function declineApplication(applicationId: string): Promise<ApiResponse>;
