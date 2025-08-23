import Hero from '../../components/home/Hero';
import FeatureSection from '../../components/home/FeatureSection';
import HowItWorks from '../../components/home/HowItWorks';
import PrivacyPolicySection from '../../components/home/PrivacyPolicySection';
import Testimonials from '../../components/home/Testimonials';
import PricingSection from '../../components/home/PricingSection';

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <PrivacyPolicySection />
      <Testimonials />
      <PricingSection />
    </>
  );
};

export default Home;