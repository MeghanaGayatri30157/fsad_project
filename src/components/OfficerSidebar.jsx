import React from 'react';
import { LayoutDashboard, Users, Building2, BarChart3, TrendingUp, LogOut } from 'lucide-react';

const OfficerSidebar = ({ currentPage, setCurrentPage, onLogout, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed lg:static w-64 h-screen bg-gradient-to-b from-green-900 to-emerald-900 text-white flex flex-col transition-all duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-green-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            PlaceMint
          </h1>
          <p className="text-green-200 text-sm">Officer Dashboard</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentPage === item.id
                    ? 'bg-white text-green-900 font-bold'
                    : 'text-green-100 hover:bg-green-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-800 space-y-2">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OfficerSidebar;
