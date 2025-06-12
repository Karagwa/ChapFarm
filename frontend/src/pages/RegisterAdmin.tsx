import React, { useState } from 'react';
import AdminLayout from '../components/layouts/AdminLayout';
import { adminService } from '../services/adminService';
// export interface AdminCreate {
//   username: string;
//   email: string;
//   password: string;
// }
const RegisterAdmin = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'admin' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminService.registerAdmin({
        
        username: form.username,
        email: form.email,
        password: form.password,
      });
      console.log('Registration successful:', response);
      // Optionally redirect or show success message
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Register New Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter username"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter email address"
              onChange={handleChange}
              
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter password"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <button type="submit" className="bg-chapfarm-700 text-white px-4 py-2 rounded hover:bg-chapfarm-800">
            Register Admin
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default RegisterAdmin;
