import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';

const AboutPage = () => {
  return (
    <div className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 font-bold text-slate-900">About Localyse</h1>
          <p className="mb-12 text-lg text-slate-600">
            To democratize advertising for SMBs through hyperlocal influencer collaboration and campaign automation.
          </p>
        </motion.div>
        
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">Our Story</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Localyse was founded in 2025 with a simple but powerful vision: to bridge the gap between local businesses and the influential voices in their communities.
              </p>
              <p>
                We recognized that while large corporations had access to celebrity endorsements and national influencer campaigns, small and medium-sized businesses struggled to leverage the power of authentic, word-of-mouth marketing in the digital age.
              </p>
              <p>
                Our founders, having backgrounds in both local business ownership and digital marketing, saw an opportunity to create a platform that would democratize influencer marketing for businesses of all sizes.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">Our Mission</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                At Localyse, our mission is to democratize advertising for small and medium-sized businesses through hyperlocal influencer collaboration and campaign automation.
              </p>
              <p>
                We believe that authentic, community-based marketing creates more meaningful connections than traditional advertising. By enabling businesses to partner with relevant local influencers, we help create genuine relationships that drive real business results.
              </p>
              <p>
                Our platform is designed to make influencer marketing accessible, affordable, and effective for businesses of all sizes, while providing influencers with valuable partnership opportunities that align with their personal brand and values.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Authenticity',
                description: 'We believe in fostering genuine connections between businesses, influencers, and consumers.',
              },
              {
                title: 'Community',
                description: 'We prioritize local impact and building stronger, more connected communities through our platform.',
              },
              {
                title: 'Accessibility',
                description: 'We make powerful marketing tools and strategies available to businesses of all sizes.',
              },
              {
                title: 'Innovation',
                description: 'We continually evolve our technology to better serve the changing needs of our users.',
              },
              {
                title: 'Transparency',
                description: 'We maintain clear, honest communication with all stakeholders in our ecosystem.',
              },
              {
                title: 'Measurability',
                description: 'We provide meaningful analytics that demonstrate real business impact and ROI.',
              },
            ].map((value, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-subtle">
                <h3 className="mb-2 text-lg font-medium text-slate-900">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 p-8 text-white md:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-semibold">Join the Localyse Community</h2>
            <p className="mb-6 text-primary-100">
              Whether you're a local business looking to grow your customer base or an influencer wanting to partner with brands you believe in, Localyse is built for you.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                href="/signup"
                className="rounded-xl bg-white px-6 py-3 font-medium text-primary-700 shadow-sm transition-colors hover:bg-primary-50"
              >
                Create an Account
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-white bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AboutPage;