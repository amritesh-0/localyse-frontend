import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { forgotPassword } from '../../services/authServices/passwordApi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend forgot password API
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // Call backend forgot password API to resend
      await forgotPassword(email);
      // Show success message or update UI
    } catch (error) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <Container size="xl" className="flex min-h-screen items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-subtle"
        >
          {/* Left Column - Image */}
          <div className="relative hidden w-1/2 lg:block">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Forgot Password"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-300/10 backdrop-blur-sm" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8 text-white">
              <h2 className="text-2xl font-bold">Reset Your Password</h2>
              <p className="mt-2">We'll help you get back into your account securely.</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full p-8 lg:w-1/2 lg:p-12">
            <div className="mx-auto max-w-md">
              {/* Back to Login Link */}
              <Link
                to="/login"
                className="mb-8 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to login
              </Link>

              {!isSubmitted ? (
                <>
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                      <Mail size={32} className="text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Forgot your password?</h1>
                    <p className="mt-2 text-slate-600">
                      No worries! Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <Input
                      label="Email Address"
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      icon={<Mail size={18} className="text-slate-400" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={error}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      disabled={isLoading}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                    >
                      {isLoading ? (
                        <>
                          <svg className="mr-2 h-4 w-4 animate-spin\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4\" fill="none" />
                            <path className="opacity-75\" fill="currentColor\" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-slate-600">
                    Remember your password?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                      Sign in
                    </Link>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900">Check your email</h1>
                  <p className="mt-2 text-slate-600">
                    We've sent a password reset link to:
                    <br />
                    <strong className="text-slate-800">{email}</strong>
                  </p>

                  <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="flex items-start space-x-2">
                      <AlertCircle size={16} className="mt-0.5 text-slate-400" />
                      <div className="text-left">
                        <p className="font-medium">Didn't receive the email?</p>
                        <ul className="mt-1 space-y-1 text-slate-600">
                          <li>• Check your spam or junk folder</li>
                          <li>• Make sure you entered the correct email address</li>
                          <li>• The email may take a few minutes to arrive</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      onClick={handleResend}
                      variant="outline"
                      fullWidth
                      disabled={isLoading}
                    >
                      {isLoading ? 'Resending...' : 'Resend Email'}
                    </Button>

                    <Link to="/login">
                      <Button variant="primary" fullWidth>
                        Back to Login
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
