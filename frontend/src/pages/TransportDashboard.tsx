import React from 'react';
import { Truck, ClipboardList, Clock, LogOut } from 'lucide-react';

const menu = [
  { label: 'Dashboard', icon: <Truck className="w-5 h-5 mr-2" />, path: '/transport' },
  { label: 'Requests', icon: <ClipboardList className="w-5 h-5 mr-2" />, path: '/transport/requests' },
  { label: 'History', icon: <Clock className="w-5 h-5 mr-2" />, path: '/transport/history' },
  { label: 'Logout', icon: <LogOut className="w-5 h-5 mr-2" />, path: '/' },
];

const TransportDashboard = () => {
  // Mock user role check — replace with real auth logic
  const user = { role: 'transport' };

  if (user?.role !== 'transport') {
    return <div className="text-center mt-20 text-red-600 font-semibold">Access denied</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-chapfarm-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Transport Panel</h2>
        {menu.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className="flex items-center text-sm font-medium hover:bg-chapfarm-600 px-3 py-2 rounded transition"
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Transport Provider</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-500">Active Requests</p>
            <p className="text-2xl font-bold text-chapfarm-700">12</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-500">Completed Trips</p>
            <p className="text-2xl font-bold text-chapfarm-700">142</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-500">Pending Confirmations</p>
            <p className="text-2xl font-bold text-chapfarm-700">3</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-2 rounded font-medium transition">
              View New Requests
            </button>
            <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-2 rounded font-medium transition">
              Update Trip Status
            </button>
            <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-2 rounded font-medium transition">
              View Delivery History
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransportDashboard;
