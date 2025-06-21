import React from 'react';
import { Truck, ClipboardList, Clock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import TransportLayout from '../components/layouts/TransportLayout';


const TransportDashboard = () => {
  // Mock user role check — replace with real auth logic
  const user = { role: 'transport' };

  if (user?.role !== 'transport') {
    return <div className="text-center mt-20 text-red-600 font-semibold">Access denied</div>;
  }

  return (
    <TransportLayout>
    <div className="min-h-screen flex bg-gray-50"> 

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
       

<div className="flex flex-col gap-4">
  <Link to="/transport/requests">
    <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-2 rounded font-medium transition">
      View New Requests
    </button>
  </Link>

  <Link to="/transport/history">
    <button className="w-full bg-chapfarm-600 hover:bg-chapfarm-700 text-white py-2 rounded font-medium transition">
      View Delivery History
    </button>
  </Link>
</div>

      </main>
    </div>
    </TransportLayout>
  );
};

export default TransportDashboard;
