/**
 * Test utilities for API debugging
 */

import { logger } from '@/lib/logger';

const API_BASE_URL = 'https://e3-api-d64fcc5bd009.herokuapp.com';

export class ApiTestService {
  /**
   * Test API health
   */
  static async testHealth(): Promise<{ success: boolean; message: string; data?: unknown }> {
    try {
      logger.info('API_TEST', 'Testing API health...');
      
      const response = await fetch(`${API_BASE_URL}/test/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const responseText = await response.text();
      logger.debug('API_TEST', 'Health check raw response', responseText);

      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        logger.error('API_TEST', 'Failed to parse health check response', { responseText, parseError });
        return { 
          success: false, 
          message: 'API returned invalid response format' 
        };
      }

      if (response.ok) {
        logger.info('API_TEST', 'API health check successful', responseData);
        return {
          success: true,
          message: 'API is healthy and responding',
          data: responseData
        };
      } else {
        logger.error('API_TEST', 'API health check failed', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        return {
          success: false,
          message: `API health check failed: ${response.status} ${response.statusText}`,
          data: responseData
        };
      }
    } catch (error) {
      logger.error('API_TEST', 'Network error during health check', error);
      
      if (error instanceof Error && error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Network error: Cannot reach the API server. Please check your internet connection.'
        };
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error during health check'
      };
    }
  }

  /**
   * Test registration with sample data
   */
  static async testRegistration(testEmail?: string): Promise<{ success: boolean; message: string; data?: unknown }> {
    const email = testEmail || `test.${Date.now()}@example.com`;
    const testData = {
      email,
      password: "123123",
      firstName: "Test",
      lastName: "User",
      birthday: "1990-01-10"
    };

    try {
      logger.info('API_TEST', 'Testing registration with data', { email: testData.email });
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const responseText = await response.text();
      logger.debug('API_TEST', 'Registration test raw response', responseText);

      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        logger.error('API_TEST', 'Failed to parse registration response', { responseText, parseError });
        return { 
          success: false, 
          message: 'API returned invalid response format' 
        };
      }

      if (response.status === 201) {
        logger.info('API_TEST', 'Registration test successful', { email: testData.email });
        return {
          success: true,
          message: 'Registration test successful',
          data: responseData
        };
      } else if (response.status === 409) {
        logger.info('API_TEST', 'Registration test - email already exists (expected)', { email: testData.email });
        return {
          success: true,
          message: 'Email already exists error handled correctly',
          data: responseData
        };
      } else {
        logger.error('API_TEST', 'Registration test failed', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        return {
          success: false,
          message: `Registration failed: ${responseData?.message || response.statusText}`,
          data: responseData
        };
      }
    } catch (error) {
      logger.error('API_TEST', 'Network error during registration test', error);
      
      if (error instanceof Error && error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Network error: Cannot reach the API server during registration test.'
        };
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error during registration test'
      };
    }
  }
}

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as unknown as { ApiTestService: typeof ApiTestService }).ApiTestService = ApiTestService;
}
