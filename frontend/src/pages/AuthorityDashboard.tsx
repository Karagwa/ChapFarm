import React from 'react';
import { CheckCircle, AlertTriangle, MessageSquare, LogOut } from 'lucide-react';

const authorityMenu = [
  { label: 'Dashboard', icon: <CheckCircle className="w-5 h-5 mr-2" />, path: '/authority' },
  { label: 'Reports', icon: <AlertTriangle className="w-5 h-5 mr-2" />, path: '/authority/reports' },
  { label: 'Messages', icon: <MessageSquare className="w-5 h-5 mr-2" />, path: '/authority/messages' },
  { label: 'Logout', icon: <LogOut className="w-5 h-5 mr-2" />, path: '/' },
];

const AuthorityDashboard = () => {
  // Temporary user check (replace with context-based auth later)
  const user = { role: 'authority' };

  if (user?.role !== 'authority') return <div className="text-center mt-20 text-red-600 font-semibold">Access denied</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-chapfarm-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Authority Panel</h2>
        {authorityMenu.map((item, idx) => (
          <a
            key={idx}
            href={item.path}
            className="flex items-center text-sm font-medium hover:bg-chapfarm-600 px-3 py-2 rounded transition"
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Agricultural Officer</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded shadow text-center">
            <p className="text-gray-500 text-sm">New Farmer Reports</p>
            <p className="text-2xl font-bold text-chapfarm-700">42</p>
          </div>
          <div className="bg-white p-5 rounded shadow text-center">
            <p className="text-gray-500 text-sm">Advisories Sent</p>
            <p className="text-2xl font-bold text-chapfarm-700">18</p>
          </div>
          <div className="bg-white p-5 rounded shadow text-center">
            <p className="text-gray-500 text-sm">Pending Follow-ups</p>
            <p className="text-2xl font-bold text-chapfarm-700">7</p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-12 bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white font-medium py-2 rounded-md">
              Review Reports
            </button>
            <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white font-medium py-2 rounded-md">
              Send Alert to Region
            </button>
            <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white font-medium py-2 rounded-md">
              Compose Advisory
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorityDashboard;
