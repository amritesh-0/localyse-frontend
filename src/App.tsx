import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

//layouts components
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const AuthLayout = lazy(() => import('./components/layout/AuthLayout'));
import BusinessDashboardLayout from './components/layout/BusinessDashboardLayout';
import InfluencerDashboardLayout from './components/layout/InfluencerDashboardLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import Loader from './components/ui/Loader';

// Landing Pages
const Home = lazy(() => import('./pages/landing/Home'));
const AboutPage = lazy(() => import('./pages/landing/AboutPage'));
const ContactPage = lazy(() => import('./pages/landing/ContactPage'));
const FeaturesPage = lazy(() => import('./pages/landing/FeaturesPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/landing/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/landing/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/landing/CookiePolicyPage'));

// Authentication Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const VerifyOtp = lazy(() => import('./pages/auth/VerifyOtp'));
const BusinessOnboarding = lazy(() => import('./pages/onboarding/BusinessOnboarding'));
const InfluencerOnboarding = lazy(() => import('./pages/onboarding/InfluencerOnboarding'));
const LinkSocials = lazy(() => import('./pages/onboarding/LinkSocials'));

import YouTubeInsights from './components/profile/YouTubeInsights';

// Influencer Dashboard
import InfluencerOverview from './pages/dashboard/influencer/influencerOverview';
import InfluencerAds from './pages/dashboard/influencer/Ads';
import InfluencerRequests from './pages/dashboard/influencer/Requests';
import TrackCampaignInfluencer from './pages/dashboard/influencer/TrackCampaignInfluencer';
import TrackPaymentInfluencer from './pages/dashboard/influencer/TrackPaymentInfluencer';
import InfluencerProfile from './pages/dashboard/influencer/influencerProfile';
import InfluencerHelp from './pages/dashboard/shared/HelpAndSupport';

// Shared Dashboard
import EmailSupport from './pages/dashboard/shared/EmailSupport';
import FeedbackBugs from './pages/dashboard/shared/FeedbackBugs';

// Business Dashboard
import BusinessOverview from './pages/dashboard/business/businessOverview';
import BusinessPostAds from './pages/dashboard/business/PostAds';
import BusinessApplications from './pages/dashboard/business/Applications';
import BusinessInfluencers from './pages/dashboard/business/AvailableInfluencers';
import BusinessProfile from './pages/dashboard/business/businessProfile';
import BusinessHelp from './pages/dashboard/shared/HelpAndSupport';
// @ts-ignore
import TrackCampaignBusiness from './pages/dashboard/business/TrackCampaignBusiness';
// @ts-ignore
import TrackPaymentBusiness from './pages/dashboard/business/TrackPaymentBusiness';

import { AuthProvider, useAuth } from './context/AuthContext';
// @ts-ignore
import ProtectedRoute from './utils/ProtectedRoute';

function AppContent() {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && window.location.pathname === '/' && (user as { type?: 'influencer' | 'business' }).type) {
      const typedUser = user as unknown as { type: 'influencer' | 'business' };
      if (typedUser.type === 'influencer') {
        navigate('/dashboard/influencer', { replace: true });
      } else if (typedUser.type === 'business') {
        navigate('/dashboard/business', { replace: true });
      }
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<Loader />}><MainLayout /></Suspense>
        }>
          <Route index element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<Loader />}><AboutPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<Loader />}><ContactPage /></Suspense>} />
          <Route path="features" element={<Suspense fallback={<Loader />}><FeaturesPage /></Suspense>} />
          <Route path="privacy-policy" element={<Suspense fallback={<Loader />}><PrivacyPolicyPage /></Suspense>} />
          <Route path="terms" element={<Suspense fallback={<Loader />}><TermsPage /></Suspense>} />
          <Route path="cookie-policy" element={<Suspense fallback={<Loader />}><CookiePolicyPage /></Suspense>} />
        </Route>
        <Route element={<Suspense fallback={<Loader />}><AuthLayout /></Suspense>}>
          <Route path="login" element={<Suspense fallback={<Loader />}><LoginPage /></Suspense>} />
          <Route path="forgot-password" element={<Suspense fallback={<Loader />}><ForgotPasswordPage /></Suspense>} />
          <Route path="reset-password" element={<Suspense fallback={<Loader />}><ResetPasswordPage /></Suspense>} />
          <Route path="signup" element={<Suspense fallback={<Loader />}><SignupPage /></Suspense>} />
          <Route path="verify-email" element={<Suspense fallback={<Loader />}><VerifyEmailPage /></Suspense>} />
          <Route path="verify-otp" element={<Suspense fallback={<Loader />}><VerifyOtp /></Suspense>} />
          <Route path="onboarding/business" element={<Suspense fallback={<Loader />}><BusinessOnboarding /></Suspense>} />
          <Route path="onboarding/influencer" element={<Suspense fallback={<Loader />}><InfluencerOnboarding /></Suspense>} />
          <Route path="onboarding/linksocials" element={<Suspense fallback={<Loader />}><LinkSocials /></Suspense>} />
          <Route path="youtube-insights" element={<Suspense fallback={<Loader />}><YouTubeInsights /></Suspense>} />
        </Route>
        {/* Influencer Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['influencer']} />}> 
          <Route path="dashboard/influencer" element={<InfluencerDashboardLayout />}> 
            <Route index element={<InfluencerOverview />} />
            <Route path='overview' element={<InfluencerOverview />} />
            <Route path="ads" element={<InfluencerAds />} />
            <Route path="requests" element={<InfluencerRequests />} />
            <Route path="track-campaign/:adId" element={<TrackCampaignInfluencer />} />
            <Route path="track-payment/:adId" element={<TrackPaymentInfluencer />} />
            <Route path="profile" element={<InfluencerProfile />} />
            <Route path="help" element={<InfluencerHelp />} />
            <Route path="support/email" element={<EmailSupport />} />
            <Route path="feedback-bugs" element={<FeedbackBugs />} />
          </Route>
        </Route>
        {/* Business Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['business']} />}> 
          <Route path="dashboard/business" element={<BusinessDashboardLayout />}> 
            <Route index element={<BusinessOverview />} />
            <Route path='overview' element={<BusinessOverview/>} />
            <Route path="post-ads" element={<BusinessPostAds />} />
            <Route path="applications" element={<BusinessApplications />} />
            <Route path="influencers" element={<BusinessInfluencers />} />
            <Route path="profile" element={<BusinessProfile />} />
            <Route path="help" element={<BusinessHelp />} />
            <Route path="track-campaign/:adId" element={<TrackCampaignBusiness />} />
            <Route path="track-payment/:adId" element={<TrackPaymentBusiness />} />
            <Route path="support/email" element={<EmailSupport />} />
            <Route path="feedback-bugs" element={<FeedbackBugs />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
