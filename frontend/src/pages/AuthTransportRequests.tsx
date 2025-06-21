import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import AdminLayout from '../components/layouts/AuthorityLayout';

const transportRequests = [
  {
    id: 1,
    name: 'Okello John',
    cargo: 'Maize (500 kg)',
    pickup: 'Mbale, Eastern Region',
    destination: 'Kampala Central Market',
    contact: '+256741234567',
    date: '5/20/2023',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Mugisha Robert',
    cargo: 'Coffee Beans (300 kg)',
    pickup: 'Mbarara, Western Region',
    destination: 'Kampala Export Zone',
    contact: '+256763456789',
    date: '5/22/2023',
    status: 'Accepted',
  },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Accepted: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

const TransportRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredRequests =
    activeTab === 'All'
      ? transportRequests
      : transportRequests.filter((req) => req.status === activeTab);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Transport Requests</h1>
        <p className="text-sm text-gray-500 mb-6">
          View all transport requests in the system
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Pending', 'Accepted', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded border text-sm font-medium ${
                activeTab === tab
                  ? 'bg-chapfarm-700 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-chapfarm-500"
            />
          </div>
          <button className="flex items-center border border-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-lg shadow p-4 relative">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">{req.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Cargo:</strong> {req.cargo}</p>
                <p><strong>Pickup:</strong> {req.pickup}</p>
                <p><strong>Destination:</strong> {req.destination}</p>
                <p><strong>Contact:</strong> {req.contact}</p>
                <p><strong>Requested:</strong> {req.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TransportRequestsPage;
