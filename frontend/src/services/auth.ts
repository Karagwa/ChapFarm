/// <reference types="vite/client" />
const API_BASE_URL = 'http://127.0.0.1:8000';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      // FastAPI expects form data for OAuth2PasswordRequestForm
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }

      return response.json();
    } catch (error) {
      console.error('Auth service login error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Registration failed');
      }

      return response.json();
    } catch (error) {
      console.error('Auth service register error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  },

  removeToken(): void {
    localStorage.removeItem('access_token');
  },

  getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  logout(): void {
    this.removeToken();
    localStorage.removeItem('rememberMe');
  },

  
  getUserFromToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
};