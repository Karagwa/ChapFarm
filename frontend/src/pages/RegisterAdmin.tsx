import React, { useState } from 'react';
import AdminLayout from '../components/layouts/AdminLayout';

const RegisterAdmin = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Later: send to backend API
    alert(`Admin registered: ${JSON.stringify(form, null, 2)}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Register New Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
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
