// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChapFarmLogo } from '../components/ChapFarmLogo';
import Navbar from '../components/Navbar';
import { authService } from '../services/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.login({
        username: formData.username.trim(),
        password: formData.password,
      });

      // Store token
      authService.setToken(response.access_token);

      // Optional: Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Get user role from token and redirect accordingly
      const userInfo = authService.getUserFromToken();
      const userRole = userInfo?.role || 'farmer';

      switch (userRole) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'agricultural_authority':
          navigate('/authority', { replace: true });
          break;
        case 'transport_provider':
          navigate('/transport', { replace: true });
          break;
        case 'farmer':
        default:
          navigate('/farmer-dashboard', { replace: true });
          break;
      }
      
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center bg-chapfarm-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          
          <div className="text-center mb-6">
            <ChapFarmLogo className="mx-auto h-12 w-12" />
            <h2 className="text-2xl font-bold text-chapfarm-700 mt-4">Login to ChapFarm</h2>
            <p className="text-gray-500 text-sm">Welcome back! Please sign in to continue.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-chapfarm-600 focus:border-chapfarm-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-chapfarm-600 focus:border-chapfarm-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                Remember me
              </label>
              <Link 
                to="/forgot-password" 
                className="hover:underline text-chapfarm-600 hover:text-chapfarm-800"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-chapfarm-700 hover:bg-chapfarm-800 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-chapfarm-700 hover:underline font-medium hover:text-chapfarm-800"
            >
              Register now
            </Link>
          </p>
          
        </div>
        
      </div>
    </>
  );
};

export default LoginPage;
