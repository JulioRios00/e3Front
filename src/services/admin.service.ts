import { apiClient, User } from '@/lib/api';

export class AdminService {
  /**
   * Get all users (Admin only)
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await apiClient.get<User[]>('/admin/users');
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  }

  /**
   * Get user by ID (Admin only)
   */
  async getUserById(id: string): Promise<User> {
    try {
      return await apiClient.get<User>(`/admin/users/${id}`);
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }

  /**
   * Get today's birthdays (Admin only)
   */
  async getTodaysBirthdays(): Promise<User[]> {
    try {
      return await apiClient.get<User[]>('/admin/birthdays/today');
    } catch (error) {
      console.error('Get today\'s birthdays error:', error);
      throw error;
    }
  }

  /**
   * Get upcoming birthdays (Admin only)
   * @param days - Number of days to look ahead (default: 7)
   */
  async getUpcomingBirthdays(days: number = 7): Promise<User[]> {
    try {
      return await apiClient.get<User[]>(`/admin/birthdays/upcoming?days=${days}`);
    } catch (error) {
      console.error('Get upcoming birthdays error:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const adminService = new AdminService();
