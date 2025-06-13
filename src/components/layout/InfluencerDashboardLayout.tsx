import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardTopbar from '../../pages/dashboard/shared/DashboardTopbar';
import Sidebar from '../../pages/dashboard/influencer/influencerSidebar';

const InfluencerDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <DashboardTopbar userType="influencer" />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InfluencerDashboardLayout;
