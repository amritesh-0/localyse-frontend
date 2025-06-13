import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { login } from '../../services/authServices/signupLoginApi';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    setApiError('');
    setSuccessMessage('');

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const data = await login({ email, password });
        try {
          contextLogin(data.token, { _id: data._id, name: data.name, email: data.email, type: data.type }, rememberMe);
        } catch (tokenError) {
          console.error('Failed to set token:', tokenError);
          setApiError('Failed to save authentication token.');
          setLoading(false);
          return;
        }
        setSuccessMessage('Login successful! Redirecting...');
        setLoading(false);
        setTimeout(() => {
          if (data.redirectRoute) {
            navigate(data.redirectRoute);
          } else if (data.type === 'influencer') {
            navigate('/dashboard/influencer');
          } else if (data.type === 'business') {
            navigate('/dashboard/business');
          } else {
            navigate('/');
          }
        }, 2000);
      } catch (error: any) {
        setLoading(false);
        if (error.message === 'Email not verified') {
          navigate('/verify-otp', { state: { email } });
        } else {
          setApiError(error.message || 'Failed to login');
        }
        console.error('Login error:', error);
      }
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
          <div className="relative hidden w-1/2 lg:block">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
              alt="Login"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-300/10 backdrop-blur-sm" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8 text-white">
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="mt-2">Log in to your account to continue your journey with Suzao.</p>
            </div>
          </div>

          <div className="w-full p-8 lg:w-1/2 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
                <p className="mt-2 text-slate-600">
                  Log in to your account to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  icon={<Mail size={18} className="text-slate-400" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  icon={<Lock size={18} className="text-slate-400" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                
                {apiError && <p className="mt-2 text-sm text-red-600">{apiError}</p>}

                {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                
                <Button type="submit" fullWidth icon={<ArrowRight size={18} />} iconPosition="right" loading={loading}>
                  Log in
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Apple
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default LoginPage;
