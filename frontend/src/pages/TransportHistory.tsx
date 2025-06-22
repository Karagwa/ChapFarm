import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RefreshCw } from 'lucide-react';
import TransportLayout from '../components/layouts/TransportLayout';
import { transportService } from '../services/transportService';
import { TransportRequestDetailed } from '../types/index';

const TransportHistoryPage = () => {
  const [history, setHistory] = useState<TransportRequestDetailed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransportHistory();
  }, []);

  const fetchTransportHistory = async () => {
    try {
      setLoading(true);
      const data = await transportService.getTransportHistory();
      setHistory(data);
    } catch (error: any) {
      console.error('Error fetching transport history:', error);
      toast.error('Failed to load transport history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <TransportLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapfarm-600"></div>
        </div>
      </TransportLayout>
    );
  }

  return (
    <TransportLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transport Request History</h1>
        <button
          onClick={fetchTransportHistory}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          <p>No transport history found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Request ID</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Farmer</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Transport Type</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">From</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">To</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((req) => (
                <tr key={req.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">TR-{req.id.toString().padStart(5, '0')}</td>
                  <td className="px-6 py-4">{req.farmer_name}</td>
                  <td className="px-6 py-4">{req.transport_type || 'Any'}</td>
                  <td className="px-6 py-4">{req.pickup_location || 'Not specified'}</td>
                  <td className="px-6 py-4">{req.dropoff_location || 'Not specified'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(req.status)}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(req.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </TransportLayout>
  );
};

export default TransportHistoryPage;
