import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-300">

      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Logo/Title */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            CampusHire
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">Smart AI-Based Campus Hiring</p>
          <p className="text-lg text-gray-500 dark:text-gray-400">Interaction and Management System</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12 leading-relaxed">
          Connect students with opportunities, streamline recruitment, and empower careers through intelligent matching
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/50 backdrop-blur border border-white/60 shadow-lg hover:shadow-xl transition">
            <div className="text-3xl mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Matching</h3>
            <p className="text-sm text-gray-600">AI-powered job recommendations</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 backdrop-blur border border-white/60 shadow-lg hover:shadow-xl transition">
            <div className="text-3xl mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Process</h3>
            <p className="text-sm text-gray-600">Streamlined hiring workflow</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 backdrop-blur border border-white/60 shadow-lg hover:shadow-xl transition">
            <div className="text-3xl mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-2">Global Network</h3>
            <p className="text-sm text-gray-600">Connect with top companies</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition transform duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 hover:scale-105 transition transform duration-200"
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-sm text-gray-500">
          <p>Transforming campus hiring experience with AI technology</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
