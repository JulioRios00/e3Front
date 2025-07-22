"use client";

import { useState, useEffect, useCallback } from "react";
import { adminService } from "@/services/admin.service";
import { User } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

export function useAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [todaysBirthdays, setTodaysBirthdays] = useState<User[]>([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const fetchAllUsers = useCallback(async () => {
    if (!isAdmin) {
      setError("Access denied: Admin role required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const usersData = await adminService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const fetchUserById = useCallback(
    async (id: string): Promise<User | null> => {
      if (!isAdmin) {
        setError("Access denied: Admin role required");
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userData = await adminService.getUserById(id);
        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch user"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [isAdmin]
  );

  const fetchTodaysBirthdays = useCallback(async () => {
    if (!isAdmin) {
      setError("Access denied: Admin role required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const birthdaysData = await adminService.getTodaysBirthdays();
      setTodaysBirthdays(birthdaysData);
    } catch (error) {
      console.error("Error fetching today's birthdays:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch birthdays"
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const fetchUpcomingBirthdays = useCallback(
    async (days: number = 7) => {
      if (!isAdmin) {
        setError("Access denied: Admin role required");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const birthdaysData = await adminService.getUpcomingBirthdays(days);
        setUpcomingBirthdays(birthdaysData);
      } catch (error) {
        console.error("Error fetching upcoming birthdays:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch upcoming birthdays"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isAdmin]
  );

  // Auto-fetch data when admin user is available
  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers();
      fetchTodaysBirthdays();
      fetchUpcomingBirthdays();
    }
  }, [isAdmin, fetchAllUsers, fetchTodaysBirthdays, fetchUpcomingBirthdays]);

  return {
    // Data
    users,
    todaysBirthdays,
    upcomingBirthdays,

    // State
    isLoading,
    error,
    isAdmin,

    // Actions
    fetchAllUsers,
    fetchUserById,
    fetchTodaysBirthdays,
    fetchUpcomingBirthdays,

    // Utils
    clearError: () => setError(null),
  };
}
