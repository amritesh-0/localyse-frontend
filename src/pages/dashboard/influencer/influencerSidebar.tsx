import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  ChevronLeft,
  Menu,
  LogOut,
  FileText,
  ClipboardList,
  User,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext'; 

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth(); // ✅ Access logout function
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Overview', path: '/dashboard/influencer/overview' },
    { icon: <ClipboardList size={20} />, label: 'Available Ads', path: '/dashboard/influencer/ads' },
    { icon: <FileText size={20} />, label: 'Requests', path: '/dashboard/influencer/requests' },
    { icon: <User size={20} />, label: 'Profile', path: '/dashboard/influencer/profile' },
    { icon: <HelpCircle size={20} />, label: 'Help', path: '/dashboard/influencer/help' },
  ];

  const sidebarVariants = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } },
  };

  const mobileSidebarVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: '-100%', transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    open: { opacity: 0.5, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-20 bg-black lg:hidden"
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed left-4 top-4 z-30 rounded-lg bg-white p-2 shadow-md lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar */}
      <motion.div
        className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl lg:hidden"
        initial="closed"
        animate={isMobileOpen ? 'open' : 'closed'}
        variants={mobileSidebarVariants}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <span className="text-xl font-semibold text-primary-700">Suzao</span>
            <button
              onClick={toggleMobileSidebar}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-3 py-2 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="border-t p-4">
            <button onClick={useAuth().logout} className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden h-full border-r bg-white lg:block"
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            {isOpen ? (
              <span className="text-xl font-semibold text-primary-700">Suzao</span>
            ) : (
              <span className="mx-auto text-xl font-semibold text-primary-700">S</span>
            )}
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft size={20} className={`transform transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${isOpen ? 'space-x-3' : 'justify-center'} rounded-lg px-3 py-2 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="border-t p-4">
            <button onClick={() => { logout(); window.location.href = '/login'; }} className={`flex ${isOpen ? 'w-full items-center space-x-3' : 'justify-center w-full'} rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100`}>
              <LogOut size={20} />
              {isOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
