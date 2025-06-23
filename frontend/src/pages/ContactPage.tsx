// src/pages/ContactPage.tsx

import React, { useState } from 'react';
import { ChapFarmLogo } from '../components/ChapFarmLogo';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../config/api_config';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.message.length > 2000) {
      toast.error('Message is too long (max 2000 characters)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/contact/send`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-chapfarm-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <ChapFarmLogo className="mx-auto h-12 w-12 mb-4" />
            <h1 className="text-3xl font-bold text-chapfarm-700 mb-2">Contact Us</h1>
            <p className="text-gray-600">
              We'd love to hear from you. Whether you're a farmer, partner, or supporter — drop us a message!
            </p>
          </div>

          {/* Contact Form + Info */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-chapfarm-600 focus:border-chapfarm-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-chapfarm-600 focus:border-chapfarm-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  maxLength={2000}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-chapfarm-600 focus:border-chapfarm-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Tell us how we can help you..."
                />
                <div className="mt-1 text-right text-xs text-gray-500">
                  {formData.message.length}/2000 characters
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-chapfarm-700 hover:bg-chapfarm-800 disabled:bg-chapfarm-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-chapfarm-600 w-6 h-6 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Address</p>
                  <p className="text-gray-600">ChapFarm HQ, Kampala, Uganda</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-chapfarm-600 w-6 h-6 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p className="text-gray-600">+256 700 123 456</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-chapfarm-600 w-6 h-6 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">support@chapfarm.com</p>
                </div>
              </div>

              <div className="bg-chapfarm-100 rounded-md p-4 text-chapfarm-800">
                <strong>Business Hours:</strong> <br />
                Mon–Fri: 8:00am – 5:00pm <br />
                Sat: 9:00am – 1:00pm <br />
                Sun: Closed
              </div>

              <div className="bg-blue-50 rounded-md p-4 text-blue-800">
                <p className="text-sm">
                  <strong>Response Time:</strong> We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactPage;
