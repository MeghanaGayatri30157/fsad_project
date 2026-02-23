import React from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageCircle, Users, Bell, User, LogOut, Menu, X } from 'lucide-react';

const StudentSidebar = ({ currentPage, setCurrentPage, onLogout, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'assistant', label: 'AI Assistant', icon: MessageCircle },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white flex flex-col transition-all duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-indigo-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PlaceMint
          </h1>
          <p className="text-indigo-200 text-sm">Student Dashboard</p>
        </div>

        {/* Menu Items */}
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
                    ? 'bg-white text-indigo-900 font-bold'
                    : 'text-indigo-100 hover:bg-indigo-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-indigo-800 space-y-2">
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

export default StudentSidebar;
