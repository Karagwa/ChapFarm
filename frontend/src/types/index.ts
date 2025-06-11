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
  total_users: number;
  total_farmers: number;
  total_transport_providers: number;
  total_agriculture_authorities: number;
  total_transport_requests: number;
}
export interface TransportRequest {
  id: number;
  farmer_id: number;
  transport_provider_id: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
}