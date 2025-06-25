import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardTopbar from '../../pages/dashboard/shared/DashboardTopbar';
import Sidebar from '../../pages/dashboard/influencer/influencerSidebar';

const InfluencerDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobileOpen={isMobileSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <DashboardTopbar userType="influencer" toggleMobileSidebar={toggleMobileSidebar} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </div>
        </main>
      {/* </div> */}
    </div>
  );
};

export default InfluencerDashboardLayout;
