import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { resendOtp } from '../../services/authServices/verifyOtpApi';

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [location.state]);

  const handleResendCode = async () => {
    if (countdown === 0) {
      setIsResending(true);
      setError('');
      try {
        await resendOtp({ email });
        setCountdown(60);
      } catch (err: any) {
        setError(err.message || 'Failed to resend code');
      } finally {
        setIsResending(false);
      }
    }
  };

  const handleContinue = () => {
    navigate('/verify-otp', { state: { email } });
  };

  return (
    <Container size="sm" className="py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card padding="lg" className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <Mail size={32} className="text-primary-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-900">Check your email</h1>
          <p className="mb-6 text-slate-600">
            We've sent a verification code to:
            <br />
            <strong className="text-slate-800">{email || 'your email address'}</strong>
          </p>
          {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}
          <div className="mb-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            <p>Please check your inbox and click the verification link, or enter the verification code on the next screen.</p>
          </div>
          <Button onClick={handleContinue} fullWidth icon={<ArrowRight size={18} />} iconPosition="right">
            Enter verification code
          </Button>
          <div className="mt-6 text-center text-sm text-slate-600">
            Didn't receive an email?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={countdown > 0 || isResending}
              className={`font-medium ${countdown > 0 || isResending ? 'text-slate-500' : 'text-primary-600 hover:text-primary-500'}`}
            >
              {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
            </button>
          </div>
        </Card>
      </motion.div>
    </Container>
  );
};

export default VerifyEmailPage;
