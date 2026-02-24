import React from 'react';
import { LayoutDashboard, Briefcase, Users, MessageSquare, LogOut } from 'lucide-react';

const EmployerSidebar = ({ currentPage, setCurrentPage, onLogout, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'postjob', label: 'Post Job', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'shortlist', label: 'Shortlist', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
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
        className={`fixed lg:static w-64 h-screen bg-gradient-to-b from-blue-900 to-cyan-900 text-white flex flex-col transition-all duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            campushire
          </h1>
          <p className="text-blue-200 text-sm">Employer Dashboard</p>
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
                    ? 'bg-white text-blue-900 font-bold'
                    : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
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

export default EmployerSidebar;
