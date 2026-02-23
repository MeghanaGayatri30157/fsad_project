import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CelebrationScreen from './pages/CelebrationScreen';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employer Routes */}
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute requiredRole="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Officer Routes */}
      <Route
        path="/officer/dashboard"
        element={
          <ProtectedRoute requiredRole="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <AppRoutes />
              <CelebrationScreenWrapper />
            </div>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// Celebration Screen Wrapper
const CelebrationScreenWrapper = () => {
  const { showCelebration } = useData();

  if (showCelebration) {
    return <CelebrationScreen />;
  }
  return null;
};
