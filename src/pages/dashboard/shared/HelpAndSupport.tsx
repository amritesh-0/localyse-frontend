import { motion } from 'framer-motion';
import { HelpCircle, Book, MessageSquare, Play, FileText } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const HelpAndSupport = () => {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <Play size={20} className="text-primary-500" />,
      items: [
        'Creating your profile',
        'Setting up your first campaign',
        'Finding relevant influencers',
        'Understanding analytics',
      ],
    },
    {
      title: 'Documentation',
      icon: <Book size={20} className="text-secondary-500" />,
      items: [
        'Platform features guide',
        'Campaign best practices',
        'API documentation',
        'Security & privacy',
      ],
    },
    {
      title: 'FAQs',
      icon: <HelpCircle size={20} className="text-accent-500" />,
      items: [
        'Billing questions',
        'Account management',
        'Influencer relationships',
        'Content guidelines',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
        <p className="text-slate-600">
          Find resources and get assistance with your Suzao experience.
        </p>
      </div>

      {/* Contact Support Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-primary-500 to-primary-700 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-semibold">Need personalized help?</h2>
              <p className="mt-2 max-w-md text-primary-100">
                Our support team is available 24/7 to assist with any questions or technical issues.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-primary-700">
                <MessageSquare size={16} className="mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-primary-700">
                Contact Us
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Help Categories */}
      <div className="grid gap-6 md:grid-cols-3">
        {helpCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="mb-4 flex items-center">
                <div className="mr-3">{category.icon}</div>
                <h3 className="text-lg font-medium text-slate-900">{category.title}</h3>
              </div>
              <ul className="space-y-2 text-slate-600">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <FileText size={14} className="mr-2 text-slate-400" />
                    <a href="#" className="text-sm hover:text-primary-600 hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <Button variant="outline" size="sm" fullWidth>
                  View All
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Video Tutorials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">Video Tutorials</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Getting Started with Suzao',
                duration: '5:32',
                thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                title: 'Creating Effective Campaigns',
                duration: '8:45',
                thumbnail: 'https://images.pexels.com/photos/5312914/pexels-photo-5312914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                title: 'Measuring Campaign Success',
                duration: '7:18',
                thumbnail: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
            ].map((video, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-sm">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md">
                      <Play size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-slate-900">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default HelpAndSupport;