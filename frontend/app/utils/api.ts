import { useAuthStore } from '~~/stores/auth/authStore';
const API_BASE_URL = 'http://localhost:3001';

export interface HealthResponse {
  status: string;
  timestamp: string;
}
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
    // If 401 (Token expired), try refresh
    if (error.status === 401) {
        try {
        await this.refreshToken();
        // Retry with new Token
        return await $fetch<T>(`${API_BASE_URL}${url}`, {
            ...options,
            credentials: 'include',
        });
        } catch (refreshError) {
        // Refresh failed, log user out
        const authStore = useAuthStore();
        authStore.logout();
        throw refreshError;
        }
    }
    throw error;
    }
}
}