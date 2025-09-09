import { useAuthStore } from '~~/stores/auth/authStore';
const API_BASE_URL = 'http://localhost:3001';

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CreateUserResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  id: string;
  email: string;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

// Custom error class for better error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiService {
  // Health check endpoint
  static async getHealth(): Promise<HealthResponse> {
    return await $fetch<HealthResponse>(`${API_BASE_URL}/health`);
  }

  // Welcome message endpoint
  static async getWelcome(): Promise<string> {
    return await $fetch<string>(`${API_BASE_URL}/`);
  }

  // User endpoints
  static async createUser(userData: CreateUserRequest) {
    try {
      return await $fetch<CreateUserResponse>(`${API_BASE_URL}/user`, {
        method: 'POST',
        body: userData,
      });
    } catch (error: any) {
      if (error.status === 409) {
        throw new ApiError(
          error.data?.message,
          409,
          'CONFLICT'
        );

      }
    }
  }

  static async signIn(data: SignInDto) {
    try {
      return await $fetch<SignInResponse>(`${API_BASE_URL}/auth`, {
      method: 'POST',
        body: data,
        credentials: 'include'
      });
    } catch (error: any) {
      if (error.status === 401) {
        throw new ApiError(error.data?.message, 401, 'UNAUTHORIZED');
      }
    }
  }

  static async getProfile(): Promise<UserProfile> {
    try {
      return await $fetch<UserProfile>(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        credentials: 'include',

      });
    } catch (error: any) {
      if (error.status === 401) {
        throw new ApiError('Unauthorized - Invalid or expired token', 401, 'UNAUTHORIZED');
      }
      throw new ApiError('Failed to fetch profile', error.status || 500);
    }
  }

  static async logout(): Promise<{ok: boolean}>{
    try{
      return await $fetch<{ok: boolean}>(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch( error: any ){
      throw new ApiError('Failed to logout', error.status || 500);
    }
  }

  static async refreshToken(): Promise<{ success: boolean }> {
    return await $fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  static async apiCall<T>(url: string, options: any = {}): Promise<T> {
    try {
      return await $fetch<T>(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: 'include',
      });
    } catch (error: any) {
      // Wenn 401 (Token abgelaufen), versuche Refresh
      if (error.status === 401) {
        try {
          await this.refreshToken();
          // Retry mit neuem Token
          return await $fetch<T>(url, {
            ...options,
            credentials: 'include',
          });
        } catch (refreshError) {
          // Refresh fehlgeschlagen, User ausloggen
          const authStore = useAuthStore();
          authStore.logout();
          throw refreshError;
        }
      }
      throw error;
    }
  }
}