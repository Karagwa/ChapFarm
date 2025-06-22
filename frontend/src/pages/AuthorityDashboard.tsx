import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import AuthorityLayout from '../components/layouts/AuthorityLayout';
import { authorityService } from '../services/authority_service';
import { AuthoritySummary } from '../types/index';

const AuthorityDashboard = () => {
  const [summary, setSummary] = useState<AuthoritySummary | null>(null);
  const [alertCount, setAlertCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch both summary and alert count in parallel
      const [summaryData, alertData] = await Promise.all([
        authorityService.getReportSummary(),
        authorityService.getAlertCount()
      ]);
      
      setSummary(summaryData);
      setAlertCount(alertData.total_alerts);
      
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AuthorityLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapfarm-600"></div>
        </div>
      </AuthorityLayout>
    );
  }

  return (
    <AuthorityLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Agricultural Officer</h1>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">New Farmer Reports</p>
              <p className="text-2xl font-bold text-chapfarm-700">
                {summary?.pending_reports || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Alerts Sent</p>
              <p className="text-2xl font-bold text-chapfarm-700">
                {alertCount || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-chapfarm-700">
                {summary?.in_progress_reports || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold text-chapfarm-700">
                {summary?.total_reports || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reports Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {summary?.pending_reports || 0}
            </div>
            <div className="text-sm text-gray-600">Pending Reports</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {summary?.in_progress_reports || 0}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {summary?.resolved_reports || 0}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/authority/farmer-reports">
            <button className="w-full flex items-center justify-center bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              <FileText className="w-5 h-5 mr-2" />
              Review Reports
              {summary?.pending_reports && summary.pending_reports > 0 && (
                <span className="ml-3 bg-red-500 text-white text-xs px-2.5 py-1.5 rounded-full font-bold">
                  {summary.pending_reports}
                </span>
              )}
            </button>
          </Link>

          <Link to="/authority/alerts">
            <button className="w-full flex items-center justify-center bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Send Alert to Region
            </button>
          </Link>
        </div>
      </div>
    </AuthorityLayout>
  );
};

export default AuthorityDashboard;
