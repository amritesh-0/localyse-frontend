import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  LineChart, 
  Users, 
  Megaphone, 
  Target, 
  Briefcase, 
  BarChart3,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card hover padding="lg" className="h-full">
        <div className="mb-4 rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center text-primary-600">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </Card>
    </motion.div>
  );
};

const FeatureSection = () => {
  const businessFeatures = [
    {
      title: 'Targeted Reach',
      description: 'Connect with local influencers who speak directly to your target audience',
      icon: <Target size={24} />,
    },
    {
      title: 'Campaign Analytics',
      description: 'Track performance metrics and ROI with our comprehensive dashboard',
      icon: <LineChart size={24} />,
    },
    {
      title: 'Automated Outreach',
      description: 'Save time with AI-powered influencer matching and campaign automation',
      icon: <Megaphone size={24} />,
    },
    {
      title: 'Brand Management',
      description: 'Maintain consistent brand messaging across all influencer partnerships',
      icon: <Briefcase size={24} />,
    },
  ];

  const influencerFeatures = [
    {
      title: 'Business Matching',
      description: 'Get paired with local businesses that align with your content and values',
      icon: <Users size={24} />,
    },
    {
      title: 'Performance Tracking',
      description: 'Monitor your campaign metrics and grow your influence over time',
      icon: <BarChart3 size={24} />,
    },
    {
      title: 'Communication Tools',
      description: 'Seamless messaging system to coordinate with businesses and manage requests',
      icon: <MessageSquare size={24} />,
    },
    {
      title: 'Campaign Calendar',
      description: 'Organize your content schedule and never miss a deadline',
      icon: <Calendar size={24} />,
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold text-slate-900">Powerful Features for Both Sides</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Our platform bridges the gap between local businesses and influencers with tools designed for seamless collaboration and measurable results.
          </p>
        </motion.div>

        {/* Business Features */}
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-2xl font-semibold text-primary-700"
          >
            For Businesses
          </motion.h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {businessFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Influencer Features */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-2xl font-semibold text-secondary-700"
          >
            For Influencers
          </motion.h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {influencerFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to="/features">
            <Button size="lg">
              Explore All Features
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeatureSection;