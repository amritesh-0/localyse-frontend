import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { verifyOtp, resendOtp } from '../../services/authServices/verifyOtpApi';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    setIsVerifying(true);
    setError('');
    try {
      const response = await verifyOtp({ email, otp: otpString });
      setIsVerified(true);
      // Store token in localStorage for authentication
      localStorage.setItem('auth_token', response.token);
      setTimeout(() => {
        if (response.user.type === 'business') {
          navigate('/onboarding/business');
        } else if (response.user.type === 'influencer') {
          navigate('/onboarding/influencer');
        } else {
          navigate('/');
        }
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please try again.');
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setResendMessage('');
    setResendError('');
    try {
      await resendOtp({ email });
      setResendMessage('OTP email sent successfully.');
    } catch (err: any) {
      setResendError(err.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <Container size="sm" className="py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card padding="lg" className="mx-auto max-w-md text-center">
          {isVerified ? (
            <div className="flex flex-col items-center">
              <div className="mb-4 text-green-500">
                <CheckCircle size={64} />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-slate-900">Verification Successful!</h2>
              <p className="mb-6 text-slate-600">Your email has been verified. Redirecting you to the dashboard...</p>
            </div>
          ) : (
            <>
              <h1 className="mb-2 text-2xl font-bold text-slate-900">Verify your email</h1>
              <p className="mb-6 text-slate-600">
                Please enter the 6-digit verification code sent to
                <br />
                <strong className="text-slate-800">{email || 'your email address'}</strong>
              </p>
              <div className="mb-6">
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="h-12 w-12 rounded-lg border border-slate-300 bg-white text-center text-xl shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ))}
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
              <Button onClick={handleVerify} fullWidth disabled={isVerifying || otp.join('').length !== 6}>
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </Button>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  Resend OTP
                </button>
                {resendMessage && <p className="mt-2 text-sm text-green-600">{resendMessage}</p>}
                {resendError && <p className="mt-2 text-sm text-red-600">{resendError}</p>}
              </div>
              <div className="mt-6 text-center text-sm text-slate-600">
                <Link to="/verify-email" className="font-medium text-primary-600 hover:text-primary-500">
                  Return to previous step
                </Link>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </Container>
  );
};

export default VerifyOtp;
