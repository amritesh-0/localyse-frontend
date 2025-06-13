import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: "Introduction",
      content: "At Suzao, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
    },
    {
      title: "Information We Collect",
      content: "We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through the platform. This includes your name, email address, phone number, business information, payment information, and any other information you choose to provide.",
      subsections: [
        {
          title: "Personal Information",
          content: "Name, email address, telephone number, address, payment details, business information."
        },
        {
          title: "Usage Data",
          content: "Information on how you use the platform, including pages visited, time spent, clicks, and interactions with influencers or businesses."
        },
        {
          title: "Device Information",
          content: "Information about the device you use to access our platform, including hardware model, operating system, unique device identifiers, and mobile network information."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, including to:",
      listItems: [
        "Process transactions and send related information including confirmations and receipts",
        "Send administrative messages about your account, privacy and security updates, or other transactional information",
        "Respond to your comments, questions, and requests",
        "Provide customer service and technical support",
        "Personalize and improve the platform and provide content or features that match user profiles or interests",
        "Monitor and analyze trends, usage, and activities in connection with the platform",
        "Detect, investigate, and prevent fraudulent transactions and other illegal activities",
        "Comply with legal obligations"
      ]
    },
    {
      title: "Sharing Your Information",
      content: "We may share the personal information we collect in various ways, including:",
      subsections: [
        {
          title: "With Businesses and Influencers",
          content: "To facilitate connections and campaigns between businesses and influencers on our platform."
        },
        {
          title: "With Service Providers",
          content: "We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf."
        },
        {
          title: "For Legal Reasons",
          content: "We may disclose information if we believe in good faith that such disclosure is necessary to (a) comply with relevant laws or to respond to subpoenas or warrants served on us; or (b) protect or defend the rights, property, or safety of Suzao, users of the platform, or others."
        }
      ]
    },
    {
      title: "Your Choices",
      content: "You have several choices regarding the use of information on our platform:",
      listItems: [
        "Account Information: You may update, correct, or delete your account information at any time by logging into your account and modifying your profile.",
        "Marketing Communications: You can opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional emails.",
        "Cookies: Most web browsers are set to accept cookies by default. You can usually set your browser to remove or reject browser cookies."
      ]
    },
    {
      title: "Data Security",
      content: "We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the security of our systems or your information."
    },
    {
      title: "Children's Privacy",
      content: "Our platform is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information."
    },
    {
      title: "Changes to This Policy",
      content: "We may modify this Privacy Policy from time to time. If we make material changes, we will notify you by email or through the platform prior to the changes becoming effective. Your continued use of the platform after any changes indicates your acceptance of the modified Privacy Policy."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at privacy@suzao.com."
    }
  ];

  return (
    <div className="py-16">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 font-bold text-slate-900 text-center">Privacy Policy</h1>
          <p className="mb-8 text-slate-600 text-center">
            Last Updated: May 1, 2025
          </p>
          
          <div className="bg-white rounded-2xl shadow-subtle p-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                  <p className="text-slate-600">{section.content}</p>
                  
                  {section.subsections && (
                    <div className="space-y-4 pl-6 border-l-2 border-slate-100">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h3 className="text-lg font-medium text-slate-800">{subsection.title}</h3>
                          <p className="text-slate-600">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.listItems && (
                    <ul className="list-disc pl-6 space-y-2 text-slate-600">
                      {section.listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              For any privacy-related questions, please contact us at{' '}
              <a href="mailto:privacy@suzao.com" className="text-primary-600 hover:underline">
                privacy@suzao.com
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;