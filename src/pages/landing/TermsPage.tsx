import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';

const TermsPage = () => {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content: "By accessing or using the Localyse platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily use the Localyse platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
      listItems: [
        "Modify or copy the materials",
        "Use the materials for any commercial purpose or for any public display",
        "Attempt to reverse engineer any software contained on the Localyse platform",
        "Remove any copyright or other proprietary notations from the materials",
        "Transfer the materials to another person or 'mirror' the materials on any other server"
      ]
    },
    {
      title: "3. Account Registration",
      content: "To access certain features of the platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account."
    },
    {
      title: "4. User Content",
      content: "Our platform allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post, including its legality, reliability, and appropriateness. By posting content, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such content on and through the platform."
    },
    {
      title: "5. Fees and Payment",
      content: "Some features of the platform may require payment of fees. You agree to provide accurate and complete payment information and to pay all charges incurred under your account at the prices in effect when such charges are incurred. You will also be responsible for paying any applicable taxes relating to such payments."
    },
    {
      title: "6. Intellectual Property",
      content: "The Localyse platform and its original content, features, and functionality are and will remain the exclusive property of Localyse and its licensors. The platform is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Localyse."
    },
    {
      title: "7. Termination",
      content: "We may terminate or suspend your account and bar access to the platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the platform or contact us to request account deletion."
    },
    {
      title: "8. Limitation of Liability",
      content: "In no event shall Localyse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the platform."
    },
    {
      title: "9. Disclaimer",
      content: "Your use of the platform is at your sole risk. The platform is provided on an 'AS IS' and 'AS AVAILABLE' basis. The platform is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance."
    },
    {
      title: "10. Governing Law",
      content: "These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
    },
    {
      title: "11. Changes to Terms",
      content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
    },
    {
      title: "12. Contact Us",
      content: "If you have any questions about these Terms, please contact us at legal@localyse.com."
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
          <h1 className="mb-6 font-bold text-slate-900 text-center">Terms of Service</h1>
          <p className="mb-8 text-slate-600 text-center">
            Last Updated: May 1, 2025
          </p>
          
          <div className="bg-white rounded-2xl shadow-subtle p-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                  <p className="text-slate-600">{section.content}</p>
                  
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
              By using the Localyse platform, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
            </p>
            <p className="mt-2">
              For any questions, please contact us at{' '}
              <a href="mailto:legal@localyse.com" className="text-primary-600 hover:underline">
                legal@localyse.com
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TermsPage;