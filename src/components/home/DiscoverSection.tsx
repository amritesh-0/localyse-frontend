import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, DollarSign,Target, IndianRupee} from 'lucide-react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DiscoverSection = () => {
  const [activeTab, setActiveTab] = useState<'ads' | 'influencers'>('ads');

  // Mock data for ads
  const adsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      title: 'Local Coffee Shop Campaign',
      city: 'Mumbai',
      budget: '₹15,000',
      category: 'Food & Beverage',
      engagement: '2.4K'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      title: 'Fitness Studio Promotion',
      city: 'Delhi',
      budget: '₹25,000',
      category: 'Health & Fitness',
      engagement: '1.8K'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      title: 'Beauty Salon Launch',
      city: 'Bangalore',
      budget: '₹20,000',
      category: 'Beauty & Wellness',
      engagement: '3.1K'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      title: 'Restaurant Grand Opening',
      city: 'Pune',
      budget: '₹30,000',
      category: 'Food & Beverage',
      engagement: '2.7K'
    }
  ];

  // Mock data for influencers
  const influencersData = [
    {
      id: 1,
      profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      name: 'Priya Sharma',
      niche: 'Food & Lifestyle',
      followers: '45.2K',
      city: 'Mumbai',
      verified: true,
      engagement: '4.2%'
    },
    {
      id: 2,
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      name: 'Rahul Verma',
      niche: 'Fitness & Wellness',
      followers: '32.8K',
      city: 'Delhi',
      verified: true,
      engagement: '5.1%'
    },
    {
      id: 3,
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      name: 'Anjali Patel',
      niche: 'Beauty & Fashion',
      followers: '67.5K',
      city: 'Bangalore',
      verified: true,
      engagement: '3.8%'
    },
    {
      id: 4,
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      name: 'Vikram Singh',
      niche: 'Travel & Adventure',
      followers: '28.9K',
      city: 'Pune',
      verified: false,
      engagement: '6.2%'
    }
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold text-slate-900">
             Your City. Your Collab!
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Discover local ads & influencers in your city and start building local partnerships today.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="relative bg-slate-100 rounded-full p-1 inline-flex shadow-subtle">
            <motion.button
              onClick={() => setActiveTab('ads')}
              className={`relative w-48 px-8 py-3 rounded-full font-medium transition-all duration-300 z-10 flex items-center justify-center ${
                activeTab === 'ads'
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 mr-2" />
              Discover Ads
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('influencers')}
              className={`relative w-48 px-8 py-3 rounded-full font-medium transition-all duration-300 z-10 flex items-center justify-center ${
                activeTab === 'influencers'
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Discover Influencers
            </motion.button>
            
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-subtle"
              initial={false}
              animate={{
                x: activeTab === 'ads' ? 4 : '192px',
                width: '188px'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            {activeTab === 'ads' ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {adsData.map((ad, index) => (
                  <motion.div
                    key={ad.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <Card hover padding="none" className="h-full overflow-hidden flex flex-col">
                      <div className="relative">
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {ad.engagement}
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-2">
                          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
                            {ad.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2 flex-1">
                          {ad.title}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                            {ad.city}
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <IndianRupee className="w-4 h-4 mr-1 text-primary-500" />
                            Budget: {ad.budget}
                          </div>
                        </div>
                        
                        {/* Blurred overlay for non-logged users */}
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                          <Button 
                            size="md" 
                            className="shadow-lg cursor-pointer"
                            onClick={() => window.location.href = '/login'}
                          >
                           Apply
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {influencersData.map((influencer, index) => (
                  <motion.div
                    key={influencer.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <Card hover padding="lg" className="h-full text-center">
                      <div className="relative inline-block mb-6">
                        <img
                          src={influencer.profilePic}
                          alt={influencer.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                        {influencer.verified && (
                          <div className="absolute -top-1 -right-1 bg-primary-500 text-white rounded-full p-1 shadow-subtle">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {influencer.name}
                      </h3>
                      <p className="text-sm text-primary-600 font-medium mb-3">
                        {influencer.niche}
                      </p>
                      <div className="flex items-center justify-center text-sm text-slate-600 mb-2">
                        <Users className="w-4 h-4 mr-1 text-primary-500" />
                        {influencer.followers} followers
                      </div>
                      <div className="flex items-center justify-center text-sm text-slate-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                        {influencer.city}
                      </div>
                      <div className="flex items-center justify-center text-sm text-slate-600 mb-4">
                        <span className="inline-block bg-secondary-100 text-secondary-700 text-xs font-medium px-2 py-1 rounded-full">
                          {influencer.engagement} engagement
                        </span>
                      </div>
                      
                      {/* Blurred overlay for non-logged users */}
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                        <Button 
                          size="md" 
                          className="shadow-lg cursor-pointer"
                          onClick={() => window.location.href = '/login'}
                        >
                         Connect
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Button 
            size="lg"
            onClick={() => window.location.href = '/login'}
            className="cursor-pointer"
          >
            {activeTab === 'ads' ? 'View All Ads' : 'View All Influencers'}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default DiscoverSection;
