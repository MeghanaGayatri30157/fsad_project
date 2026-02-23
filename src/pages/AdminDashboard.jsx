import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import { Menu, X, Trash2, Edit2 } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminMainDashboard />;
      case 'users':
        return <ManageUsersPage />;
      case 'roles':
        return <ManageRolesPage />;
      case 'settings':
        return <SystemSettingsPage />;
      default:
        return <AdminMainDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Administrator</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

const AdminMainDashboard = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">1,250</div>
          <p className="text-gray-600 text-sm">Total Users</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">4</div>
          <p className="text-gray-600 text-sm">User Roles</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">42</div>
          <p className="text-gray-600 text-sm">Companies</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">99.8%</div>
          <p className="text-gray-600 text-sm">System Uptime</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Distribution</h2>
          <div className="space-y-3">
            {[
              { role: 'Students', count: 450 },
              { role: 'Employers', count: 120 },
              { role: 'Officers', count: 15 },
              { role: 'Admins', count: 5 }
            ].map((user, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{user.role}</span>
                  <span className="text-sm font-bold text-purple-600">{user.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(user.count/450)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            {[
              { action: 'New user registered', time: '5 minutes ago' },
              { action: 'Job posted by Google', time: '1 hour ago' },
              { action: 'System backup completed', time: '2 hours ago' },
              { action: 'Database optimization', time: '1 day ago' }
            ].map((activity, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-gray-600 text-xs">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageUsersPage = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Raj Kumar', email: 'raj@university.edu', role: 'Student', status: 'Active' },
    { id: 2, name: 'Priya Singh', email: 'priya@company.com', role: 'Employer', status: 'Active' },
    { id: 3, name: 'Amit Patel', email: 'amit@university.edu', role: 'Student', status: 'Active' },
    { id: 4, name: 'Sarah Davis', email: 'sarah@university.edu', role: 'Officer', status: 'Active' }
  ]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: 'student' });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: users.length + 1, ...newUser, status: 'Active' }]);
      setNewUser({ name: '', email: '', role: 'student' });
      setShowAddForm(false);
      alert('✅ User added successfully!');
    }
  };

  const handleDeleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('✅ User deleted successfully!');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          {showAddForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Full Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="student">Student</option>
              <option value="employer">Employer</option>
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Add User
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded transition">
                    <Edit2 size={18} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="p-2 hover:bg-gray-100 rounded transition">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageRolesPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Roles & Permissions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            role: 'Student',
            icon: '👨‍🎓',
            permissions: ['Browse Jobs', 'Apply to Jobs', 'View Profile', 'Chat with Mentors']
          },
          {
            role: 'Employer',
            icon: '💼',
            permissions: ['Post Jobs', 'Review Applications', 'Schedule Interviews', 'Send Offers']
          },
          {
            role: 'Officer',
            icon: '👨‍💼',
            permissions: ['View Reports', 'Manage Drives', 'Analytics', 'Export Data']
          },
          {
            role: 'Admin',
            icon: '⚙️',
            permissions: ['Manage Users', 'System Settings', 'View Logs', 'Database Access']
          }
        ].map((role, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{role.icon}</span>
              <h3 className="text-lg font-bold text-gray-800">{role.role}</h3>
            </div>
            <div className="space-y-2 mb-4">
              {role.permissions.map((perm, j) => (
                <div key={j} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm text-gray-700">{perm}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm">
              Edit Permissions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemSettingsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">System Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* General Settings */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Name</label>
              <input
                type="text"
                defaultValue="PlaceMint AI"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
              <input
                type="email"
                defaultValue="support@placemint.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Security Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Require Email Verification</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Enable IP Whitelisting</span>
            </label>
          </div>
        </div>

        {/* Maintenance */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Maintenance</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium">
              Backup Database
            </button>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium">
              Clear Cache
            </button>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
              Send System Notification
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
