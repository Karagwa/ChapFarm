import axios from 'axios';
import API_BASE_URL from '../config/api_config';
import { authService } from './auth';
import { FarmerCreate, AgricultureAuthorityCreate, TransportProviderCreate } from '../types/index';

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  created_at: string;
  updated_at?: string;
}

export interface UserManagement {
  changeUserRole: (userId: number, newRole: string) => Promise<any>;
  deleteUser: (userId: number) => Promise<any>;
  getAllUsers: () => Promise<User[]>;
}

export const adminService = {
  registerFarmer: async (data: FarmerCreate) => {
    const token = authService.getToken();
    const res = await axios.post(
      `${API_BASE_URL}/admin/farmers/register`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  registerAuthority: async (data: AgricultureAuthorityCreate) => {
    const token = authService.getToken();
    return await axios.post(
      `${API_BASE_URL}/admin/authority/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  registerAdmin: async (data: any) => {
    const token = authService.getToken();
    return await axios.post(
      `${API_BASE_URL}/admin/admins/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  registerTransportProvider: async (data: TransportProviderCreate) => {
    const token = authService.getToken();
    return await axios.post(
      `${API_BASE_URL}/admin/transport/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getDashboardSummary: async () => {
    const token = authService.getToken();
    return await axios.get(
      `${API_BASE_URL}/admin/dashboard/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(res => res.data);
  },

  // User Management Functions
  getAllUsers: async (): Promise<User[]> => {
    const token = authService.getToken();
    const response = await axios.get(
      `${API_BASE_URL}/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  changeUserRole: async (userId: number, newRole: string) => {
    const token = authService.getToken();
    const response = await axios.patch(
      `${API_BASE_URL}/admin/users/${userId}/role`,
      { new_role: newRole },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  deleteUser: async (userId: number) => {
    const token = authService.getToken();
    const response = await axios.delete(
      `${API_BASE_URL}/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  listFarmers: async () => {
    const token = authService.getToken();
    const res = await axios.get(
      `${API_BASE_URL}/admin/farmers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  listTransportProviders: async () => {
    const token = authService.getToken();
    const res = await axios.get(
      `${API_BASE_URL}/admin/transport-providers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  listAuthorities: async () => {
    const token = authService.getToken();
    const res = await axios.get(
      `${API_BASE_URL}/admin/agriculture-authorities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  getRecentReports: async () => {
    const token = authService.getToken();
    const response = await axios.get(
      `${API_BASE_URL}/admin/recent-reports`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getRecentActivity: async () => {
    const token = authService.getToken();
    const response = await axios.get(
      `${API_BASE_URL}/admin/recent-activity`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
