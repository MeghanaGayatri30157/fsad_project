import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    const mockJobs = [
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'Google',
        location: 'Mountain View, CA',
        salary: '$150k - $200k',
        skills: ['React', 'JavaScript', 'TypeScript'],
        description: 'Build scalable web applications',
        jobType: 'Full-time'
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        salary: '$120k - $180k',
        skills: ['Node.js', 'React', 'MongoDB'],
        description: 'Create innovative solutions',
        jobType: 'Full-time'
      },
      {
        id: 3,
        title: 'Python Backend Developer',
        company: 'Amazon',
        location: 'Austin, TX',
        salary: '$130k - $190k',
        skills: ['Python', 'AWS', 'Django'],
        description: 'Build distributed systems',
        jobType: 'Full-time'
      },
      {
        id: 4,
        title: 'UI/UX Designer',
        company: 'Apple',
        location: 'Cupertino, CA',
        salary: '$100k - $150k',
        skills: ['Figma', 'UI Design', 'CSS'],
        description: 'Design beautiful interfaces',
        jobType: 'Full-time'
      },
      {
        id: 5,
        title: 'Data Science Engineer',
        company: 'Meta',
        location: 'Menlo Park, CA',
        salary: '$140k - $200k',
        skills: ['Python', 'Machine Learning', 'SQL'],
        description: 'Work with big data and AI',
        jobType: 'Full-time'
      }
    ];

    const mockNotifications = [
      {
        id: 1,
        title: 'Application Submitted',
        message: 'Your application to Google has been submitted',
        type: 'success',
        timestamp: new Date(),
        read: false
      },
      {
        id: 2,
        title: 'You are selected at JP Morgan',
        message: 'Congratulations! JP Morgan has selected you',
        type: 'celebration',
        timestamp: new Date(),
        read: false,
        companyName: 'JP Morgan'
      }
    ];

    const mockCompanies = [
      { id: 1, name: 'Google', logo: '🔵', openPositions: 5 },
      { id: 2, name: 'Microsoft', logo: '🟦', openPositions: 3 },
      { id: 3, name: 'Amazon', logo: '🟧', openPositions: 4 },
      { id: 4, name: 'Apple', logo: '🍎', openPositions: 2 }
    ];

    setJobs(mockJobs);
    setNotifications(mockNotifications);
    setCompanies(mockCompanies);
  };

  const addJob = (job) => {
    const newJob = {
      id: jobs.length + 1,
      ...job,
      postedDate: new Date()
    };
    setJobs([...jobs, newJob]);
  };

  const applyToJob = (jobId, studentId) => {
    const newApplication = {
      id: applications.length + 1,
      jobId,
      studentId,
      status: 'Applied',
      appliedDate: new Date()
    };
    setApplications([...applications, newApplication]);
    return newApplication;
  };

  const addApplication = (applicationData) => {
    const newApplication = {
      id: Date.now(),
      timestamp: new Date(),
      status: 'Applied',
      ...applicationData
    };
    setApplications([...applications, newApplication]);
    return newApplication;
  };

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const addNotification = (notification) => {
    const newNotif = {
      id: notifications.length + 1,
      timestamp: new Date(),
      read: false,
      ...notification
    };
    setNotifications([...notifications, newNotif]);
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notifId ? { ...notif, read: true } : notif
    ));
  };

  return (
    <DataContext.Provider
      value={{
        jobs,
        applications,
        companies,
        students,
        notifications,
        selectedNotification,
        showCelebration,
        setShowCelebration,
        setSelectedNotification,
        addJob,
        applyToJob,
        addApplication,
        updateApplicationStatus,
        addNotification,
        markNotificationAsRead
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
