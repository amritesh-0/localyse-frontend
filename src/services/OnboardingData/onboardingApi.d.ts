export interface InfluencerOnboardingData {
  fullName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string | null;
  bio: string;
  state: string;
  city: string;
}

export interface BusinessOnboardingData {
  businessName: string;
  businessWebsite: string;
  industry: string;
  phoneNumber: string;
  state: string;
  city: string;
  additionalInfo: string;
}

export function getInfluencerOnboarding(): Promise<InfluencerOnboardingData>;
export function upsertInfluencerOnboarding(data: InfluencerOnboardingData): Promise<void>;

export function getBusinessOnboarding(): Promise<BusinessOnboardingData>;
export function upsertBusinessOnboarding(data: BusinessOnboardingData): Promise<void>;
