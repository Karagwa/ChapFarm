import axios from 'axios';
import API_BASE_URL from '../config/api_config';
import { authService } from './auth';
import { AuthoritySummary, FarmerReport } from '../types/index'; // Adjust the import path as necessary


export const authorityService = {
  getReportSummary: async (): Promise<AuthoritySummary> => {
    try {
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/agric_auth/reports/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching report summary:', error);
      throw error;
    }
  },

  getAlertCount: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/agric_auth/alerts/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching alert count:', error);
      throw error;
    }
  },

  getReports: async (): Promise<FarmerReport[]> => {
    try {
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/agric_auth/Reports`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  resolveReport: async (reportId: number) => {
    try {
      const token = authService.getToken();
      const response = await axios.patch(
        `${API_BASE_URL}/agric_auth/reports/${reportId}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error resolving report:', error);
      throw error;
    }
  },
};