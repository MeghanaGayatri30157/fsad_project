import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        const role = result.user.role.toLowerCase();
        navigate(`/${role}/dashboard`);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${role}/dashboard`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 dark:from-gray-900 via-white dark:via-gray-800 to-purple-50 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur border border-white/60 dark:border-gray-700/60 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to your CampusHire account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@gmail.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or try demo access</span>
            </div>
          </div>

          {/* Demo Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('student')}
              className="py-2 px-3 rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition text-sm"
            >
               Student Demo
            </button>
            <button
              onClick={() => handleDemoLogin('employer')}
              className="py-2 px-3 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition text-sm"
            >
               Employer Demo
            </button>
            <button
              onClick={() => handleDemoLogin('officer')}
              className="py-2 px-3 rounded-lg border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 font-medium hover:bg-green-50 dark:hover:bg-green-900/30 transition text-sm"
            >
               Officer Demo
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-3 rounded-lg border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition text-sm"
            >
               Admin Demo
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
