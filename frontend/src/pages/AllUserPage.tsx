import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Edit, Trash2, Users, UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/layouts/AdminLayout';
import { adminService, User } from '../services/adminService';

interface Farmer {
  id: number;
  name: string;
  phone: string;
  location: string;
  region: string;
  registered_at: string;
  user_id: number | null;
}

const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [farmersLoading, setFarmersLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [farmerSearchTerm, setFarmerSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterRegion, setFilterRegion] = useState('All');
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'farmers'
  const [managingUserId, setManagingUserId] = useState<number | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchFarmers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchFarmers = async () => {
    try {
      setFarmersLoading(true);
      const data = await adminService.listFarmers();
      setFarmers(data);
    } catch (error: any) {
      console.error('Error fetching farmers:', error);
      toast.error('Failed to load farmers');
    } finally {
      setFarmersLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return;

    try {
      setManagingUserId(selectedUser.id);
      await adminService.changeUserRole(selectedUser.id, newRole);
      
      setUsers(prev => 
        prev.map(user => 
          user.id === selectedUser.id 
            ? { ...user, role: newRole }
            : user
        )
      );
      
      toast.success(`User role updated to ${newRole}`);
      setShowRoleModal(false);
      setSelectedUser(null);
      setNewRole('');
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    } finally {
      setManagingUserId(null);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to permanently delete user "${user.username}" (ID: ${user.id})? This action cannot be undone.`)) return;

    try {
      setManagingUserId(user.id);
      await adminService.deleteUser(user.id);
      
      setUsers(prev => prev.filter(u => u.id !== user.id));
      
      toast.success('User deleted successfully');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setManagingUserId(null);
    }
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm);
    
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmerSearchTerm === '' || 
      farmer.name.toLowerCase().includes(farmerSearchTerm.toLowerCase()) ||
      farmer.phone.includes(farmerSearchTerm) ||
      farmer.id.toString().includes(farmerSearchTerm);
    
    const matchesRegion = filterRegion === 'All' || farmer.region === filterRegion;
    
    return matchesSearch && matchesRegion;
  });

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'farmer':
        return 'bg-green-100 text-green-800';
      case 'transport_provider':
        return 'bg-blue-100 text-blue-800';
      case 'agricultural_authority':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && farmersLoading) {
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-sm text-gray-500">
              Manage all registered users and farmers ({users.length} users, {farmers.length} farmers)
            </p>
          </div>
          <button
            onClick={() => {
              fetchUsers();
              fetchFarmers();
            }}
            disabled={loading || farmersLoading}
            className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${(loading || farmersLoading) ? 'animate-spin' : ''}`} />
            Refresh All
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === 'users'
                ? 'bg-chapfarm-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            System Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === 'farmers'
                ? 'bg-chapfarm-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Farmers ({farmers.length})
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <>
            {/* Users Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, username, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-chapfarm-500"
                />
              </div>
              
              <label htmlFor="role-filter" className="sr-only">
                Filter by Role
              </label>
              <select
                id="role-filter"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-chapfarm-500"
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="farmer">Farmer</option>
                <option value="transport_provider">Transport Provider</option>
                <option value="agricultural_authority">Agricultural Authority</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-left text-sm text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chapfarm-600 mx-auto"></div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No users found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-gray-600">#{user.id}</td>
                        <td className="px-6 py-4 font-medium">{user.username}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRoleColor(user.role)}`}>
                            {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openRoleModal(user)}
                              disabled={managingUserId === user.id}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded disabled:opacity-50"
                              title="Change Role"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handleDeleteUser(user)}
                                disabled={managingUserId === user.id}
                                className="p-2 text-red-600 hover:bg-red-100 rounded disabled:opacity-50"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Farmers Tab */}
        {activeTab === 'farmers' && (
          <>
            {/* Farmers Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, name, or phone..."
                  value={farmerSearchTerm}
                  onChange={(e) => setFarmerSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-chapfarm-500"
                />
              </div>
              
              <label htmlFor="region-filter" className="sr-only">
                Filter by Region
              </label>
              <select
                id="region-filter"
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-chapfarm-500"
              >
                <option value="All">All Regions</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
                <option value="Western">Western</option>
                <option value="Northern">Northern</option>
              </select>
            </div>

            {/* Farmers Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-left text-sm text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Region</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {farmersLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chapfarm-600 mx-auto"></div>
                      </td>
                    </tr>
                  ) : filteredFarmers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No farmers found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredFarmers.map((farmer) => (
                      <tr key={farmer.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-gray-600">#{farmer.id}</td>
                        <td className="px-6 py-4 font-medium">{farmer.name}</td>
                        <td className="px-6 py-4">{farmer.phone}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800">
                            {farmer.region}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                              title="View Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Role Change Modal */}
        {showRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Change User Role</h3>
              <p className="text-sm text-gray-600 mb-4">
                Changing role for: <strong>{selectedUser.username}</strong> (ID: #{selectedUser.id})
              </p>
              
              <div className="mb-4">
                <label htmlFor="modal-role-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select New Role
                </label>
                <select
                  id="modal-role-select"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-chapfarm-500"
                >
                  <option value="admin">Admin</option>
                  <option value="farmer">Farmer</option>
                  <option value="transport_provider">Transport Provider</option>
                  <option value="agricultural_authority">Agricultural Authority</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                    setNewRole('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRoleChange}
                  disabled={managingUserId === selectedUser.id || newRole === selectedUser.role}
                  className="px-4 py-2 bg-chapfarm-600 text-white rounded-md hover:bg-chapfarm-700 disabled:opacity-50"
                >
                  {managingUserId === selectedUser.id ? 'Updating...' : 'Update Role'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllUsersPage;
