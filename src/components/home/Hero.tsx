import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="mb-8 inline-flex items-center space-x-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Star size={14} className="fill-primary-500 text-primary-500" />
              <span>Local influence, global impact</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="mb-6 max-w-4xl font-bold tracking-tight text-slate-900"
            variants={itemVariants}
          >
            Suzao – Bridging Local Influence with Business Impact
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="mb-10 max-w-2xl text-lg text-slate-600"
            variants={itemVariants}
          >
            Empowering local businesses with authentic, influencer-driven marketing.
            Connect with relevant local creators and drive meaningful engagement.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            variants={itemVariants}
          >
            <Link to="/signup">
              <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                Get Started
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button size="lg" variant="outline">
                Learn How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Stats/Trust indicators */}
          <motion.div 
            className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-200 pt-10 sm:grid-cols-4"
            variants={itemVariants}
          >
            {[
              { label: 'Local Businesses', value: '2,500+' },
              { label: 'Influencers', value: '10,000+' },
              { label: 'Campaigns', value: '15,000+' },
              { label: 'Revenue Generated', value: '$25M+' },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary-600 sm:text-3xl">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;