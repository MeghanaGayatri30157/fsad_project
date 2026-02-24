import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OfficerSidebar from '../components/OfficerSidebar';
import { Menu, X, BarChart3, TrendingUp } from 'lucide-react';

const OfficerDashboard = () => {
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
        return <OfficerMainDashboard />;
      case 'students':
        return <StudentListPage />;
      case 'companies':
        return <CompanyDrivesPage />;
      case 'reports':
        return <ReportsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <OfficerMainDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <OfficerSidebar
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
          <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">Placement Officer Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Officer</p>
              <p className="text-xs text-gray-500">Campus Placement</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
              O
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

const OfficerMainDashboard = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">450</div>
          <p className="text-gray-600 text-sm">Total Students</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">85%</div>
          <p className="text-gray-600 text-sm">Placement Rate</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">42</div>
          <p className="text-gray-600 text-sm">Registered Companies</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">$18.5L</div>
          <p className="text-gray-600 text-sm">Highest Package</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Department-wise Placement</h2>
          <div className="space-y-3">
            {[
              { dept: 'Computer Science', placed: 95, total: 100 },
              { dept: 'Information Technology', placed: 88, total: 100 },
              { dept: 'Electronics', placed: 72, total: 80 },
              { dept: 'Mechanical', placed: 65, total: 90 }
            ].map((dept, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{dept.dept}</span>
                  <span className="text-sm font-bold text-green-600">{dept.placed}/{dept.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(dept.placed/dept.total)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Drives */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Drives</h2>
          <div className="space-y-3">
            {[
              { company: 'Google', date: 'March 15', students: 120 },
              { company: 'Microsoft', date: 'March 22', students: 95 },
              { company: 'Amazon', date: 'April 1', students: 110 }
            ].map((drive, i) => (
              <div key={i} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{drive.company}</p>
                    <p className="text-sm text-gray-600">{drive.date} • {drive.students} registered</p>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition font-medium">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentListPage = () => {
  const [filterDept, setFilterDept] = React.useState('');
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showProfile, setShowProfile] = React.useState(false);

  const students = [
    { id: 1, name: 'Raj Kumar', dept: 'Computer Science', cgpa: 8.5, placed: true, company: 'Google', email: 'raj@example.com', phone: '9876543210', skills: ['React', 'Node.js', 'Python'] },
    { id: 2, name: 'Priya Singh', dept: 'IT', cgpa: 8.8, placed: true, company: 'Microsoft', email: 'priya@example.com', phone: '9876543211', skills: ['Java', 'Spring Boot', 'AWS'] },
    { id: 3, name: 'Amit Patel', dept: 'Computer Science', cgpa: 8.2, placed: true, company: 'Amazon', email: 'amit@example.com', phone: '9876543212', skills: ['Python', 'Django', 'MongoDB'] },
    { id: 4, name: 'Neha Gupta', dept: 'Electronics', cgpa: 7.9, placed: false, company: null, email: 'neha@example.com', phone: '9876543213', skills: ['C++', 'Embedded Systems'] }
  ];

  const filteredStudents = filterDept ? students.filter(s => s.dept === filterDept) : students;

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowProfile(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Management</h1>

      <select
        value={filterDept}
        onChange={(e) => setFilterDept(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
      >
        <option value="">All Departments</option>
        <option value="Computer Science">Computer Science</option>
        <option value="IT">Information Technology</option>
        <option value="Electronics">Electronics</option>
      </select>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CGPA</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.dept}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{student.cgpa}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    student.placed 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.placed ? '✓ Placed' : 'Not Placed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.company || '-'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleViewProfile(student)} className="text-green-600 hover:text-green-700 font-semibold text-sm">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Modal */}
      {showProfile && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-green-100 text-sm">{selectedStudent.dept}</p>
                </div>
                <button onClick={() => setShowProfile(false)} className="text-2xl hover:text-green-100">✕</button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-4">
              {/* CGPA */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 uppercase font-semibold">CGPA</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{selectedStudent.cgpa}</p>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Contact Information</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📧</span>
                    <span className="text-sm text-gray-700">{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📱</span>
                    <span className="text-sm text-gray-700">{selectedStudent.phone}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Placement Status</p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedStudent.placed 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {selectedStudent.placed ? '✓ Placed' : 'Not Placed'}
                  </span>
                  {selectedStudent.company && (
                    <span className="text-sm font-semibold text-gray-700">{selectedStudent.company}</span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowProfile(false)}
                className="w-full mt-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CompanyDrivesPage = () => {
  const [selectedDrive, setSelectedDrive] = React.useState(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const drives = [
    { company: 'Google', date: 'March 15, 2026', time: '10:00 AM', positions: 8, venue: 'Main Auditorium', package: '25 LPA', criteria: '7.5+ CGPA', roles: ['Software Engineer', 'Product Manager'] },
    { company: 'Microsoft', date: 'March 22, 2026', time: '2:00 PM', positions: 5, venue: 'Tech Block', package: '22 LPA', criteria: '7.0+ CGPA', roles: ['Software Developer', 'Cloud Engineer'] },
    { company: 'Amazon', date: 'April 1, 2026', time: '11:00 AM', positions: 6, venue: 'Main Auditorium', package: '20 LPA', criteria: '7.2+ CGPA', roles: ['SDE', 'Data Engineer'] },
    { company: 'Apple', date: 'April 10, 2026', time: '9:00 AM', positions: 3, venue: 'Lab 201', package: '28 LPA', criteria: '8.0+ CGPA', roles: ['iOS Developer', 'Hardware Engineer'] }
  ];

  const handleViewDetails = (drive) => {
    setSelectedDrive(drive);
    setShowDetails(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Drives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drives.map((drive, i) => (
          <div key={i} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{drive.company}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-700"><span className="font-semibold">📅 Date:</span> {drive.date}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">⏰ Time:</span> {drive.time}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">📍 Venue:</span> {drive.venue}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">💼 Positions:</span> {drive.positions}</p>
            </div>
            <button onClick={() => handleViewDetails(drive)} className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetails && selectedDrive && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{selectedDrive.company}</h3>
                  <p className="text-green-100 text-sm">Campus Drive Details</p>
                </div>
                <button onClick={() => setShowDetails(false)} className="text-2xl hover:text-green-100">✕</button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Schedule */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-3">Schedule</p>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <span className="text-blue-600">📅</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Date</p>
                      <p className="text-sm text-gray-600">{selectedDrive.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-600">⏰</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Time</p>
                      <p className="text-sm text-gray-600">{selectedDrive.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue & Positions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Venue</p>
                  <p className="font-semibold text-gray-800">{selectedDrive.venue}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Open Positions</p>
                  <p className="text-2xl font-bold text-green-600">{selectedDrive.positions}</p>
                </div>
              </div>

              {/* Package & Criteria */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Package</p>
                  <p className="text-xl font-bold text-yellow-700">{selectedDrive.package}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Criteria</p>
                  <p className="text-sm font-medium text-purple-700">{selectedDrive.criteria}</p>
                </div>
              </div>

              {/* Roles */}
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-3">Available Roles</p>
                <div className="space-y-2">
                  {selectedDrive.roles.map((role, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm font-medium text-gray-700">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Close
                </button>
                <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                  Download Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportsPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Placement Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Package Distribution</h2>
          <div className="space-y-3">
            {[
              { range: '5-10 LPA', count: 45 },
              { range: '10-15 LPA', count: 78 },
              { range: '15-20 LPA', count: 52 },
              { range: '20+ LPA', count: 18 }
            ].map((pkg, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{pkg.range}</span>
                  <span className="text-sm font-bold text-indigo-600">{pkg.count} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(pkg.count/100)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sector-wise Placement</h2>
          <div className="space-y-2">
            {[
              { sector: 'IT/Software', percentage: 42 },
              { sector: 'Finance', percentage: 18 },
              { sector: 'Consulting', percentage: 15 },
              { sector: 'Others', percentage: 25 }
            ].map((sector, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <span className="font-medium text-gray-700">{sector.sector}</span>
                <span className="text-lg font-bold text-green-600">{sector.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Year-wise Comparison</h2>
        <div className="space-y-4">
          {[
            { year: '2024', placed: 380, total: 450 },
            { year: '2025', placed: 395, total: 450 },
            { year: '2026', placed: 382, total: 450 }
          ].map((year, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{year.year}</span>
                <span className="text-sm text-gray-600">{year.placed}/{year.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: `${(year.placed/year.total)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-gray-600 text-sm">Average Package</p>
          <p className="text-3xl font-bold text-blue-600">12.5 LPA</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-gray-600 text-sm">Placement Rate</p>
          <p className="text-3xl font-bold text-green-600">85%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-gray-600 text-sm">Companies Visited</p>
          <p className="text-3xl font-bold text-purple-600">42</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Recruiting Companies</h2>
          <div className="space-y-3">
            {[
              { rank: 1, company: 'Google', offers: 42, avg: '18 LPA' },
              { rank: 2, company: 'Microsoft', offers: 38, avg: '16.5 LPA' },
              { rank: 3, company: 'Amazon', offers: 35, avg: '15 LPA' },
              { rank: 4, company: 'Apple', offers: 28, avg: '17.5 LPA' }
            ].map(item => (
              <div key={item.rank} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">#{item.rank} {item.company}</p>
                  <p className="text-sm text-gray-600">{item.offers} offers</p>
                </div>
                <span className="text-green-600 font-bold">{item.avg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Highest Packages</h2>
          <div className="space-y-3">
            {[
              { name: 'Arjun Singh', package: '25 LPA', company: 'Google', dept: 'CS' },
              { name: 'Isha Sharma', package: '23 LPA', company: 'Microsoft', dept: 'IT' },
              { name: 'Rohan Patel', package: '22 LPA', company: 'Amazon', dept: 'CS' },
              { name: 'Ananya Gupta', package: '20 LPA', company: 'Apple', dept: 'IT' }
            ].map((item, i) => (
              <div key={i} className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.company} • {item.dept}</p>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">₹{item.package}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
