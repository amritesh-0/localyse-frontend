import { motion } from 'framer-motion';
import Container from '../ui/Container';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create your profile',
      description: 'Sign up and create a detailed profile with your business needs or influencer niche to enable precise matching.',
      color: 'bg-primary-500',
    },
    {
      number: '02',
      title: 'Get matched',
      description: 'Our AI algorithm pairs businesses with local influencers based on location, audience, and brand alignment.',
      color: 'bg-secondary-500',
    },
    {
      number: '03',
      title: 'Launch campaigns',
      description: 'Create, approve and launch influencer marketing campaigns with clear goals and expectations.',
      color: 'bg-accent-500',
    },
    {
      number: '04',
      title: 'Track results',
      description: 'Monitor campaign performance with real-time analytics and measure ROI across multiple metrics.',
      color: 'bg-primary-500',
    },
  ];

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
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-slate-50" id="how-it-works">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold text-slate-900">How Suzao Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Our simple, streamlined process connects businesses with local influencers in just a few steps.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {/* Connect steps with lines on desktop */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-16 hidden h-0.5 w-full translate-x-1/2 bg-slate-200 lg:block" />
              )}
              
              <div className="flex flex-col items-center">
                {/* Step number */}
                <div className={`${step.color} mb-6 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white`}>
                  {step.number}
                </div>
                
                {/* Step content */}
                <h3 className="mb-2 text-center text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="text-center text-slate-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default HowItWorks;