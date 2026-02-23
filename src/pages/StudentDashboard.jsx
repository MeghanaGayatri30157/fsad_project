import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import StudentSidebar from '../components/StudentSidebar';
import { Menu, X } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { jobs } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentMainDashboard />;
      case 'jobs':
        return <StudentJobsPage />;
      case 'applications':
        return <StudentApplicationsPage />;
      case 'assistant':
        return <StudentAIAssistant />;
      case 'network':
        return <StudentNetworkPage />;
      case 'notifications':
        return <StudentNotificationsPage />;
      case 'profile':
        return <StudentProfilePage />;
      default:
        return <StudentMainDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <StudentSidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white hidden sm:block">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              Student
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

// Student Main Dashboard
const StudentMainDashboard = () => {
  const { jobs } = useData();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    experience: ''
  });

  const handleRegisterClick = (drive) => {
    setSelectedItem({ ...drive, type: 'drive' });
    setShowApplicationForm(true);
  };

  const handleJobClick = (job) => {
    setSelectedItem({ ...job, type: 'job' });
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('❌ Please fill in all required fields');
      return;
    }
    
    const newApplication = {
      id: Date.now(),
      ...formData,
      appliedFor: selectedItem.type === 'drive' ? selectedItem.company : selectedItem.title,
      company: selectedItem.type === 'drive' ? selectedItem.company : selectedItem.company,
      date: new Date().toLocaleDateString(),
      status: 'Applied'
    };
    
    setApplications([...applications, newApplication]);
    alert('✅ Application submitted successfully!');
    setShowApplicationForm(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      resume: '',
      coverLetter: '',
      experience: ''
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto transition-colors duration-300">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition text-gray-800 dark:text-white">
          <div className="text-3xl mb-2">78%</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Profile Completion</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition text-gray-800 dark:text-white">
          <div className="text-3xl mb-2">{12 + applications.length}</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Applications</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition text-gray-800 dark:text-white">
          <div className="text-3xl mb-2">3</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Shortlisted</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition text-gray-800 dark:text-white">
          <div className="text-3xl mb-2">1</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Offers</p>
        </div>
      </div>

      {/* AI Recommended Jobs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-white dark:text-white mb-6 bg-indigo-600 p-3 rounded-lg">🤖 AI-Recommended Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.slice(0, 4).map(job => (
            <div 
              key={job.id} 
              onClick={() => handleJobClick(job)}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md dark:hover:shadow-lg transition cursor-pointer bg-blue-600 dark:bg-blue-800"
            >
              <h3 className="font-bold text-white mb-2">{job.title}</h3>
              <p className="text-cyan-200 font-semibold text-sm">{job.company}</p>
              <p className="text-gray-100 text-sm mt-1">📍 {job.location}</p>
              <p className="text-yellow-300 font-semibold text-sm mt-2">{job.salary}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {job.skills.slice(0, 2).map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full border border-white border-opacity-30">
                    {skill}
                  </span>
                ))}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleJobClick(job);
                }}
                className="w-full mt-3 py-2 bg-white text-indigo-600 text-sm rounded-lg hover:bg-cyan-100 transition font-bold"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill Gap Analysis */}
        <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-6 border border-orange-200 dark:border-orange-800 transition-colors duration-300">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">📊 Skill Gap Analysis</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">React</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Node.js</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">System Design</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Score */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">📝 Resume Score</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90" width="128" height="128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray={`${56 * 2 * Math.PI * 0.82} ${56 * 2 * Math.PI}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">82</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">Very Good - Add projects for better score</p>
        </div>
      </div>

      {/* Upcoming Drives */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📅 Upcoming Campus Drives</h2>
        <div className="space-y-3">
          {[
            { company: 'Google', date: 'March 15, 2026', time: '10:00 AM' },
            { company: 'Microsoft', date: 'March 22, 2026', time: '2:00 PM' },
            { company: 'Amazon', date: 'April 1, 2026', time: '11:00 AM' }
          ].map((drive, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors duration-300">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{drive.company}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{drive.date} at {drive.time}</p>
              </div>
              <button 
                onClick={() => handleRegisterClick(drive)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full my-8 transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Application Form</h2>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {selectedItem.type === 'drive' ? `${selectedItem.company} - Campus Drive` : `${selectedItem.title} at ${selectedItem.company}`}
                </p>
              </div>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 2"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Resume */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Resume/CV</label>
                <textarea
                  value={formData.resume}
                  onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                  placeholder="Paste your resume or upload details"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cover Letter</label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us why you're interested..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmitApplication}
                className="flex-1 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
              >
                 Submit Application
              </button>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Student Jobs Page
const StudentJobsPage = () => {
  const { jobs } = useData();
  const [filters, setFilters] = useState({ location: '', salary: '', skill: '' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId) => {
    setAppliedJobs([...appliedJobs, jobId]);
    alert('✅ Application submitted successfully!');
    setShowDetails(false);
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.salary && !job.salary.includes(filters.salary)) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white bg-indigo-600 p-4 rounded-lg">Available Jobs</h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-4 transition-colors duration-300">
        <input
          type="text"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <select
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Filter by salary...</option>
          <option value="150k">$150k+</option>
          <option value="120k">$120k+</option>
          <option value="100k">$100k+</option>
        </select>
        <input
          type="text"
          placeholder="Filter by skill..."
          value={filters.skill}
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={() => setFilters({ location: '', salary: '', skill: '' })}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-blue-600 dark:bg-blue-900 rounded-xl p-6 shadow-sm border border-blue-400 dark:border-blue-800 hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setSelectedJob(job);
              setShowDetails(true);
            }}>
            <h3 className="font-bold text-white mb-1">{job.title}</h3>
            <p className="text-cyan-200 font-medium text-sm">{job.company}</p>
            <p className="text-gray-100 text-sm mt-2">📍 {job.location}</p>
            <p className="text-yellow-300 font-semibold mt-2">{job.salary}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {job.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full border border-white border-opacity-30">
                  {skill}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApply(job.id);
              }}
              disabled={appliedJobs.includes(job.id)}
              className={`w-full mt-4 py-2 rounded-lg font-bold transition ${
                appliedJobs.includes(job.id)
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-white text-indigo-600 hover:bg-cyan-100'
              }`}
            >
              {appliedJobs.includes(job.id) ? '✓ Applied' : 'Apply Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {showDetails && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowDetails(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold text-white bg-indigo-600 p-3 rounded-lg mb-2">{selectedJob.title}</h2>
            <p className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold mb-4">{selectedJob.company}</p>
            <div className="space-y-4 mb-6">
              <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Location:</span> {selectedJob.location}</p>
              <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Salary:</span> {selectedJob.salary}</p>
              <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Type:</span> {selectedJob.jobType}</p>
              <p className="text-gray-800 dark:text-gray-200"><span className="font-semibold">Description:</span> {selectedJob.description}</p>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleApply(selectedJob.id);
                }}
                disabled={appliedJobs.includes(selectedJob.id)}
                className={`flex-1 py-3 rounded-lg font-bold transition ${
                  appliedJobs.includes(selectedJob.id)
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {appliedJobs.includes(selectedJob.id) ? '✓ Applied' : 'Apply Now'}
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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

// Student Applications Page
const StudentApplicationsPage = () => {
  const [applications] = React.useState([
    { id: 1, job: 'React Developer', company: 'Google', status: 'Applied', date: '2026-03-01' },
    { id: 2, job: 'Full Stack Developer', company: 'Microsoft', status: 'Shortlisted', date: '2026-02-28' },
    { id: 3, job: 'Backend Developer', company: 'Amazon', status: 'Selected', date: '2026-02-25' },
    { id: 4, job: 'Frontend Developer', company: 'Facebook', status: 'Rejected', date: '2026-02-20' }
  ]);

  const statusColors = {
    'Applied': 'bg-blue-600 text-white',
    'Shortlisted': 'bg-yellow-600 text-white',
    'Selected': 'bg-green-600 text-white',
    'Rejected': 'bg-red-600 text-white'
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white bg-indigo-600 p-4 rounded-lg mb-6">My Applications</h1>
      <div className="space-y-4">
        {applications.map(app => (
          <div key={app.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition cursor-pointer">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{app.job}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{app.company}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Applied: {app.date}</p>
              </div>
              <span className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// AI Assistant
const StudentAIAssistant = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hello! I'm your AI Career Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = React.useState('');

  const suggestedQuestions = [
    "Which jobs match my skills?",
    "How to improve resume?",
    "What skills should I learn?",
    "Tell me about interview tips"
  ];

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, text: "That's a great question! Let me help you with that...", sender: 'bot' }]);
      }, 500);
      setInput('');
    }
  };

  const handleSuggestedQuestion = (question) => {
    setMessages([...messages, { id: messages.length + 1, text: question, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: prev.length + 1, text: "I've analyzed your profile and here are my recommendations...", sender: 'bot' }]);
    }, 500);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-bold text-white bg-indigo-600 p-4 rounded-lg mb-6">🤖 AI Career Assistant</h1>

      {/* Chat Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex-1 p-6 mb-4 overflow-y-auto space-y-4 transition-colors duration-300">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Questions */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Suggested Questions:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSuggestedQuestion(q)}
              className="text-left p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Network Page
const StudentNetworkPage = () => {
  const { addNotification } = useData();
  const { isDarkMode } = useTheme();
  const [selectedContact, setSelectedContact] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const handleAskGuidance = (contact, type) => {
    setSelectedContact({ ...contact, type });
    setShowQuestionModal(true);
  };

  const handleSubmitQuestion = () => {
    if (!questionText.trim()) {
      alert('Please enter your question');
      return;
    }

    // Add notification to the notifications list
    addNotification({
      title: `Message from Student: ${selectedContact.name}`,
      message: `Question: ${questionText}`,
      type: 'message',
      from: 'John Doe', // This would be the current logged-in student
      recipient: selectedContact.name,
      recipientType: selectedContact.type
    });

    // Reset form
    setQuestionText('');
    setShowQuestionModal(false);
    setSelectedContact(null);

    // Show success message
    alert('Your question has been sent successfully!');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white bg-indigo-600 p-4 rounded-lg mb-6">🌐 Career Circles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mentors */}
        <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-2xl font-bold text-white bg-purple-600 p-3 rounded-lg mb-4">👨‍🏫 Mentors</h2>
          <div className="space-y-3">
            {[
              { name: 'Raj Kumar', role: 'Senior Tech Lead' },
              { name: 'Priya Singh', role: 'Product Manager' },
              { name: 'Amit Patel', role: 'Full Stack Expert' }
            ].map((mentor, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white">{mentor.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.role}</p>
                <button 
                  onClick={() => handleAskGuidance(mentor, 'mentor')}
                  className="mt-2 w-full py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                >
                  Ask for Guidance
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-white bg-blue-600 p-3 rounded-lg mb-4">🎓 Alumni</h2>
          <div className="space-y-3">
            {[
              { name: 'Vikram Sharma', role: 'Google Engineer' },
              { name: 'Neha Gupta', role: 'Amazon Manager' },
              { name: 'Arjun Verma', role: 'Microsoft Architect' }
            ].map((alumni, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white">{alumni.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{alumni.role}</p>
                <button 
                  onClick={() => handleAskGuidance(alumni, 'alumni')}
                  className="mt-2 w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Ask for Guidance
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiters */}
        <div className="bg-green-50 dark:bg-green-900 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold text-white bg-green-600 p-3 rounded-lg mb-4">💼 Recruiters</h2>
          <div className="space-y-3">
            {[
              { name: 'Sarah Williams', company: 'Google' },
              { name: 'James Johnson', company: 'Microsoft' },
              { name: 'Emma Davis', company: 'Amazon' }
            ].map((recruiter, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white">{recruiter.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{recruiter.company}</p>
                <button 
                  onClick={() => handleAskGuidance(recruiter, 'recruiter')}
                  className="mt-2 w-full py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                >
                  Ask for Guidance
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {showQuestionModal && selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full my-8 shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Ask {selectedContact.name}
              </h2>
              <button 
                onClick={() => {
                  setShowQuestionModal(false);
                  setQuestionText('');
                  setSelectedContact(null);
                }}
                className={`text-2xl ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                Reach out and ask for guidance
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Question
                </label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Ask your question here..."
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  rows="5"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitQuestion}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg"
                >
                  Send Question
                </button>
                <button
                  onClick={() => {
                    setShowQuestionModal(false);
                    setQuestionText('');
                    setSelectedContact(null);
                  }}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${
                    isDarkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Notifications Page
const StudentNotificationsPage = () => {
  const { notifications, setShowCelebration, setSelectedNotification } = useData();
  const { isDarkMode } = useTheme();

  const handleNotificationClick = (notif) => {
    if (notif.type === 'celebration') {
      setSelectedNotification(notif);
      setShowCelebration(true);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white bg-indigo-600 p-4 rounded-lg mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map(notif => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-6 rounded-xl border-2 transition cursor-pointer ${
              notif.type === 'celebration'
                ? 'bg-green-600 border-green-500 hover:shadow-lg text-white'
                : notif.type === 'message'
                ? `bg-indigo-500 border-indigo-400 hover:shadow-lg text-white`
                : `${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md ${isDarkMode ? 'text-white' : 'text-gray-800'} ${isDarkMode ? 'dark:border-gray-700' : 'border-gray-200'}`
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {notif.type === 'celebration' ? '🎉' : notif.type === 'message' ? '💬' : '📢'}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{notif.title}</h3>
                <p className={`mt-1 ${
                  notif.type === 'message' ? 'text-indigo-100' :
                  notif.type === 'celebration' ? 'text-gray-100' : 
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {notif.message}
                </p>
                <p className={`text-sm mt-2 ${
                  notif.type === 'message' ? 'text-indigo-100' :
                  notif.type === 'celebration' ? 'text-gray-100' : 
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {notif.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-lg">No notifications yet</p>
            <p className="text-sm">Messages from mentors, alumni, and recruiters will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Profile Page
const StudentProfilePage = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  // Get first letter of name for avatar
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : 'S';

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white bg-indigo-600 p-4 rounded-lg mb-6">My Profile</h1>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} p-8 space-y-6 transition-colors duration-300`}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
            {getInitial(user?.name)}
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {user?.name || 'Student'}
            </h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {user?.role === 'student' ? 'Computer Science Student' : user?.role}
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{user?.email}</p>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Account Details</h3>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Name:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name}</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-2">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Email:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{user?.email}</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-2">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Role:</span>
                <span className={`font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{user?.role}</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-2">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Member Since:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'JavaScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'].map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Education</h3>
          <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>B.Tech Computer Science</p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>XYZ University - Expected Graduation: 2026</p>
        </div>

        <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
