import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Globe, BarChart2, Users, Calendar, Zap, ShieldCheck, MessageSquare } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const FeatureSection = ({ title, description, features, image, reversed = false }: { 
  title: string;
  description: string;
  features: { title: string; description: string }[];
  image: string;
  reversed?: boolean;
}) => {
  return (
    <div className={`grid gap-12 items-center md:grid-cols-2 ${reversed ? 'md:grid-flow-dense' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: reversed ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-slate-600 mb-6">{description}</p>
        
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <CheckCircle className="h-6 w-6 text-secondary-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: reversed ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${reversed ? 'md:order-first' : ''}`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </motion.div>
    </div>
  );
};

const FeaturesPage = () => {
  const sections = [
    {
      title: "Hyperlocal Matching Technology",
      description: "Our AI-powered matching system connects businesses with the perfect local influencers based on geography, audience demographics, and brand alignment.",
      features: [
        {
          title: "Geographic Precision",
          description: "Target influencers within specific neighborhoods, cities, or regions"
        },
        {
          title: "Audience Alignment",
          description: "Match with influencers whose followers match your ideal customer profile"
        },
        {
          title: "Interest-Based Pairing",
          description: "Connect with creators who share your brand's values and aesthetics"
        }
      ],
      image: "https://images.pexels.com/photos/7709293/pexels-photo-7709293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      icon: <Globe />
    },
    {
      title: "Comprehensive Analytics Dashboard",
      description: "Track every aspect of your campaigns with real-time data visualizations and actionable insights that demonstrate clear ROI.",
      features: [
        {
          title: "Engagement Metrics",
          description: "Monitor likes, comments, shares, and saves across all campaign content"
        },
        {
          title: "Conversion Tracking",
          description: "Measure click-through rates and conversions from influencer content"
        },
        {
          title: "Audience Growth",
          description: "Track follower increases and audience demographic changes"
        }
      ],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      reversed: true,
      icon: <BarChart2 />
    },
    {
      title: "Automated Campaign Management",
      description: "Streamline your workflow with tools that automate outreach, approvals, scheduling, and payments.",
      features: [
        {
          title: "Influencer Outreach",
          description: "Automatically contact matched influencers with campaign details"
        },
        {
          title: "Content Approval System",
          description: "Review and approve influencer content before it goes live"
        },
        {
          title: "Payment Processing",
          description: "Securely manage influencer compensation with escrow protection"
        }
      ],
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      icon: <Calendar />
    },
    {
      title: "Community Building Tools",
      description: "Foster long-term relationships between businesses and influencers with our suite of community management features.",
      features: [
        {
          title: "Influencer Relationship Management",
          description: "Track engagement history and manage ongoing partnerships"
        },
        {
          title: "Feedback and Rating System",
          description: "Build trust through transparent reviews from both parties"
        },
        {
          title: "Collaboration Opportunities",
          description: "Discover and participate in multi-business campaigns and events"
        }
      ],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      reversed: true,
      icon: <Users />
    }
  ];

  const additionalFeatures = [
    {
      title: "Smart Content Suggestions",
      description: "AI-powered recommendations for campaign messaging and content formats",
      icon: <Zap className="w-8 h-8 text-primary-500" />
    },
    {
      title: "Secure Contract Management",
      description: "Digital agreements with e-signatures for clear terms and expectations",
      icon: <ShieldCheck className="w-8 h-8 text-primary-500" />
    },
    {
      title: "In-Platform Messaging",
      description: "Direct communication between businesses and influencers within Suzao",
      icon: <MessageSquare className="w-8 h-8 text-primary-500" />
    },
    {
      title: "Multi-Channel Campaigns",
      description: "Coordinate content across Instagram, TikTok, YouTube, and more",
      icon: <Globe className="w-8 h-8 text-primary-500" />
    }
  ];

  return (
    <div className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h1 className="mb-6 font-bold text-slate-900">Platform Features</h1>
          <p className="text-lg text-slate-600">
            Discover how Suzao's powerful features help businesses and influencers create meaningful connections and impactful campaigns.
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {sections.map((section, index) => (
            <FeatureSection
              key={index}
              title={section.title}
              description={section.description}
              features={section.features}
              image={section.image}
              reversed={section.reversed}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-12">More Powerful Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-subtle text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 p-12 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to experience Suzao?</h2>
          <p className="mx-auto max-w-2xl mb-8 text-primary-100">
            Start connecting with local influencers or businesses today and see the impact of authentic, community-based marketing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default FeaturesPage;