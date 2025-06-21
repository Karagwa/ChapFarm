import React, { useState } from 'react';
import AdminLayout from '../components/layouts/AdminLayout';
import { Phone } from 'lucide-react';

const AlertsPage = () => {
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('Weather Alert');
  const [severity, setSeverity] = useState('Medium');
  const [message, setMessage] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('immediate');
  const [phoneNumbersInput, setPhoneNumbersInput] = useState('');
  const [region, setRegion] = useState('All');

  // Helper to parse phone numbers from textarea
  const parsePhoneNumbers = (input) => {
    return input
      .split(/[\n,]+/)
      .map(num => num.trim())
      .filter(num => num.length > 0);
  };

  const handleSendAlert = async () => {
    // No phone number check needed!
    const payload = {
      title: alertTitle,
      alert_type: alertType,
      severity,
      region, // <-- send region only
      message,
      delivery_time: deliveryTime,
    };

    try {
      const response = await fetch('http://localhost:8000/alerts/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.status === "success") {
        alert("Alert sent successfully!");
      } else {
        alert("Failed to send alert: " + data.detail);
      }
    } catch (err) {
      alert("Error sending alert: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Alert Management</h1>
        <p className="text-sm text-gray-500 mb-6">Create and manage critical alerts for farmers</p>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          <button className="pb-2 border-b-2 border-chapfarm-700 font-medium text-chapfarm-700">Create Alert</button>
          <button className="pb-2 text-gray-500 hover:text-chapfarm-700">Alert History</button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Alert</h2>

          {/* Alert Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
            <input
              type="text"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="Enter a clear, concise title"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Alert Type and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="alert-type" className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
              <select
                id="alert-type"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option>Weather Alert</option>
                <option>Market Alert</option>
                <option>Health Advisory</option>
                <option>Emergency Notice</option>
              </select>
            </div>
            <div>
              <label htmlFor="severity-level" className="block text-sm font-medium text-gray-700 mb-1">Severity Level</label>
              <select
                id="severity-level"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Target Region */}
          <div className="mb-4">
            <label htmlFor="target-region" className="block text-sm font-medium text-gray-700 mb-1">Target Region</label>
            <select
              id="target-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Central</option>
              <option>Eastern</option>
              <option>Northern</option>
              <option>Western</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Select 'All' to target all farmers</p>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Alert Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Type your alert message here..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Keep messages clear and actionable. USSD has character limitations.</p>
          </div>

          {/* Delivery Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
            <div className="flex gap-4">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  value="immediate"
                  checked={deliveryTime === 'immediate'}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="mr-2"
                />
                Send Immediately
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  value="scheduled"
                  checked={deliveryTime === 'scheduled'}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="mr-2"
                />
                Schedule for Later
              </label>
            </div>
          </div>

          <button
            onClick={handleSendAlert}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold text-sm hover:bg-green-700"
          >
            ⚠️ Preview Alert
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AlertsPage;
