import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layouts/AdminLayout';
import { adminService } from '../services/adminService';
import { toast } from 'react-toastify';

const RegisterOfficer = () => {
  const [form, setForm] = useState({
    institution_name: '',
    name: '',
    phone: '',
    location: '',
    username: '',
    email: '',
    password: '',
    
    role: 'agricultural_authority',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await adminService.registerAuthority({
        institution_name: form.institution_name,
        name: form.name,
        phone: form.phone,
        location: form.location,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      console.log('Registration successful:', response);
      // show success message or redirect user
      setForm({
        institution_name: '',
        name: '',
        phone: '',
        location: '',
        username: '',
        email: '',
        password: '',
        role: 'agriculture_authority',
      });

      // Show success toast
      toast.success('Agricultural Officer registered successfully!', {
        autoClose: 4000,
        position: 'top-right',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Show specific error message
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
      
      if (errorMessage.includes('already exists')) {
        toast.error('This email is already registered. Please use a different email address.', {
          autoClose: 5000,
          position: 'top-right',
        });
      } else {
        toast.error(errorMessage, {
          autoClose: 4000,
          position: 'top-right',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Register Agricultural Officer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Institution Name</label>
            <input
              type="text"
              name="institution_name"
              value={form.institution_name}
              onChange={handleChange}
              required
              placeholder="Enter institution name"
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>

          <div>
            
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
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
              required
              placeholder="Enter location"
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
              required
              placeholder="Enter username"
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
              required
              placeholder="Enter email"
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
              required
              placeholder="Enter password"
              className="w-full border px-4 py-2 rounded focus:ring-1 focus:ring-chapfarm-700"
            />
          </div>
          
          <button
            type="submit"
            className="bg-chapfarm-700 text-white px-4 py-2 rounded hover:bg-chapfarm-800"
          >
            Register Officer
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default RegisterOfficer;
