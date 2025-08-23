// import { Link, useLocation } from 'react-router-dom';
// import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
// import Container from '../ui/Container';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const location = useLocation();

//   const footerLinks = [
//     {
//       title: 'Product',
//       links: [
//         { label: 'Features', path: '/features' },
//         { label: 'Pricing', path: '/#pricing' },
//         { label: 'How It Works', path: '/#how-it-works' },
//       ],
//     },
//     {
//       title: 'Company',
//       links: [
//         { label: 'About', path: '/about' },
//         { label: 'Contact', path: '/contact' },
//       ],
//     },
//     {
//       title: 'Legal',
//       links: [
//         { label: 'Privacy Policy', path: '/privacy-policy' },
//         { label: 'Terms of Service', path: '/terms' },
//         { label: 'Cookie Policy', path: '/cookie-policy' },
//       ],
//     },
//   ];

//   return (
//     <footer className="bg-slate-50 py-12 mt-20">
//       <Container>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
//           {/* Logo and description */}
//           <div className="lg:col-span-2">
//             <Link to="/" className="text-xl font-bold text-primary-700">
//               Localyse
//             </Link>
//             <p className="mt-4 max-w-md text-sm text-slate-600">
//               Localyse is a platform that connects local influencers with local businesses or brands for authentic collaborations.
//             </p>
//             <p className="mt-2 text-sm text-slate-500">
//               Our mission is to empower local communities by fostering genuine partnerships that drive growth and engagement. 
//               </p>
            
//           </div>

//           {/* Footer links */}
//           {footerLinks.map((section) => (
//             <div key={section.title}>
//               <h4 className="font-medium text-slate-900">{section.title}</h4>
//               <ul className="mt-4 space-y-2">
//                 {section.links.map((link) => {
//                   // For Pricing and How It Works links, conditionally render anchor or Link based on current path
//                   if (
//                     (link.label === 'Pricing' || link.label === 'How It Works') &&
//                     location.pathname === '/'
//                   ) {
//                     // Render anchor tag for smooth scroll on home page
//                     const anchorHref = link.label === 'Pricing' ? '#pricing' : '#how-it-works';
//                     return (
//                       <li key={link.path}>
//                         <a
//                           href={anchorHref}
//                           className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
//                         >
//                           {link.label}
//                         </a>
//                       </li>
//                     );
//                   } else {
//                     // Render Link for other cases
//                     return (
//                       <li key={link.path}>
//                         <Link
//                           to={link.path}
//                           className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
//                         >
//                           {link.label}
//                         </Link>
//                       </li>
//                     );
//                   }
//                 })}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="mt-12 border-t border-slate-200 pt-6">
//           <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
//             <p className="text-sm text-slate-600">
//               © {currentYear} Localyse. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a
//                 href="https://www.instagram.com/localyse.in/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
//               >
//                 <Instagram size={20} />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="X"
//                 className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
//               >
//                 <Twitter size={20} />
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/localyse-in/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
//               >
//                 <Linkedin size={20} />
//               </a>
//               <a
//                 href="https://www.facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
//               >
//                 <Facebook size={20} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

import { Link, useLocation } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import Container from '../ui/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

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
              Localyse is a platform that connects local influencers with local businesses or brands for authentic collaborations.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Our mission is to empower local communities by fostering genuine partnerships that drive growth and engagement.
            </p>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-slate-900">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => {
                  // Special handling for Pricing & How It Works (smooth scroll on homepage)
                  if (
                    (link.label === 'Pricing' || link.label === 'How It Works') &&
                    location.pathname === '/'
                  ) {
                    const anchorHref =
                      link.label === 'Pricing' ? '#pricing' : '#how-it-works';
                    return (
                      <li key={link.path}>
                        <a
                          href={anchorHref}
                          className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  // Force legal links to render as <a> so crawlers see real URLs
                  if (
                    link.path === '/privacy-policy' ||
                    link.path === '/terms' ||
                    link.path === '/cookie-policy'
                  ) {
                    return (
                      <li key={link.path}>
                        <a
                          href={link.path}
                          className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  // Default: SPA navigation
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm text-slate-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
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
              <a
                href="https://www.instagram.com/localyse.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/localyse-in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
