const API_BASE_URL ='http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  USERS: `${API_BASE_URL}/auth/users`,
  
  // Admin endpoints
  ADMIN_REGISTER_FARMER: `${API_BASE_URL}/admin/farmers/register`,
  ADMIN_REGISTER_TRANSPORT: `${API_BASE_URL}/admin/transport/register`,
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
  
  // Weather endpoints
  WEATHER_CURRENT: `${API_BASE_URL}/weather/current`,
  WEATHER_FORECAST: `${API_BASE_URL}/weather/forecast`,
  WEATHER_ALERT: `${API_BASE_URL}/weather/alert`,
  
  // Farmer endpoints
  FARMERS: `${API_BASE_URL}/farmers`,
  FARMER_REPORTS: `${API_BASE_URL}/farmers/reports`,
};

export default API_BASE_URL;