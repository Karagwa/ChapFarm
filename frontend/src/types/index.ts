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

// class TransportRequest(SQLModel, table=True):
//     id: Optional[int] = Field(default=None, primary_key=True)
//     farmer_id: int = Field(foreign_key="farmer.id")
//     transport_type: Optional[str] = None  # Example: "Truck", "Van", "Bicycle"
//     pickup_location: Optional[str] = None
//     dropoff_location: Optional[str] = None
//     status: str  # Example: "Pending", "Completed", "Cancelled"
//     timestamp: datetime = Field(default_factory=datetime.utcnow)

//     farmer: Optional[Farmer] = Relationship(back_populates="transport_requests")

export interface TransportRequest {
  id: number;
  farmer_id: number;
  transport_type: string; // e.g., "Truck", "Van", "Bicycle"
  pickup_location: string;
  dropoff_location: string;
  status: string; // e.g., "Pending", "Completed", "Cancelled"
  timestamp: string; // ISO date string
}

export interface TransportRequestDetailed {
  id: number;
  farmer_id: number;
  farmer_name: string;
  farmer_phone: string;
  farmer_location: string;
  transport_type: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  status: string;
  timestamp: string;
}



export interface TransportSummary {
  total_requests: number;
  active_requests: number;
  completed_requests: number;
  pending_requests: number;
  accepted_requests: number;
  in_transit_requests: number;
  rejected_requests: number;
  cancelled_requests: number;
  recent_requests: number;
  today_requests: number;
  status_breakdown: {
    Pending: number;
    Accepted: number;
    "In Transit": number;
    Completed: number;
    Rejected: number;
    Cancelled: number;
  };
}

export interface AuthoritySummary {
  total_reports: number;
  pending_reports: number;
  resolved_reports: number;
  in_progress_reports: number;
  total_alerts: number;
}

export interface FarmerReport {
  id: number;
  farmer_id: number;
  farmer_name?: string;
  farmer_phone?: string;
  issue_type: string;
  description?: string;
  location?: string;
  status: string;
  timestamp: string;
}