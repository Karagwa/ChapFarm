import React, { useState, useEffect } from 'react';
import { Truck, ClipboardList, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TransportLayout from '../components/layouts/TransportLayout';
import { transportService } from '../services/transportService';
import { TransportSummary } from '../types/index';

const TransportDashboard = () => {
  const [summary, setSummary] = useState<TransportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await transportService.getTransportSummary();
      setSummary(data);
    } catch (error: any) {
      console.error('Error fetching summary:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <TransportLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapfarm-600"></div>
        </div>
      </TransportLayout>
    );
  }

  return (
    <TransportLayout>
      <div className="min-h-screen flex bg-gray-50">
        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Transport Provider</h1>
            <button
              onClick={fetchSummary}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Active Requests</p>
                  <p className="text-2xl font-bold text-chapfarm-700">
                    {summary?.active_requests || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Completed Trips</p>
                  <p className="text-2xl font-bold text-chapfarm-700">
                    {summary?.completed_requests || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <ClipboardList className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Pending Requests</p>
                  <p className="text-2xl font-bold text-chapfarm-700">
                    {summary?.pending_requests || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Today's Requests</p>
                  <p className="text-2xl font-bold text-chapfarm-700">
                    {summary?.today_requests || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Request Status Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {summary?.status_breakdown && Object.entries(summary.status_breakdown).map(([status, count]) => (
                <div key={status} className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                    status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    status === 'Accepted' ? 'bg-blue-100 text-blue-600' :
                    status === 'In Transit' ? 'bg-purple-100 text-purple-600' :
                    status === 'Completed' ? 'bg-green-100 text-green-600' :
                    status === 'Rejected' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="font-bold">{count}</span>
                  </div>
                  <p className="text-xs text-gray-600">{status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Requests This Week</p>
                  <p className="text-2xl font-bold text-chapfarm-700">{summary?.recent_requests || 0}</p>
                </div>
                <Clock className="w-8 h-8 text-chapfarm-500" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-chapfarm-700">{summary?.total_requests || 0}</p>
                </div>
                <ClipboardList className="w-8 h-8 text-chapfarm-500" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/transport/requests">
                <button className="w-full flex items-center justify-center bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  <ClipboardList className="w-5 h-5 mr-2" />
                  View New Requests
                </button>
              </Link>

              <Link to="/transport/history">
                <button className="w-full flex items-center justify-center bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  <Truck className="w-5 h-5 mr-2" />
                  View Delivery History
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </TransportLayout>
  );
};

export default TransportDashboard;
