import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, RefreshCw, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import AuthorityLayout from '../components/layouts/AuthorityLayout';
import { authorityService } from '../services/authority_service';
import { FarmerReport } from '../types/index';
const statusColor = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Resolved: 'bg-green-100 text-green-700',
};

const tagColor = {
  Pest: 'bg-red-100 text-red-600',
  Flood: 'bg-blue-100 text-blue-600',
  Drought: 'bg-orange-100 text-orange-600',
  Disease: 'bg-purple-100 text-purple-600',
  Flooding: 'bg-blue-100 text-blue-600',
  Pests: 'bg-red-100 text-red-600',
};

const FarmerReports = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [reports, setReports] = useState<FarmerReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [resolvingReports, setResolvingReports] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await authorityService.getReports();
      setReports(data);
    } catch (error: any) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load farmer reports');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveReport = async (reportId: number) => {
    try {
      setResolvingReports(prev => new Set(prev).add(reportId));
      await authorityService.resolveReport(reportId);
      
      // Update local state
      setReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, status: 'Resolved' }
            : report
        )
      );
      
      toast.success('Report marked as resolved');
    } catch (error: any) {
      console.error('Error resolving report:', error);
      toast.error('Failed to resolve report');
    } finally {
      setResolvingReports(prev => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
    }
  };

  // Filter reports based on active tab and search term
  const filteredReports = reports.filter(report => {
    const matchesTab = activeTab === 'All' || report.status === activeTab;
    const matchesSearch = searchTerm === '' || 
      report.farmer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.issue_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <AuthorityLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapfarm-600"></div>
        </div>
      </AuthorityLayout>
    );
  }

  return (
    <AuthorityLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports Overview</h1>
            <p className="text-sm text-gray-500">
              View and manage reports from farmers across different regions ({reports.length} total)
            </p>
          </div>
          <button
            onClick={fetchReports}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded border text-sm font-medium ${
                activeTab === tab
                  ? 'bg-chapfarm-700 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}
              <span className="ml-2 text-xs">
                ({tab === 'All' ? reports.length : 
                  reports.filter(r => r.status === tab).length})
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
              placeholder="Search reports..."
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

        {/* Report Cards */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No reports found</p>
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
            filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow p-4 relative">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">
                      {report.farmer_name || `Farmer ID: ${report.farmer_id}`}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        tagColor[report.issue_type] || 'bg-gray-100 text-gray-600'
                      }`}>
                        {report.issue_type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        statusColor[report.status] || 'bg-gray-100 text-gray-600'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  {report.status === 'Pending' && (
                    <button
                      onClick={() => handleResolveReport(report.id)}
                      disabled={resolvingReports.has(report.id)}
                      className="flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {resolvingReports.has(report.id) ? (
                        'Resolving...'
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolve
                        </>
                      )}
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  {report.description || 'No description provided'}
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Location:</strong> {report.location || 'Not specified'}</p>
                  <p><strong>Phone:</strong> {report.farmer_phone || 'Not provided'}</p>
                  <p><strong>Reported:</strong> {formatDate(report.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AuthorityLayout>
  );
};

export default FarmerReports;

