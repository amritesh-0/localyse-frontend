export interface LinkedSocials {
  instagram: boolean;
  instagram_linked: boolean;
  instagram_username?: string;
  instagram_account_type?: string;
  facebook: boolean;
  twitter: boolean;
  youtube: boolean;
  linkedin: boolean;
  tiktok: boolean;
  other: boolean;
}

export function fetchLinkedSocials(): Promise<LinkedSocials>;
