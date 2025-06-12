import axios from 'axios';
import API_BASE_URL  from '../config/api_config';
import { authService } from './auth';

import { FarmerCreate, AgricultureAuthorityCreate, TransportProviderCreate } from '../types/index';


export const adminService = {
  registerFarmer: async (data: FarmerCreate) => {
    const res = await axios.post(`${API_BASE_URL}/admin/farmers/register`, data);
    return res.data;
  },

  registerAuthority: async (data) => {
    const token = authService.getToken();
    return await axios.post(
        `${API_BASE_URL}/admin/authority/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 Send the token here
        },
      }
    );
  },
  registerAdmin: async (data) => {
    const token = authService.getToken();
    return await axios.post(
      `${API_BASE_URL}/admin/admins/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 Send the token here
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
            Authorization: `Bearer ${token}`, // 🔐 Send the token here
            },
        }
        );
    },

  getDashboardSummary: async () => {
    const res = await axios.get(`${API_BASE_URL}/admin/dashboard/summary`);
    return res.data;
  },

  listFarmers: async () => {
    const res = await axios.get(`${API_BASE_URL}/admin/farmers`);
    return res.data;
  },

  listTransportProviders: async () => {
    const res = await axios.get(`${API_BASE_URL}/admin/transport-providers`);
    return res.data;
  },

  listAuthorities: async () => {
    const res = await axios.get(`${API_BASE_URL}/admin/agriculture-authorities`);
    return res.data;
  },
};
