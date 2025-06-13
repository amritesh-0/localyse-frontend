import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { resetPassword } from '../../services/authServices/passwordApi';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Call backend reset password API
        await resetPassword(token, formData.password);
        setIsSuccess(true);
        
        // Redirect to login after success
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setErrors({ general: error.message || 'Failed to reset password. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Check if token is valid
  if (!token) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <Container size="sm">
          <Card className="text-center p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle size={32} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Reset Link</h1>
            <p className="text-slate-600 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link to="/forgot-password">
              <Button variant="primary">Request New Link</Button>
            </Link>
          </Card>
        </Container>
      </div>
    );
  }

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
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Reset Password"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-300/10 backdrop-blur-sm" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8 text-white">
              <h2 className="text-2xl font-bold">Create New Password</h2>
              <p className="mt-2">Choose a strong password to secure your account.</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full p-8 lg:w-1/2 lg:p-12">
            <div className="mx-auto max-w-md">
              {!isSuccess ? (
                <>
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                      <Lock size={32} className="text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
                    <p className="mt-2 text-slate-600">
                      Enter your new password below. Make sure it's strong and secure.
                    </p>
                  </div>

                  {errors.general && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle size={16} className="text-red-500" />
                        <p className="text-sm text-red-700">{errors.general}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                      <Input
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        icon={<Lock size={18} className="text-slate-400" />}
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div className="relative">
                      <Input
                        label="Confirm New Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        icon={<Lock size={18} className="text-slate-400" />}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password Requirements */}
                    <div className="rounded-lg bg-slate-50 p-4 text-sm">
                      <p className="font-medium text-slate-700 mb-2">Password requirements:</p>
                      <ul className="space-y-1 text-slate-600">
                        <li className={`flex items-center space-x-2 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                          <CheckCircle size={14} className={formData.password.length >= 8 ? 'text-green-500' : 'text-slate-400'} />
                          <span>At least 8 characters</span>
                        </li>
                        <li className={`flex items-center space-x-2 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : ''}`}>
                          <CheckCircle size={14} className={/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : 'text-slate-400'} />
                          <span>Upper and lowercase letters</span>
                        </li>
                        <li className={`flex items-center space-x-2 ${/(?=.*\d)/.test(formData.password) ? 'text-green-600' : ''}`}>
                          <CheckCircle size={14} className={/(?=.*\d)/.test(formData.password) ? 'text-green-500' : 'text-slate-400'} />
                          <span>At least one number</span>
                        </li>
                      </ul>
                    </div>

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
                          Resetting...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </form>
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
                  <h1 className="text-3xl font-bold text-slate-900">Password Reset Successful!</h1>
                  <p className="mt-2 text-slate-600">
                    Your password has been successfully reset. You can now log in with your new password.
                  </p>
                  
                  <div className="mt-6">
                    <Link to="/login">
                      <Button variant="primary" fullWidth>
                        Continue to Login
                      </Button>
                    </Link>
                  </div>
                  
                  <p className="mt-4 text-sm text-slate-500">
                    Redirecting you to login in 3 seconds...
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
// =======
// import { useState } from 'react';
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
// import Container from '../../components/ui/Container';
// import Card from '../../components/ui/Card';
// import Input from '../../components/ui/Input';
// import Button from '../../components/ui/Button';
// import { resetPassword } from '../../services/authServices/passwordApi';

// const ResetPasswordPage = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get('token');
  
//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       setIsLoading(true);
      
//       try {
//         // Call backend reset password API
//         await resetPassword(token, formData.password);
//         setIsSuccess(true);
        
//         // Redirect to login after success
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       } catch (error) {
//         setErrors({ general: error.message || 'Failed to reset password. Please try again.' });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Check if token is valid
//   if (!token) {
//     return (
//       <div className="min-h-screen bg-primary-50 flex items-center justify-center">
//         <Container size="sm">
//           <Card className="text-center p-8">
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
//               <AlertCircle size={32} className="text-red-600" />
//             </div>
//             <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Reset Link</h1>
//             <p className="text-slate-600 mb-6">
//               This password reset link is invalid or has expired. Please request a new one.
//             </p>
//             <Link to="/forgot-password">
//               <Button variant="primary">Request New Link</Button>
//             </Link>
//           </Card>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-primary-50">
//       <Container size="xl" className="flex min-h-screen items-center justify-center py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-subtle"
//         >
//           {/* Left Column - Image */}
//           <div className="relative hidden w-1/2 lg:block">
//             <img
//               src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               alt="Reset Password"
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-primary-300/10 backdrop-blur-sm" />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8 text-white">
//               <h2 className="text-2xl font-bold">Create New Password</h2>
//               <p className="mt-2">Choose a strong password to secure your account.</p>
//             </div>
//           </div>

//           {/* Right Column - Form */}
//           <div className="w-full p-8 lg:w-1/2 lg:p-12">
//             <div className="mx-auto max-w-md">
//               {!isSuccess ? (
//                 <>
//                   <div className="text-center">
//                     <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
//                       <Lock size={32} className="text-primary-600" />
//                     </div>
//                     <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
//                     <p className="mt-2 text-slate-600">
//                       Enter your new password below. Make sure it's strong and secure.
//                     </p>
//                   </div>

//                   {errors.general && (
//                     <div className="mt-6 rounded-lg bg-red-50 p-4">
//                       <div className="flex items-center space-x-2">
//                         <AlertCircle size={16} className="text-red-500" />
//                         <p className="text-sm text-red-700">{errors.general}</p>
//                       </div>
//                     </div>
//                   )}

//                   <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//                     <div className="relative">
//                       <Input
//                         label="New Password"
//                         type={showPassword ? 'text' : 'password'}
//                         id="password"
//                         name="password"
//                         placeholder="••••••••"
//                         icon={<Lock size={18} className="text-slate-400" />}
//                         value={formData.password}
//                         onChange={handleChange}
//                         error={errors.password}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
//                       >
//                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </div>

//                     <div className="relative">
//                       <Input
//                         label="Confirm New Password"
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         placeholder="••••••••"
//                         icon={<Lock size={18} className="text-slate-400" />}
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         error={errors.confirmPassword}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
//                       >
//                         {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </div>

//                     {/* Password Requirements */}
//                     <div className="rounded-lg bg-slate-50 p-4 text-sm">
//                       <p className="font-medium text-slate-700 mb-2">Password requirements:</p>
//                       <ul className="space-y-1 text-slate-600">
//                         <li className={`flex items-center space-x-2 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
//                           <CheckCircle size={14} className={formData.password.length >= 8 ? 'text-green-500' : 'text-slate-400'} />
//                           <span>At least 8 characters</span>
//                         </li>
//                         <li className={`flex items-center space-x-2 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : ''}`}>
//                           <CheckCircle size={14} className={/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : 'text-slate-400'} />
//                           <span>Upper and lowercase letters</span>
//                         </li>
//                         <li className={`flex items-center space-x-2 ${/(?=.*\d)/.test(formData.password) ? 'text-green-600' : ''}`}>
//                           <CheckCircle size={14} className={/(?=.*\d)/.test(formData.password) ? 'text-green-500' : 'text-slate-400'} />
//                           <span>At least one number</span>
//                         </li>
//                       </ul>
//                     </div>

//                     <Button
//                       type="submit"
//                       fullWidth
//                       disabled={isLoading}
//                       className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
//                     >
//                       {isLoading ? (
//                         <>
//                           <svg className="mr-2 h-4 w-4 animate-spin\" viewBox="0 0 24 24">
//                             <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4\" fill="none" />
//                             <path className="opacity-75\" fill="currentColor\" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                           </svg>
//                           Resetting...
//                         </>
//                       ) : (
//                         'Reset Password'
//                       )}
//                     </Button>
//                   </form>
//                 </>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-center"
//                 >
//                   <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//                     <CheckCircle size={32} className="text-green-600" />
//                   </div>
//                   <h1 className="text-3xl font-bold text-slate-900">Password Reset Successful!</h1>
//                   <p className="mt-2 text-slate-600">
//                     Your password has been successfully reset. You can now log in with your new password.
//                   </p>
                  
//                   <div className="mt-6">
//                     <Link to="/login">
//                       <Button variant="primary" fullWidth>
//                         Continue to Login
//                       </Button>
//                     </Link>
//                   </div>
                  
//                   <p className="mt-4 text-sm text-slate-500">
//                     Redirecting you to login in 3 seconds...
//                   </p>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </Container>
//     </div>
//   );
// };

// export default ResetPasswordPage;
