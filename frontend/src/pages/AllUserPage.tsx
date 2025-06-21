import React from 'react';
import AdminLayout from '../components/layouts/AdminLayout';

const users = [
  { id: 1, name: 'Okello John', email: 'john@example.com', role: 'Farmer', region: 'Eastern' },
  { id: 2, name: 'Apio Sarah', email: 'sarah@example.com', role: 'Farmer', region: 'Northern' },
  { id: 3, name: 'Mugisha Robert', email: 'robert@example.com', role: 'Transport Provider', region: 'Western' },
  { id: 4, name: 'Namukwaya Joy', email: 'joy@example.com', role: 'Agric Authority', region: 'Central' },
];

const AllUsersPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Registered Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Region</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.map((user, index) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">{user.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AllUsersPage;
