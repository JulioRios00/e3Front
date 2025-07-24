import { apiClient, LoginRequest, LoginResponse, RegisterRequest, User } from '@/lib/api';
import { logger } from '@/lib/logger';

export class AuthService {
  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      logger.info('AUTH', 'Starting registration', { email: userData.email });
      logger.debug('AUTH', 'Registration data', userData);
      
      const response = await apiClient.post<LoginResponse>('/auth/register', userData);
      
      // Store token on successful registration
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        logger.info('AUTH', 'Registration successful', { email: userData.email, userId: response.user.id });
      }
      
      return response;
    } catch (error) {
      logger.error('AUTH', 'Registration failed', { email: userData.email, error });
      
      // Handle network errors specifically
      if (error instanceof Error && error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      // Re-throw API errors with original message
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      logger.info('AUTH', 'Starting login', { email: credentials.email });
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Store token and user data on successful login
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        logger.info('AUTH', 'Login successful', { email: credentials.email, userId: response.user.id });
      }
      
      return response;
    } catch (error) {
      logger.error('AUTH', 'Login failed', { email: credentials.email, error });
      
      // Handle network errors specifically
      if (error instanceof Error && error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      // Re-throw API errors with original message
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    try {
      return await apiClient.get<User>('/auth/profile');
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Get stored user data
   */
  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  /**
   * Verify token validity by checking profile
   */
  async verifyToken(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch {
      // Token is invalid, clear storage
      this.logout();
      return false;
    }
  }
}

// Create singleton instance
export const authService = new AuthService();
