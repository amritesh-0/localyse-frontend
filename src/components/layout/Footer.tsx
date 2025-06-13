import { Link } from 'react-router-dom';
import Container from '../ui/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', path: '/features' },
        { label: 'Pricing', path: '/#pricing' },
        { label: 'How It Works', path: '/#how-it-works' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookie-policy' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 py-12 mt-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-xl font-bold text-primary-700">
              Localyse
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              Empowering local businesses with authentic, influencer-driven marketing. 
              Bridging local influence with business impact since 2025.
            </p>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-slate-900">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-slate-600">
              © {currentYear} Localyse. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {/* Social links would go here */}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
