import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/layouts/AdminLayout';
import { transportService } from '../services/transportService';
import { TransportRequestDetailed } from '../types/index';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  in_transit: 'bg-purple-100 text-purple-700',
};

const TransportRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [transportRequests, setTransportRequests] = useState<TransportRequestDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  // Fetch transport requests on component mount
  useEffect(() => {
    fetchTransportRequests();
  }, []);

  const fetchTransportRequests = async () => {
    try {
      setLoading(true);
      const data = await transportService.getTransportRequests();
      setTransportRequests(data);
    } catch (error: any) {
      console.error('Error fetching transport requests:', error);
      toast.error('Failed to load transport requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: number, newStatus: string) => {
    try {
      setUpdatingStatus(requestId);
      await transportService.updateTransportRequestStatus(requestId, newStatus);
      
      // Update local state
      setTransportRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: newStatus }
            : req
        )
      );
      
      toast.success(`Request ${newStatus} successfully`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update request status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Filter requests based on active tab and search term
  const filteredRequests = transportRequests.filter(req => {
    const matchesTab = activeTab === 'All' || req.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      req.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.pickup_location?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      req.dropoff_location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapfarm-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Transport Requests</h1>
            <p className="text-sm text-gray-500">
              View and manage all transport requests ({transportRequests.length} total)
            </p>
          </div>
          <button
            onClick={fetchTransportRequests}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Pending', 'Accepted', 'In_Transit', 'Completed', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded border text-sm font-medium ${
                activeTab === tab
                  ? 'bg-chapfarm-700 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.replace('_', ' ')}
              <span className="ml-2 text-xs">
                ({tab === 'All' ? transportRequests.length : 
                  transportRequests.filter(req => req.status.toLowerCase() === tab.toLowerCase()).length})
              </span>
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by farmer, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-chapfarm-500"
            />
          </div>
          <button className="flex items-center border border-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No transport requests found</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-chapfarm-600 hover:underline mt-2"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow p-4 relative">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{req.farmer_name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          statusColors[req.status.toLowerCase() as keyof typeof statusColors] || 
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {req.status.toLowerCase() === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'accepted')}
                        disabled={updatingStatus === req.id}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        {updatingStatus === req.id ? 'Updating...' : 'Accept'}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'rejected')}
                        disabled={updatingStatus === req.id}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {updatingStatus === req.id ? 'Updating...' : 'Reject'}
                      </button>
                    </div>
                  )}
                  
                  {req.status.toLowerCase() === 'accepted' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'in_transit')}
                        disabled={updatingStatus === req.id}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {updatingStatus === req.id ? 'Updating...' : 'Start Transit'}
                      </button>
                    </div>
                  )}
                  
                  {req.status.toLowerCase() === 'in_transit' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'completed')}
                        disabled={updatingStatus === req.id}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        {updatingStatus === req.id ? 'Updating...' : 'Complete'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-700 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Transport Type:</strong> {req.transport_type || 'Any'}</p>
                      <p><strong>Pickup:</strong> {req.pickup_location || 'Not specified'}</p>
                      <p><strong>Destination:</strong> {req.dropoff_location || 'Not specified'}</p>
                    </div>
                    <div>
                      <p><strong>Farmer:</strong> {req.farmer_name}</p>
                      <p><strong>Contact:</strong> {req.farmer_phone}</p>
                      <p><strong>Location:</strong> {req.farmer_location}</p>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-xs text-gray-500">
                      <strong>Requested:</strong> {formatDate(req.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TransportRequestsPage;
