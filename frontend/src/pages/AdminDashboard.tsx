import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/layouts/AdminLayout';
import { adminService } from '../services/adminService';
import type { DashboardSummary, RecentActivity, RecentReport } from '../types';

// ===============================================
// START: New Imports for Charting
// ===============================================
// ONLY KEEP these imports for the chart components you actually RENDER (Bar, Doughnut)
import { Bar, Doughnut } from 'react-chartjs-2';
// REMOVE: All imports from 'chart.js' here, as they are for registration
// which is now handled in your charts_config.ts and index.tsx.
// Example: import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from 'chart.js';
// ===============================================
// END: New Imports for Charting
// ===============================================


// ===============================================
// REMOVE: This entire Chart.js Registration block.
// It is now handled in your charts_config.ts and index.tsx.
// ===============================================
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title
// );
// ===============================================
// END: Chart.js Registration
// ===============================================


const AdminDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [summaryData, reportsData, activityData] = await Promise.all([
          adminService.getDashboardSummary(),
          adminService.getRecentReports(),
          adminService.getRecentActivity(),
        ]);

        setSummary(summaryData);
        setRecentReports(reportsData);
        setRecentActivity(activityData);
      } catch (error: any) {
        console.error('Dashboard summary error:', error);
        toast.error('Failed to load dashboard summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    const fetchDashboardData = async () => {
      try {
        const [summaryData, reportsData, activityData] = await Promise.all([
          adminService.getDashboardSummary(),
          adminService.getRecentReports(),
          adminService.getRecentActivity(),
        ]);

        setSummary(summaryData);
        setRecentReports(reportsData);
        setRecentActivity(activityData);
        toast.success('Dashboard data refreshed');
      } catch (error: any) {
        console.error('Dashboard refresh error:', error);
        toast.error('Failed to refresh dashboard data');
      } finally {
        setLoading(false);
      }
    };

    await fetchDashboardData();
  };


  // ===============================================
  // START: Data Preparation for Charts
  // This code prepares the data in a format that Chart.js understands.
  // It should be placed within the component, after the state declarations
  // but before the return statement of your component.
  // ===============================================

  // Prepare data for User Types Bar Chart
  const userTypesData = {
    labels: ['Users', 'Farmers', 'Transport Providers', 'Authorities'],
    datasets: [
      {
        label: 'Number of Registrations',
        data: summary
          ? [
              summary.registered_users,
              summary.registered_farmers,
              summary.registered_transport_providers,
              summary.registered_authorities,
            ]
          : [],
        backgroundColor: [
          'rgba(98, 116, 219, 0.6)', // chapfarm-600 like
          'rgba(76, 175, 80, 0.6)', // green-500 like
          'rgba(33, 150, 243, 0.6)', // blue-500 like
          'rgba(156, 39, 176, 0.6)', // purple-500 like
        ],
        borderColor: [
          'rgba(98, 116, 219, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Report Status Doughnut Chart
  const reportStatusData = {
    labels: ['Pending Reports', 'Resolved Reports ', 'Other Statuses'],
    datasets: [
      {
        label: 'Report Status',
        data: summary
          ? [
              summary.pending_reports,
              summary.total_reports - summary.pending_reports, // Assuming resolved are total - pending
              0 // Placeholder for other statuses if you had them
            ]
          : [],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)', // red-500 like
          'rgba(34, 197, 94, 0.6)', // green for resolved
          'rgba(59, 130, 246, 0.6)', // blue for other
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Optional: Chart options for customization (e.g., titles, responsiveness)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,// Allows you to control aspect ratio via parent div
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '', // This will be overridden by h2 below
      },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };

  // ===============================================
  // END: Data Preparation for Charts
  // ===============================================


  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapfarm-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-chapfarm-600 text-white rounded hover:bg-chapfarm-700 transition"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {summary ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ... Existing Summary Cards ... */}
            {/* Users Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-chapfarm-600">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-chapfarm-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-chapfarm-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                  <p className="text-3xl font-bold text-chapfarm-600">
                    {summary.registered_users}
                  </p>
                </div>
              </div>
            </div>

            {/* Farmers Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Farmers</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {summary.registered_farmers}
                  </p>
                </div>
              </div>
            </div>

            {/* Transport Providers Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Transport Providers</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {summary.registered_transport_providers}
                  </p>
                </div>
              </div>
            </div>

            {/* Authorities Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Authorities</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {summary.registered_authorities}
                  </p>
                </div>
              </div>
            </div>

            {/* Reports Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M17 16a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 012 0v4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Total Reports</h3>
                  <p className="text-3xl font-bold text-orange-600">
                    {summary.total_reports}
                  </p>
                </div>
              </div>
            </div>

            {/* Pending Reports Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Pending Reports</h3>
                  <p className="text-3xl font-bold text-red-600">
                    {summary.pending_reports}
                  </p>
                </div>
              </div>
            </div>

            {/* Transport Requests Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Transport Requests</h3>
                  <p className="text-3xl font-bold text-indigo-600">
                    {summary.total_transport_requests}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Alerts Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">Weather Alerts</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {summary.total_weather_alerts}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow">
            Failed to load dashboard data
          </div>
        )}

        {/* ===============================================
            START: Chart Area - Replace the old placeholder
            This is where you put the actual Chart components.
            =============================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-6 h-[450px]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 ">User Registrations Overview</h2>
                {/* Ensure summary is not null before rendering chart */}
                {summary && <Bar data={userTypesData} options={chartOptions} />}
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-[450px]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Status Distribution</h2>
                {/* Ensure summary is not null before rendering chart */}
                {summary && <Doughnut data={reportStatusData} options={chartOptions} />}
            </div>
        </div>
        {/* ===============================================
            END: Chart Area
            =============================================== */}

        {/* Recent Reports and Activity - Updated with real data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"> {/* Added mt-6 for spacing */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Reports</h2>
            {recentReports.length > 0 ? (
              <ul className="text-sm space-y-3">
                {recentReports.map((report) => (
                  <li
                    key={report.id}
                    className="border-b border-gray-100 pb-3 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {report.farmer_name}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          <span className="font-medium">{report.issue_type}:</span>{' '}
                          {report.description}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          📍 {report.location} | 📞 {report.phone}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">{report.date}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          report.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : report.status === 'resolved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent reports</p>
            )}
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <ul className="text-sm space-y-3">
                {recentActivity.map((activity, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 pb-3 last:border-b-0"
                  >
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-chapfarm-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.user}</p>
                        <p className="text-gray-600 text-xs mt-1">
                          {activity.activity}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">{activity.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;