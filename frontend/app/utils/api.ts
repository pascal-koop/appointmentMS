// Replace axios with Nuxt's $fetch
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
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
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
  static async createUser(userData: CreateUserRequest): Promise<CreateUserResponse> {
    return await $fetch<CreateUserResponse>(`${API_BASE_URL}/user`, {
      method: 'POST',
      body: userData,
    });
  }
}