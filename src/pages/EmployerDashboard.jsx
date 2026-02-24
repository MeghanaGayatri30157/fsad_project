import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import EmployerSidebar from '../components/EmployerSidebar';
import { Menu, X, Download } from 'lucide-react';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <EmployerMainDashboard />;
      case 'postjob':
        return <PostJobPage />;
      case 'applications':
        return (
          <ApplicationsPage
            onViewResume={(app) => { setSelectedApplicant(app); setResumeModalOpen(true); }}
            onContact={(app) => { setSelectedApplicant(app); setMessageModalOpen(true); }}
          />
        );
      case 'shortlist':
        return (
          <ShortlistPage
            onMessage={(candidate) => { setSelectedApplicant(candidate); setMessageModalOpen(true); }}
          />
        );
      case 'messages':
        return <MessagesPage />;
      default:
        return <EmployerMainDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <EmployerSidebar
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
          <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">Employer Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Company</p>
              <p className="text-xs text-gray-500">Employer</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              E
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {renderPage()}

          {resumeModalOpen && selectedApplicant && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-3 border-b">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedApplicant.name || selectedApplicant.fullName}</h3>
                    <p className="text-sm text-gray-600">{selectedApplicant.email}</p>
                  </div>
                  <button onClick={() => setResumeModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
                </div>

                <div className="space-y-4">
                  {/* PDF Upload Display */}
                  {selectedApplicant.resumeFile && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">📄</div>
                          <div>
                            <p className="font-semibold text-gray-800">{selectedApplicant.resumeFile.name || 'Resume.pdf'}</p>
                            <p className="text-sm text-gray-600">PDF Document</p>
                          </div>
                        </div>
                        <a
                          href={selectedApplicant.resumeFile instanceof File ? URL.createObjectURL(selectedApplicant.resumeFile) : '#'}
                          download={selectedApplicant.resumeFile.name}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <Download size={18} />
                          Download
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Resume Text Display */}
                  {selectedApplicant.resume && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Resume Details</h4>
                      <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
                        {selectedApplicant.resume}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-4">
                    {selectedApplicant.email && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 uppercase">Email</p>
                        <p className="text-sm font-semibold text-gray-800">{selectedApplicant.email}</p>
                      </div>
                    )}
                    {selectedApplicant.phone && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 uppercase">Phone</p>
                        <p className="text-sm font-semibold text-gray-800">{selectedApplicant.phone}</p>
                      </div>
                    )}
                    {selectedApplicant.experience && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 uppercase">Experience</p>
                        <p className="text-sm font-semibold text-gray-800">{selectedApplicant.experience} years</p>
                      </div>
                    )}
                    {selectedApplicant.appliedFor && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 uppercase">Applied For</p>
                        <p className="text-sm font-semibold text-gray-800">{selectedApplicant.appliedFor}</p>
                      </div>
                    )}
                  </div>

                  {/* Cover Letter */}
                  {selectedApplicant.coverLetter && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Cover Letter</h4>
                      <p className="text-gray-700 text-sm leading-relaxed max-h-48 overflow-y-auto">
                        {selectedApplicant.coverLetter}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {messageModalOpen && selectedApplicant && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Message {selectedApplicant.name}</h3>
                  <button onClick={() => setMessageModalOpen(false)} className="text-gray-500">Close</button>
                </div>
                <textarea className="w-full border p-3 rounded h-32" placeholder={`Write a message to ${selectedApplicant.name}...`} />
                <div className="flex justify-end mt-3">
                  <button onClick={() => { setMessageModalOpen(false); alert(`Message sent to ${selectedApplicant.email}`); }} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmployerMainDashboard = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">5</div>
          <p className="text-gray-600 text-sm">Active Job Postings</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">42</div>
          <p className="text-gray-600 text-sm">Total Applications</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">15</div>
          <p className="text-gray-600 text-sm">Shortlisted Candidates</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="text-3xl mb-2">3</div>
          <p className="text-gray-600 text-sm">Offers Extended</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Applications</h2>
        <div className="space-y-3">
          {[
            { name: 'Raj Kumar', position: 'React Developer', date: '2 hours ago', status: 'New' },
            { name: 'Priya Singh', position: 'Full Stack Developer', date: '5 hours ago', status: 'Reviewing' },
            { name: 'Amit Patel', position: 'React Developer', date: '1 day ago', status: 'Shortlisted' }
          ].map((app, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{app.name}</p>
                <p className="text-sm text-gray-600">{app.position} • {app.date}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{app.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PostJobPage = () => {
  const [jobData, setJobData] = React.useState({
    title: '',
    description: '',
    skills: '',
    salary: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Job posted successfully!');
    setJobData({ title: '', description: '', skills: '', salary: '', location: '' });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Job</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              placeholder="e.g., Senior React Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
            <textarea
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
              <input
                type="text"
                value={jobData.salary}
                onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                placeholder="e.g., $100k - $150k"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Required Skills (comma-separated)</label>
            <input
              type="text"
              value={jobData.skills}
              onChange={(e) => setJobData({ ...jobData, skills: e.target.value })}
              placeholder="e.g., React, JavaScript, Node.js"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

const ApplicationsPage = ({ onViewResume, onContact }) => {
  const { applications } = useData();

  const viewResume = (app) => onViewResume && onViewResume(app);

  const contactApplicant = (app) => onContact && onContact(app);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applications</h1>
      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">No applications yet</p>
          <p className="text-sm text-gray-500">Applications from students will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{app.name || app.fullName}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{app.appliedFor || app.company}</p>
                  <p className="text-gray-600 text-sm">{app.email}</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={() => viewResume(app)} className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                    View Resume
                  </button>
                  <button onClick={() => contactApplicant(app)} className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals moved to parent EmployerDashboard */}
    </div>
  );
};

const ShortlistPage = ({ onMessage }) => {
  const [candidates, setCandidates] = React.useState([
    { id: 1, name: 'Raj Kumar', position: 'React Developer', matchScore: 92, status: 'Shortlisted' },
    { id: 2, name: 'Priya Singh', position: 'Full Stack Developer', matchScore: 88, status: 'Shortlisted' },
    { id: 3, name: 'Amit Patel', position: 'React Developer', matchScore: 85, status: 'Shortlisted' }
  ]);

  const interviewCandidate = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'Interview Scheduled' } : c));
    alert('Interview scheduled');
  };

  const messageCandidate = (candidate) => {
    onMessage && onMessage(candidate);
  };

  const rejectCandidate = (id) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shortlisted Candidates</h1>
      <div className="space-y-4">
        {candidates.map(candidate => (
          <div key={candidate.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{candidate.name}</h3>
                <p className="text-blue-600 font-semibold text-sm">{candidate.position}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{candidate.matchScore}%</p>
                <p className="text-xs text-gray-600">{candidate.status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => interviewCandidate(candidate.id)} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                Interview
              </button>
              <button onClick={() => messageCandidate(candidate)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                Message
              </button>
              <button onClick={() => rejectCandidate(candidate.id)} className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, name: 'Raj Kumar', message: 'Thank you for the opportunity!', time: '2 hours ago', type: 'received' },
    { id: 2, name: 'Priya Singh', message: 'When will the interview be scheduled?', time: '1 hour ago', type: 'received' }
  ]);
  const [input, setInput] = React.useState('');
  const [selectedSender, setSelectedSender] = React.useState(null);

  const sendReply = () => {
    if (!input.trim() || !selectedSender) {
      alert('❌ Please select a recipient and type a message');
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      name: 'You',
      recipientName: selectedSender,
      message: input,
      time: 'just now',
      type: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInput('');
    alert('✅ Reply sent successfully!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  };

  const uniqueSenders = [...new Set(messages.filter(m => m.type === 'received').map(m => m.name))];

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 min-h-0">
        {/* Senders List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-800 text-sm">Conversations</h3>
          </div>
          <div className="overflow-y-auto flex-1">
            {uniqueSenders.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No conversations</div>
            ) : (
              uniqueSenders.map(sender => (
                <button
                  key={sender}
                  onClick={() => setSelectedSender(sender)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 transition ${
                    selectedSender === sender
                      ? 'bg-blue-50 border-l-4 border-l-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold text-gray-800 text-sm">{sender}</p>
                  <p className="text-xs text-gray-500 mt-1">Click to reply</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 flex flex-col">
          {selectedSender ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-semibold text-gray-800">Conversation with {selectedSender}</h3>
                <p className="text-xs text-gray-600 mt-1">Reply to this person's messages</p>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages
                  .filter(m => m.name === selectedSender || m.recipientName === selectedSender)
                  .map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'received' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-lg ${
                          msg.type === 'received'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.type === 'received' ? 'text-gray-600' : 'text-blue-100'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your reply... (Shift+Enter for new line)"
                    rows="3"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button
                    onClick={sendReply}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium h-fit"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">📬 Select a conversation</p>
                <p className="text-sm">Choose a sender from the list to view and reply to their messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
