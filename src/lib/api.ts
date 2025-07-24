// API Configuration and Base Client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

import { logger } from './logger';

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  statusCode?: number;
  message?: string | string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthday: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthday: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Base API Client Class
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    logger.debug('API', `${response.status} ${response.url}`, {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    });

    // Get response text first to handle both success and error cases
    const responseText = await response.text();
    logger.debug('API', 'Raw response', responseText);

    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      logger.error('API', 'Failed to parse JSON response', { responseText, parseError });
      throw new Error('Server returned invalid response');
    }
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      // Handle specific error cases based on status code
      if (response.status === 409) {
        // Conflict - email already exists
        errorMessage = 'Esse email já está registrado.  Por favor tente fazer login.';
      } else if (response.status === 400) {
        // Validation error
        errorMessage = responseData?.message || 'Please check your input data';
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      }

      logger.error('API', 'Request failed', {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        details: responseData
      });
      
      throw new Error(errorMessage);
    }

    // Return parsed data for successful responses
    return responseData as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }
}

// Create singleton instance
export const apiClient = new ApiClient();
