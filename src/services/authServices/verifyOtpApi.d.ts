export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

export function verifyOtp(data: VerifyOtpData): Promise<any>;

export function resendOtp(data: ResendOtpData): Promise<any>;
