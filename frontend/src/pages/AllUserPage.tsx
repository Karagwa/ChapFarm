import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, RefreshCw, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/layouts/AdminLayout';
import { adminService, User } from '../services/adminService';

const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [managingUserId, setManagingUserId] = useState<number | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
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

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return;

    try {
      setManagingUserId(selectedUser.id);
      await adminService.changeUserRole(selectedUser.id, newRole);
      
      // Update local state
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
    if (!confirm(`Are you sure you want to permanently delete user "${user.username}"? This action cannot be undone.`)) return;

    try {
      setManagingUserId(user.id);
      await adminService.deleteUser(user.id);
      
      // Remove from local state
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

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-sm text-gray-500">
              Manage all registered users across the platform ({users.length} total users)
            </p>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-chapfarm-600 text-white rounded-lg hover:bg-chapfarm-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-chapfarm-500"
            />
          </div>
          
          <div className="flex gap-2">
            <label htmlFor="role-filter" className="sr-only">
              Filter by role
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
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRoleColor(user.role)}`}>
                        {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4">{formatDate(user.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openRoleModal(user)}
                          disabled={managingUserId === user.id}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded disabled:opacity-50"
                          title="Change Role"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        {/* Only show delete button for non-admin users */}
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            disabled={managingUserId === user.id}
                            className="p-1 text-red-600 hover:bg-red-100 rounded disabled:opacity-50"
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

        {/* Role Change Modal */}
        {showRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Change User Role</h3>
              <p className="text-sm text-gray-600 mb-4">
                Changing role for: <strong>{selectedUser.username}</strong>
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
