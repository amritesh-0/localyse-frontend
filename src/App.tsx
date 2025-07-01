import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

//layouts components
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const AuthLayout = lazy(() => import('./components/layout/AuthLayout'));
const BusinessDashboardLayout = lazy(() => import('./components/layout/BusinessDashboardLayout'));
const InfluencerDashboardLayout = lazy(() => import('./components/layout/InfluencerDashboardLayout'));
import ScrollToTop from './components/layout/ScrollToTop';

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

// Influencer Dashboard
const InfluencerOverview = lazy(() => import('./pages/dashboard/influencer/influencerOverview'));
const InfluencerAds = lazy(() => import('./pages/dashboard/influencer/Ads'));
const InfluencerRequests = lazy(() => import('./pages/dashboard/influencer/Requests'));
const TrackCampaignInfluencer = lazy(() => import('./pages/dashboard/influencer/TrackCampaignInfluencer'));
const TrackPaymentInfluencer = lazy(() => import('./pages/dashboard/influencer/TrackPaymentInfluencer'));
const InfluencerProfile = lazy(() => import('./pages/dashboard/influencer/influencerProfile'));
const InfluencerHelp = lazy(() => import('./pages/dashboard/shared/HelpAndSupport'));

// Shared Dashboard
const EmailSupport = lazy(() => import('./pages/dashboard/shared/EmailSupport'));
const FeedbackBugs = lazy(() => import('./pages/dashboard/shared/FeedbackBugs'));

// Business Dashboard
const BusinessOverview = lazy(() => import('./pages/dashboard/business/businessOverview'));
const BusinessPostAds = lazy(() => import('./pages/dashboard/business/PostAds'));
const BusinessApplications = lazy(() => import('./pages/dashboard/business/Applications'));
const BusinessInfluencers = lazy(() => import('./pages/dashboard/business/AvailableInfluencers'));
const BusinessProfile = lazy(() => import('./pages/dashboard/business/businessProfile'));
const BusinessHelp = lazy(() => import('./pages/dashboard/shared/HelpAndSupport'));
// @ts-ignore
const TrackCampaignBusiness = lazy(() => import('./pages/dashboard/business/TrackCampaignBusiness'));
const TrackPaymentBusiness = lazy(() => import('./pages/dashboard/business/TrackPaymentBusiness'));

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
        <div className="loader">...</div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="loader"></div></div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="cookie-policy" element={<CookiePolicyPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="verify-otp" element={<VerifyOtp />} />
            <Route path="onboarding/business" element={<BusinessOnboarding />} />
            <Route path="onboarding/influencer" element={<InfluencerOnboarding />} />
            <Route path="onboarding/linksocials" element={<LinkSocials />} />
          </Route>

          {/* Influencer Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['influencer']} />}>
            <Route path="dashboard/influencer" element={<InfluencerDashboardLayout />}>
              <Route index element={<InfluencerOverview />} />
              <Route path='overview' element={< InfluencerOverview />} />
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
              <Route path='overview' element={< BusinessOverview/>} />
              <Route path="post-ads" element={<BusinessPostAds />} />
              <Route path="applications" element={<BusinessApplications />} />
              <Route path="influencers" element={<BusinessInfluencers />} />
              <Route path="profile" element={<BusinessProfile />} />
              <Route path="help" element={<BusinessHelp />} />
              <Route path="support/email" element={<EmailSupport />} />
              <Route path="feedback-bugs" element={<FeedbackBugs />} />
              <Route path="track-campaign/:adId" element={<TrackCampaignBusiness />} />
              <Route path="track-payment/:adId" element={<TrackPaymentBusiness />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
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
