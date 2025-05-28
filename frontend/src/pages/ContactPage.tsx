// src/pages/ContactPage.tsx

import React from 'react';
import { ChapFarmLogo } from '../components/ChapFarmLogo';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
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
              We'd love to hear from you. Whether you’re a farmer, partner, or supporter — drop us a message!
            </p>
          </div>

          {/* Contact Form + Info */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-chapfarm-600 focus:border-chapfarm-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-chapfarm-600 focus:border-chapfarm-600"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-chapfarm-600 focus:border-chapfarm-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-chapfarm-700 hover:bg-chapfarm-800 text-white font-semibold py-2 rounded-md transition"
              >
                Send Message
              </button>
            </form>

            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-chapfarm-600 w-6 h-6 mt-1 mr-3" />
                <p className="text-gray-700">ChapFarm HQ, Kampala, Uganda</p>
              </div>

              <div className="flex items-start">
                <Phone className="text-chapfarm-600 w-6 h-6 mt-1 mr-3" />
                <p className="text-gray-700">+256 700 123 456</p>
              </div>

              <div className="flex items-start">
                <Mail className="text-chapfarm-600 w-6 h-6 mt-1 mr-3" />
                <p className="text-gray-700">support@chapfarm.com</p>
              </div>

              <div className="bg-chapfarm-100 rounded-md p-4 text-chapfarm-800">
                <strong>Hours:</strong> <br />
                Mon–Fri: 8:00am – 5:00pm <br />
                Sat: 9:00am – 1:00pm
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
