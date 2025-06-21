export type UserRole = 
  | 'admin' 
  | 'transport_provider' 
  | 'agricultural_authority' 
  | 'farmer';

export interface UserCreate {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface UserRead {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenData {
  id?: number;
  username?: string;
  role?: UserRole;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  code: string;
  new_password: string;
}

// ----- Specific Roles -----

export interface FarmerCreate {
  name: string;
  phone: string;
  location: string;
  username: string;
  email: string;
  password: string;
}

export interface TransportProviderCreate {
  name: string;
  phone: string;
  vehicle_type: string;
  location: string;
  username: string;
  email: string;
  password: string;
}

export interface AgricultureAuthorityCreate {
  institution_name: string;
  name: string;
  phone: string;
  location: string;
  username: string;
  email: string;
  password: string;
}

export interface AdminCreate {
  username: string;
  email: string;
  password: string;
}

export interface SMSRequest {
  to: string;
  message: string;
  from_: string; // or maybe from: string, depending on how you use it in JS
}

export interface RegisterResponse {
  message: string;
  user_id: number;
  farmer_id?: number;
  authority_id?: number;
  transport_id?: number;
}

export interface DashboardSummary {
  registered_users: number;
  registered_farmers: number;
  registered_authorities: number;
  registered_transport_providers: number;
  total_reports: number;
  pending_reports: number;
  total_transport_requests: number;
  pending_transport_requests: number;
  total_weather_alerts: number;
  total_agriculture_alerts: number;
}

export interface RecentReport {
  id: number;
  farmer_name: string;
  issue_type: string;
  description: string;
  location: string;
  status: string;
  date: string;
  phone: string;
}

export interface RecentActivity {
  user: string;
  activity: string;
  date: string;
  timestamp: string;
}