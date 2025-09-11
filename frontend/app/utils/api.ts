import { useAuthStore } from '~~/stores/auth/authStore';
import { useRequestHeaders } from '#app'
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


}