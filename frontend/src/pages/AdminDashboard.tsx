import React from 'react';
import { BarChart2, Users, FileText, LogOut } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: <BarChart2 className="w-5 h-5 mr-2" />, path: '/admin' },
  { label: 'Users', icon: <Users className="w-5 h-5 mr-2" />, path: '/admin/users' },
  { label: 'Reports', icon: <FileText className="w-5 h-5 mr-2" />, path: '/admin/reports' },
  { label: 'Logout', icon: <LogOut className="w-5 h-5 mr-2" />, path: '/' },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-chapfarm-700 text-white flex flex-col p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">ChapFarm Admin</h1>
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href={item.path}
            className="flex items-center text-sm font-medium hover:bg-chapfarm-600 rounded px-3 py-2 transition"
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
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

        {/* Placeholder Chart Section */}
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          📊 Future Chart Area (User growth, region stats, etc.)
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
