import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, BarChart2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center transition-colors duration-300 relative">

      {/* Navbar */}
      <nav className="w-full py-4 px-8 flex justify-between items-center absolute top-0 left-0">
        <div className="text-2xl font-bold text-indigo-600">CampusHire AI</div>
        <div className="space-x-4">
          <button onClick={() => navigate('/login')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
          Smart AI-Based Placement System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Transform your campus recruitment process with AI-powered insights, seamless collaboration, and intelligent matching.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition transform duration-200"
          >
            Get Started
          </button>
          <button
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
            className="px-8 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 hover:scale-105 transition transform duration-200"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white/60 dark:bg-gray-900/60 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Smart Job Matching */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <Briefcase size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Smart Job Matching</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                AI-powered recommendations match students with perfect job opportunities based on skills and preferences.
              </p>
            </div>

            {/* Career Circles */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white">
                  <Users size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Career Circles</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Connect with mentors, alumni, and recruiters in a unique networking ecosystem designed for success.
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <BarChart2 size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comprehensive insights and analytics to track placement performance and identify improvement areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="w-full py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">50K+</h4>
              <p className="text-gray-600">Students Placed</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">2,000+</h4>
              <p className="text-gray-600">Partner Companies</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">95%</h4>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">₹12L</h4>
              <p className="text-gray-600">Avg Package</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;