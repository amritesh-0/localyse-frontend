export interface User {
  id: string;
  name: string;
  email: string;
  type?: 'influencer' | 'business';
}
