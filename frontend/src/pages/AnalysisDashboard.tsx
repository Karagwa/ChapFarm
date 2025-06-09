import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import AuthorityLayout from '../components/layouts/AuthorityLayout';

const pieData = [
  { name: 'Pest', value: 20 },
  { name: 'Flood', value: 20 },
  { name: 'Drought', value: 20 },
  { name: 'Market', value: 20 },
  { name: 'Other', value: 20 },
];

const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#8b5cf6', '#9ca3af'];

const barData = [
  {
    name: 'Pending', 'Farmer Reports': 3, 'Transport Requests': 2
  },
  {
    name: 'In Progress', 'Farmer Reports': 1, 'Transport Requests': 1
  },
  {
    name: 'Resolved/Completed', 'Farmer Reports': 1, 'Transport Requests': 1
  },
];

const regionalData = [
  { region: 'Eastern', reports: 2 },
  { region: 'Central', reports: 1 },
  { region: 'Northern', reports: 1 },
  { region: 'Western', reports: 1 },
];

const lineData = [
  { week: 'Week 1', farmerReports: 7, transportRequests: 4, alertsSent: 2 },
  { week: 'Week 2', farmerReports: 14, transportRequests: 8, alertsSent: 2 },
  { week: 'Week 3', farmerReports: 21, transportRequests: 10, alertsSent: 2 },
  { week: 'Week 4', farmerReports: 28, transportRequests: 12, alertsSent: 2 },
];

const AnalyticsPage = () => {
  return (
    <AuthorityLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">Insights and statistics from ChapFarm data</p>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded shadow p-4">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-gray-400">From 5 farmers</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-sm text-gray-500">Transport Requests</p>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-gray-400">1 completed delivery</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-sm text-gray-500">Response Rate</p>
            <p className="text-2xl font-bold">40%</p>
            <p className="text-xs text-gray-400">Average response time: 24 hours</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-sm text-gray-500">Active Regions</p>
            <p className="text-2xl font-bold">4</p>
            <p className="text-xs text-gray-400">Across 20 districts</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold mb-2">Reports by Type</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold mb-2">Status Overview</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Farmer Reports" fill="#22c55e" />
                <Bar dataKey="Transport Requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold mb-2">Regional Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={regionalData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="region" />
                <Bar dataKey="reports" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold mb-2">Activity Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="farmerReports" stroke="#22c55e" />
                <Line type="monotone" dataKey="transportRequests" stroke="#3b82f6" />
                <Line type="monotone" dataKey="alertsSent" stroke="#f97316" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AuthorityLayout>
  );
};

export default AnalyticsPage;


