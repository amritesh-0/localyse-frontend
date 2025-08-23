import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye } from 'lucide-react';
import Container from '../ui/Container';

const PrivacyPolicySection = () => {
  const privacyFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-primary-600" />,
      title: "Secure",
      description: "Your data is protected with industry-standard encryption"
    },
    {
      icon: <Lock className="w-6 h-6 text-primary-600" />,
      title: "Private",
      description: "We never share your personal information without consent"
    },
    {
      icon: <Eye className="w-6 h-6 text-primary-600" />,
      title: "Transparent",
      description: "Clear policies on how we handle your information"
    }
  ];

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Your Privacy is Our Priority
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            We're committed to protecting your data with transparent, secure practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-5 shadow-subtle hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/privacy-policy"
            className="btn btn-primary inline-flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <span>Read Privacy Policy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default PrivacyPolicySection;
