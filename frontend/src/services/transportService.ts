import axios from 'axios';
import API_BASE_URL from '../config/api_config';
import { authService } from './auth';
import { TransportRequestDetailed } from '../types/index'; // Changed from TransportRequest

export const transportService = {
  getTransportRequests: async (): Promise<TransportRequestDetailed[]> => {
    try {
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/transport/transport_requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching transport requests:', error);
      throw error;
    }
  },

  getTransportHistory: async (): Promise<TransportRequestDetailed[]> => {
    try {
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/transport/transport_requests/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching transport history:', error);
      throw error;
    }
  },

  updateTransportRequestStatus: async (requestId: number, status: string): Promise<any> => {
    try {
      const token = authService.getToken();
      const response = await axios.patch(
        `${API_BASE_URL}/transport/transport_requests/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating transport request status:', error);
      throw error;
    }
  },

  getTransportSummary: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/transport/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching transport summary:', error);
      throw error;
    }
  },
};
