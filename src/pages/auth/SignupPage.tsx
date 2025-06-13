import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User, Lock, ArrowRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { signup } from '../../services/authServices/signupLoginApi';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'business',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);
    setSuccessMessage('');
    
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const userData = {
          name: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          password: formData.password,
          type: formData.accountType,
        };
        await signup(userData);
        setSuccessMessage('Signup successful! Please verify your email.');
        setTimeout(() => {
          navigate('/verify-email', { state: { email: formData.email } });
        }, 2000);
      } catch (error: any) {
        if (error.message === 'User exists as influencer') {
          setErrors({ apiError: `User exists as influencer. Try login!` });
        } else if (error.message === 'User exists as business') {
          setErrors({ apiError: `User exists as business. Try login!` });
        } else if (error.message === 'User already exists') {
          setErrors({ apiError: `User exists. Try login!` });
        } else {
          setErrors({ apiError: error.message || 'Failed to signup' });
        }
      } finally {
        setLoading(false);
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
              src="https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg"
              alt="Sign up"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-300/10 backdrop-blur-sm" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8 text-white">
              <h2 className="text-2xl font-bold">Join Suzao Today</h2>
              <p className="mt-2">Create your account and start connecting with local influencers.</p>
            </div>
          </div>

          <div className="w-full p-8 lg:w-1/2 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
                <p className="mt-2 text-slate-600">
                  Join Suzao to connect businesses with local influencers
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-xl border p-4 ${
                        formData.accountType === 'business'
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value="business"
                        checked={formData.accountType === 'business'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-medium">Business</span>
                    </label>
                    
                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-xl border p-4 ${
                        formData.accountType === 'influencer'
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value="influencer"
                        checked={formData.accountType === 'influencer'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-medium">Influencer</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="First Name"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    icon={<User size={18} className="text-slate-400" />}
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  
                  <Input
                    label="Last Name"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    icon={<User size={18} className="text-slate-400" />}
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                </div>
                
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  icon={<Mail size={18} className="text-slate-400" />}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  icon={<Lock size={18} className="text-slate-400" />}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                
                <Input
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  icon={<Lock size={18} className="text-slate-400" />}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
                
                {errors.apiError && (
                  <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
                    {errors.apiError}
                  </div>
                )}

                {successMessage && (
                  <div className="mt-4 rounded bg-green-100 p-3 text-green-700">
                    {successMessage}
                  </div>
                )}
                
                <Button type="submit" fullWidth icon={<ArrowRight size={18} />} iconPosition="right" loading={loading}>
                  Create Account
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default SignupPage;
