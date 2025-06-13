import { NavLink } from 'react-router-dom';

interface NavbarProps {
  mobile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mobile = false }) => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const activeClass = 'text-primary-600 font-medium';
  const inactiveClass = 'text-slate-600 hover:text-slate-900';

  return (
    <nav className={mobile ? 'flex flex-col space-y-4 px-4' : 'flex items-center space-x-8'}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `transition-colors duration-200 ${
              isActive ? activeClass : inactiveClass
            } ${mobile ? 'block py-2' : ''}`
          }
          end={item.path === '/'}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;