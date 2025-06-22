import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import ScrollToTop from './components/layout/ScrollToTop';

// Landing Pages
import Home from './pages/landing/Home';
import AboutPage from './pages/landing/AboutPage';
import ContactPage from './pages/landing/ContactPage';
import FeaturesPage from './pages/landing/FeaturesPage';
import PrivacyPolicyPage from './pages/landing/PrivacyPolicyPage';
import TermsPage from './pages/landing/TermsPage';
import CookiePolicyPage from './pages/landing/CookiePolicyPage';

// Authentication Pages
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SignupPage from './pages/auth/SignupPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import VerifyOtp from './pages/auth/VerifyOtp';
import BusinessOnboarding from './pages/onboarding/BusinessOnboarding';
import InfluencerOnboarding from './pages/onboarding/InfluencerOnboarding';
import LinkSocials from './pages/onboarding/LinkSocials';

// Influencer Dashboard
import InfluencerDashboardLayout from './components/layout/InfluencerDashboardLayout';
import InfluencerOverview from './pages/dashboard/influencer/influencerOverview';
import InfluencerAds from './pages/dashboard/influencer/Ads';
import InfluencerRequests from './pages/dashboard/influencer/Requests';
import TrackCampaignInfluencer from './pages/dashboard/influencer/TrackCampaignInfluencer';
import InfluencerProfile from './pages/dashboard/influencer/influencerProfile';
import InfluencerHelp from './pages/dashboard/shared/HelpAndSupport';

// Shared Dashboard
import EmailSupport from './pages/dashboard/shared/EmailSupport';
import FeedbackBugs from './pages/dashboard/shared/FeedbackBugs';

// Business Dashboard
import BusinessDashboardLayout from './components/layout/BusinessDashboardLayout';
import BusinessOverview from './pages/dashboard/business/businessOverview';
import BusinessPostAds from './pages/dashboard/business/PostAds';
import BusinessApplications from './pages/dashboard/business/Applications';
import BusinessInfluencers from './pages/dashboard/business/AvailableInfluencers';
import BusinessProfile from './pages/dashboard/business/businessProfile';
import BusinessHelp from './pages/dashboard/shared/HelpAndSupport';
import TrackCampaignBusiness from './pages/dashboard/business/TrackCampaignBusiness';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';

function AppContent() {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && window.location.pathname === '/') {
      if (user.type === 'influencer') {
        navigate('/dashboard/influencer', { replace: true });
      } else if (user.type === 'business') {
        navigate('/dashboard/business', { replace: true });
      }
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
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
