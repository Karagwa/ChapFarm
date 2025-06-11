import axios from 'axios';
import API_BASE_URL  from '../config/api_config';

import { FarmerCreate, AgricultureAuthorityCreate, TransportProviderCreate } from '../types/index';


export const adminService = {
  registerFarmer: async (data: FarmerCreate) => {
    const res = await axios.post(`${API_BASE_URL}/admin/farmers/register`, data);
    return res.data;
  },

  registerAuthority: async (data: AgricultureAuthorityCreate) => {
    const res = await axios.post(`${API_BASE_URL}/admin/authority/register`, data);
    return res.data;
  },

  registerTransport: async (data: TransportProviderCreate) => {
    const res = await axios.post(`${API_BASE_URL}/admin/transport/register`, data);
    return res.data;
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
