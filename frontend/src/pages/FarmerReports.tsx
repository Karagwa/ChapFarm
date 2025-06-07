import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import AdminLayout from '../components/layouts/AdminLayout';

const reports = [
  {
    id: 1,
    name: 'Okello John',
    issueType: 'Pest',
    status: 'Pending',
    issue: 'Locusts are destroying my maize crops',
    location: 'Mbale, Eastern Region',
    phone: '+256741234567',
    date: '5/10/2023',
  },
  {
    id: 2,
    name: 'Apio Sarah',
    issueType: 'Flood',
    status: 'In Progress',
    issue: 'Heavy rainfall has flooded rice fields',
    location: 'Lira, Northern Region',
    phone: '+256752345678',
    date: '5/12/2023',
  },
  {
    id: 3,
    name: 'Mugisha Robert',
    issueType: 'Drought',
    status: 'Resolved',
    issue: 'No rainfall for three weeks affecting cassava',
    location: 'Mbarara, Western Region',
    phone: '+256701234567',
    date: '5/09/2023',
  },
];

const statusColor = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Resolved: 'bg-green-100 text-green-700',
};

const tagColor = {
  Pest: 'bg-red-100 text-red-600',
  Flood: 'bg-blue-100 text-blue-600',
  Drought: 'bg-orange-100 text-orange-600',
};

const FarmerReports = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' ? reports : reports.filter((r) => r.status === activeTab);

  return (
    <>
      <AdminLayout>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports Overview</h1>
          <p className="text-sm text-gray-500 mb-6">
            View and manage reports from farmers across different regions.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
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
                placeholder="Search reports..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-chapfarm-500"
              />
            </div>
            <button className="flex items-center border border-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          {/* Report Cards */}
          <div className="space-y-4">
            {filtered.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow p-4 relative">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">{report.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor[report.issueType]}`}>
                        {report.issueType}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[report.status]}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <p className="text-sm text-gray-700 mb-3">{report.issue}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Location:</strong> {report.location}</p>
                  <p><strong>Phone:</strong> {report.phone}</p>
                  <p><strong>Reported:</strong> {report.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
      
    </>
  );
};

export default FarmerReports;

