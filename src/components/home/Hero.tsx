import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=2129&auto=format&fit=crop')] bg-cover bg-center opacity-10 z-0"></div>
      
      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white pt-8 md:pt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Connect <span className="text-yellow-300">Influencers</span> with <span className="text-yellow-300">Local Businesses</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
              Amplify your local reach with authentic partnerships. Localyse connects local influencers with local brands or businesses for authentic collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a
                href="/features"
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center">
              <div className="flex -space-x-2 mb-2 sm:mb-0">
                {[
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="User"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-center sm:text-left sm:ml-4 text-xs sm:text-sm opacity-90">Trusted by <span className="font-bold">1000+</span> influencers & businesses</p>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Influencer marketing collaboration"
                className="rounded-lg shadow-xl transform translate-x-4 translate-y-4 hover:-translate-y-2 transition-transform duration-500"
              />
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-48 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <p className="ml-2 font-semibold text-gray-800">Burger Bros</p>
                </div>
                <p className="text-sm text-gray-600">Campaign with @foodie_lisa increased foot traffic by 32%!</p>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-48 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center mb-2">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Influencer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="ml-2 font-semibold text-gray-800">@travelwithme</p>
                </div>
                <p className="text-sm text-gray-600">5 new partnerships this month!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;