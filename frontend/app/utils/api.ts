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
}