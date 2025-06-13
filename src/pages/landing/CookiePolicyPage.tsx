import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';

const CookiePolicyPage = () => {
  const sections = [
    {
      title: "Introduction",
      content: "This Cookie Policy explains how Suzao uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them."
    },
    {
      title: "What are cookies?",
      content: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Suzao) are called 'first-party cookies'. Cookies set by parties other than the website owner are called 'third-party cookies'. Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics)."
    },
    {
      title: "Why do we use cookies?",
      content: "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate, and we refer to these as 'essential' or 'strictly necessary' cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our platform. Third parties serve cookies through our platform for advertising, analytics, and other purposes.",
      subsections: [
        {
          title: "Essential cookies",
          content: "These cookies are strictly necessary to provide you with services available through our platform and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the platform, you cannot refuse them without impacting how our platform functions."
        },
        {
          title: "Performance and functionality cookies",
          content: "These cookies are used to enhance the performance and functionality of our platform but are non-essential to their use. However, without these cookies, certain functionality may become unavailable."
        },
        {
          title: "Analytics and customization cookies",
          content: "These cookies collect information that is used either in aggregate form to help us understand how our platform is being used or how effective our marketing campaigns are, or to help us customize our platform for you."
        },
        {
          title: "Advertising cookies",
          content: "These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests."
        },
        {
          title: "Social networking cookies",
          content: "These cookies are used to enable you to share pages and content on our platform through third-party social networking and other websites. These cookies may also be used for advertising purposes."
        }
      ]
    },
    {
      title: "How can you control cookies?",
      content: "You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in our cookie banner. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our platform though your access to some functionality and areas may be restricted.",
      subsections: [
        {
          title: "Browser controls",
          content: "Most browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information."
        }
      ]
    },
    {
      title: "How often will we update this Cookie Policy?",
      content: "We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies."
    },
    {
      title: "Where can you get further information?",
      content: "If you have any questions about our use of cookies or other technologies, please email us at privacy@suzao.com."
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
          <h1 className="mb-6 font-bold text-slate-900 text-center">Cookie Policy</h1>
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
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-slate-50 rounded-xl">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Cookie Preference Center</h3>
              <p className="text-slate-600 mb-4">
                You can manage your cookie preferences by selecting from the following categories:
              </p>
              
              <div className="space-y-3">
                {[
                  { id: 'essential', name: 'Essential Cookies', required: true },
                  { id: 'functional', name: 'Functional Cookies', required: false },
                  { id: 'analytics', name: 'Analytics Cookies', required: false },
                  { id: 'advertising', name: 'Advertising Cookies', required: false },
                ].map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                    <div>
                      <label htmlFor={category.id} className="font-medium text-slate-900">{category.name}</label>
                      <p className="text-sm text-slate-500">
                        {category.required ? 'Required for the platform to function properly' : 'Optional for enhanced experience'}
                      </p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={category.id}
                        defaultChecked={category.required}
                        disabled={category.required}
                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              For more information about our privacy practices, please review our{' '}
              <a href="/privacy-policy" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default CookiePolicyPage;