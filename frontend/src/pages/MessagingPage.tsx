import React, { useState } from 'react';
import AdminLayout from '../components/layouts/AdminLayout';

const farmers = [
  'Okello John',
  'Apio Sarah',
  'Mugisha Robert',
];

const MessagingPage = () => {
  const [activeTab, setActiveTab] = useState('Direct Message');
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!selectedFarmer || !message) return alert('Please fill all fields.');
    alert(`Message sent to ${selectedFarmer}: ${message}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Messaging</h1>
        <p className="text-sm text-gray-500 mb-6">Send messages and alerts to farmers through USSD</p>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          {['Direct Message', 'Group Message', 'Broadcast'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? 'border-chapfarm-700 text-chapfarm-700'
                  : 'border-transparent text-gray-500 hover:text-chapfarm-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Direct Message' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Direct Message</h2>
            <p className="text-sm text-gray-500 mb-4">Send a message to an individual farmer</p>

            <div className="mb-4">
              <label htmlFor="farmer-select" className="text-sm font-medium text-gray-700 block mb-1">Select Farmer</label>
              <select
                id="farmer-select"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedFarmer}
                onChange={(e) => setSelectedFarmer(e.target.value)}
              >
                <option value="">Select a farmer</option>
                {farmers.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">Keep messages concise. USSD has character limitations.</p>
            </div>

            <button
              className="bg-green-600 text-white px-6 py-2 rounded flex items-center space-x-2 hover:bg-green-700"
              onClick={handleSend}
            >
              <span>Send Message</span>
            </button>
          </div>
        )}

        {activeTab !== 'Direct Message' && (
          <div className="text-gray-500 text-sm text-center py-8">
            This feature is coming soon.
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MessagingPage;
