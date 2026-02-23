import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Zap, Award, Lightbulb } from 'lucide-react';

const CelebrationScreen = () => {
  const navigate = useNavigate();
  const { selectedNotification, setShowCelebration } = useData();
  const [confetti, setConfetti] = useState(true);

  const handleViewOfferLetter = () => {
    alert('📄 Offer Letter\n\n' +
      'Congratulations! You have been offered a position at ' + (selectedNotification?.companyName || 'XYZ Company') + '\n\n' +
      'Position: Senior Developer\n' +
      'Salary: $150,000 - $180,000\n' +
      'Start Date: March 15, 2026\n\n' +
      'Please confirm your acceptance within 5 days.');
  };

  const handleBackToDashboard = () => {
    setShowCelebration(false);
    navigate('/student/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur">
      {/* Confetti */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: Math.random() * 100 + '%',
                top: -10 + 'px',
                fontSize: ['🎉', '🎊', '🎈', '✨', '⭐'][Math.floor(Math.random() * 5)],
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
              }}
            >
              {['🎉', '🎊', '🎈', '✨', '⭐'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 text-center animate-scaleIn">
        {/* Animated Duck */}
        <div className="text-8xl mb-6 animate-bounce">🦆</div>

        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
          Congratulations! 🎉
        </h1>

        {/* Message */}
        <p className="text-xl text-gray-700 mb-2">
          You are selected at
        </p>
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          {selectedNotification?.companyName || 'XYZ Company'}
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-green-700">Selected</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-blue-700">Approved</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <Lightbulb className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-purple-700">Ready</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleViewOfferLetter}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-lg hover:scale-105 transition transform"
          >
            📄 View Offer Letter
          </button>
          <button
            onClick={handleBackToDashboard}
            className="w-full py-3 px-6 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          We're excited to have you on board! 🚀
        </p>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CelebrationScreen;
