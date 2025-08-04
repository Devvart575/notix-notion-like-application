import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { COLORS } from '../../utils/constant.js';

export const AuthForm = ({ isLogin, onToggle }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.username, formData.email, formData.password);
      }

      // ✅ Redirect to /app after successful login/signup
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }

    setLoading(false);
  };

  const handleClose = () => {
    //  Close modal by going back or to home
    if (location.state?.backgroundLocation) {
      navigate(-1); // go back to previous page
    } else {
      navigate('/'); // fallback to home
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Cross button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close"
          type="button"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: COLORS.primary }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.primary }}>
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': COLORS.primary }}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.primary }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': COLORS.primary }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.primary }}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': COLORS.primary }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md text-black font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: COLORS.secondary }}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: COLORS.primary }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={onToggle}
            className="font-medium hover:underline"
            style={{ color: COLORS.secondary }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};
