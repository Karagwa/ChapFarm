// src/pages/LoginPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ChapFarmLogo } from '../components/ChapFarmLogo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
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

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-chapfarm-600 focus:border-chapfarm-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-chapfarm-600 focus:border-chapfarm-600"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="#" className="hover:underline text-chapfarm-600">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-chapfarm-700 hover:bg-chapfarm-800 text-white py-2 rounded-md font-semibold transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-chapfarm-700 hover:underline font-medium">
              Register now
            </Link>
          </p>
          
        </div>
        
      </div>
    </>
  );
};

export default LoginPage;
