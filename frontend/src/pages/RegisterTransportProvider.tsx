import React, { useState } from 'react';
import AdminLayout from '../components/layouts/AdminLayout';
import { adminService } from '../services/adminService';
// export interface TransportProviderCreate {
//   name: string;
//   phone: string;
//   vehicle_type: string;
//   location: string;
//   username: string;
//   email: string;
//   password: string;
// }
const RegisterTransportProvider = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicle_type: '',
    location: '',
    username: '',
    email: '',
    password: '',
    role: 'transport_provider',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminService.registerTransportProvider({
        name: form.name,
        phone: form.phone,
        vehicle_type: form.vehicle_type,
        location: form.location,
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Register Transport Provider</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder='Enter your full name'
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder='Enter your phone number'
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />

          </div>
          


          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter your location"
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Vehicle Type</label>
            <input
              type="text"
              name="vehicle_type"
              value={form.vehicle_type}
              onChange={handleChange}
              placeholder="e.g. Pickup, Truck, Van"
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter a unique username"
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter a secure password"
              required
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <button
            type="submit"
            className="bg-chapfarm-700 text-white px-4 py-2 rounded hover:bg-chapfarm-800"
          >
            Register Transport Provider
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default RegisterTransportProvider;
