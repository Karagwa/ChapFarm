import React from 'react';
import AdminLayout from '../components/layouts/AdminLayout';


const AdminDashboard = () => {
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
    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
      📊 Future Chart Area (User growth, region stats, etc.)
    </div>
  </AdminLayout>
);

};

export default AdminDashboard;
