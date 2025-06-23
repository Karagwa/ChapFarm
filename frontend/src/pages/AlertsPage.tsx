import React, { useState } from 'react';
import AdminLayout from '../components/layouts/AuthorityLayout';
import { Phone } from 'lucide-react';
import { toast } from 'react-toastify';

const AlertsPage = () => {
  const [alertTitle, setAlertTitle] = useState('');
  const [alertType, setAlertType] = useState('Weather Alert');
  const [severity, setSeverity] = useState('Medium');
  const [message, setMessage] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('immediate');
  const [phoneNumbersInput, setPhoneNumbersInput] = useState('');
  const [region, setRegion] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Helper to parse phone numbers from textarea
  const parsePhoneNumbers = (input) => {
    return input
      .split(/[\n,]+/)
      .map(num => num.trim())
      .filter(num => num.length > 0);
  };

  const handleSendAlert = async () => {
    // Validation
    if (!alertTitle.trim()) {
      toast.error('Please enter an alert title');
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter an alert message');
      return;
    }

    if (message.length > 160) {
      toast.warning('Message is too long for USSD. Please keep it under 160 characters.');
      return;
    }

    setIsLoading(true);

    const payload = {
      title: alertTitle,
      alert_type: alertType,
      severity,
      region,
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
      
      if (response.ok && data.status === "success") {
        toast.success(`Alert sent successfully! ${data.recipients_count || 'Multiple'} farmers notified.`);
        
        // Reset form on success
        setAlertTitle('');
        setMessage('');
        setDeliveryTime('immediate');
        setRegion('All');
      } else {
        toast.error(`Failed to send alert: ${data.detail || 'Unknown error occurred'}`);
      }
    } catch (err) {
      console.error('Alert sending error:', err);
      toast.error(`Network error: ${err.message}. Please check your connection and try again.`);
    } finally {
      setIsLoading(false);
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
          
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Alert</h2>

          {/* Alert Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alert Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="Enter a clear, concise title"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-chapfarm-500 focus:border-chapfarm-500"
              disabled={isLoading}
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
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-chapfarm-500 focus:border-chapfarm-500"
                disabled={isLoading}
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
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-chapfarm-500 focus:border-chapfarm-500"
                disabled={isLoading}
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
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-chapfarm-500 focus:border-chapfarm-500"
              disabled={isLoading}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alert Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Type your alert message here..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-chapfarm-500 focus:border-chapfarm-500"
              disabled={isLoading}
              maxLength={200}
            ></textarea>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Keep messages clear and actionable. USSD has character limitations.</span>
              <span className={`${message.length > 160 ? 'text-red-500 font-medium' : ''}`}>
                {message.length}/160 characters
              </span>
            </div>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
                Schedule for Later
              </label>
            </div>
          </div>

          <button
            onClick={handleSendAlert}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold text-sm hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Alert...
              </>
            ) : (
              <>
                ⚠️ Send Alert
              </>
            )}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AlertsPage;
