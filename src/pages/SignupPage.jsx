import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.includes('@')) {
      setError('Valid email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup(email, password, name, role);
      navigate(`/${role}/dashboard`);
      setLoading(false);
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Join CampusHire today</p>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="first second"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="student">Student</option>
                <option value="employer">Employer</option>
                <option value="officer">Placement Officer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
