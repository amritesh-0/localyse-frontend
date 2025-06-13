import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Navbar from './Navbar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
       
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-primary-700 hover:text-primary-900 transition-colors">
          <Sparkles className="h-6 w-6 text-primary-600" />
          <span>Suzao</span>
        </Link>
      

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white py-4 md:hidden"
          >
            <Navbar mobile />
            <div className="mt-4 flex flex-col space-y-2 px-4">
              <Link to="/login">
                <Button variant="outline" fullWidth>
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" fullWidth>
                  Sign up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </Container>
    </header>
  );
};

export default Header;