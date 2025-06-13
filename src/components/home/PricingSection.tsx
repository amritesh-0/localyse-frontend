import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';

const PricingSection = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Free',
      price: annual ? 0 : 0,
      period: annual ? '/year' : '/month',
      description: 'Perfect for small businesses just getting started with influencer marketing.',
      features: [
        '3 active campaigns',
        'Up to 5 influencer connections',
        'Basic analytics',
        'Email support',
      ],
      cta: 'Start for free',
      ctaVariant: 'outline' as const,
      highlighted: false,
    },
    {
      name: 'Pro',
      price: annual ? 299 : 29,
      period: annual ? '/year' : '/month',
      description: 'Ideal for growing businesses looking to scale their influencer marketing.',
      features: [
        'Unlimited active campaigns',
        'Up to 50 influencer connections',
        'Advanced analytics and reporting',
        'Campaign automation tools',
        'Priority email support',
        'Branded content approval',
      ],
      cta: 'Get started',
      ctaVariant: 'primary' as const,
      highlighted: true,
    },
    {
      name: 'Business',
      price: annual ? 999 : 99,
      period: annual ? '/year' : '/month',
      description: 'For established businesses with complex influencer marketing needs.',
      features: [
        'Unlimited active campaigns',
        'Unlimited influencer connections',
        'Custom analytics dashboard',
        'Advanced automation tools',
        'Dedicated account manager',
        'API access',
        'Contract management',
      ],
      cta: 'Contact sales',
      ctaVariant: 'secondary' as const,
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-bold text-slate-900">Pricing Plans</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Choose the perfect plan for your business needs with transparent pricing and no hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className={`text-sm ${annual ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
              Yearly (20% off)
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                annual ? 'bg-slate-200' : 'bg-primary-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                  annual ? 'translate-x-1' : 'translate-x-6'
                }`}
              />
            </button>
            <span className={`text-sm ${!annual ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
              Monthly
            </span>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`h-full flex flex-col ${
                  plan.highlighted ? 'border-2 border-primary-500 ring-4 ring-primary-100' : ''
                }`}
                padding="lg"
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary-500 px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                    <span className="ml-1 text-slate-600">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                </div>

                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="mr-2 mt-0.5 text-secondary-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.ctaVariant} fullWidth>
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;