import React from 'react';
import AdminLayout from '../components/layouts/AdminLayout';

const AdminDashboard = () => {
  const recentReports = [
    { name: 'Okello John', issue: 'Pest issue in Mbale, Eastern Region', date: '10/05/2023' },
    { name: 'Apio Sarah', issue: 'Flood issue in Lira, Northern Region', date: '12/05/2023' },
    { name: 'Mugisha Robert', issue: 'Drought issue in Mbarara, Western Region', date: '05/05/2023' },
    { name: 'Namukwaya Joy', issue: 'Market issue in Kampala, Central Region', date: '14/05/2023' },
  ];

  const recentActivity = [
    { user: 'Admin User', activity: 'Created user account - Agric Authority', date: '05/01/2023' },
    { user: 'Admin User', activity: 'Created user account - Transport Provider', date: '10/01/2023' },
    { user: 'Agric Authority', activity: 'Resolved issue - Drought report from Mugisha Robert', date: '15/05/2023' },
    { user: 'Transport Provider', activity: 'Accepted transport request - Coffee transport for Mugisha Robert', date: '18/05/2023' },
    { user: 'Transport Provider', activity: 'Completed delivery - Rice transport for Apio Sarah', date: '17/05/2023' },
  ];

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Registered Users</p>
          <p className="text-2xl font-bold text-chapfarm-700">1,204</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Farmers Online</p>
          <p className="text-2xl font-bold text-chapfarm-700">327</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Reports Today</p>
          <p className="text-2xl font-bold text-chapfarm-700">58</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Pending Approvals</p>
          <p className="text-2xl font-bold text-chapfarm-700">16</p>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 mb-8">
        📊 Future Chart Area (User growth, region stats, etc.)
      </div>

      {/* Recent Reports and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Reports</h2>
          <ul className="text-sm space-y-3">
            {recentReports.map((r, index) => (
              <li key={index}>
                <p className="font-medium text-gray-800">{r.name}</p>
                <p className="text-gray-500 text-xs">{r.issue}</p>
                <p className="text-gray-400 text-xs">{r.date}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="text-sm space-y-3">
            {recentActivity.map((a, index) => (
              <li key={index}>
                <p className="font-medium text-gray-800">{a.user}</p>
                <p className="text-gray-500 text-xs">{a.activity}</p>
                <p className="text-gray-400 text-xs">{a.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
