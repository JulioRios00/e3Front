"use client";

import { PageContainer } from "@/components/layout/page-container";
import { UserCard, BirthdayCard } from "@/components/admin/user-cards";
import { useAdmin } from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { Plus, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function AdminPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { 
    users, 
    todaysBirthdays, 
    upcomingBirthdays, 
    isLoading, 
    error, 
    isAdmin,
    fetchAllUsers,
    clearError 
  } = useAdmin();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    
    if (!authLoading && isAuthenticated && !isAdmin) {
      window.location.href = "/";
      return;
    }
  }, [isAuthenticated, isAdmin, authLoading]);

  // Show loading while checking auth
  if (authLoading || (!isAuthenticated || !isAdmin)) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </PageContainer>
    );
  }

  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Administração</h1>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="bg-secondary"
              onClick={fetchAllUsers}
              disabled={isLoading}
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button size="icon" className="bg-primary text-white">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-md text-sm mb-4 flex justify-between items-center">
            {error}
            <Button onClick={clearError} variant="ghost" size="sm">
              ✕
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Carregando dados...</span>
          </div>
        )}

        {/* Users Section */}
        <h2 className="text-xl text-secondary-foreground mb-4">
          Usuários Cadastrados ({users.length})
        </h2>
        
        <div className="space-y-4 mb-8">
          {users.map((user) => (
            <Link href={`/admin/users/${user.id}`} key={user.id}>
              <UserCard
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                phone={user.phone || "Não informado"}
                role={user.role}
                isActive={user.isActive}
              />
            </Link>
          ))}
          
          {!isLoading && users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum usuário encontrado
            </div>
          )}
        </div>

        {/* Birthdays Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Aniversariantes</h2>
          
          {todaysBirthdays.length > 0 && (
            <>
              <h3 className="text-xl text-primary font-semibold mb-2">HOJE</h3>
              <div className="space-y-4 mb-6">
                {todaysBirthdays.map((user) => (
                  <BirthdayCard
                    key={user.id}
                    name={`${user.firstName} ${user.lastName}`}
                    email={user.email}
                    age={calculateAge(user.birthday)}
                  />
                ))}
              </div>
            </>
          )}
          
          {upcomingBirthdays.length > 0 && (
            <>
              <h3 className="text-xl text-primary font-semibold mb-2">PRÓXIMOS DIAS</h3>
              <div className="space-y-4">
                {upcomingBirthdays.map((user) => {
                  const birthday = new Date(user.birthday);
                  const formattedDate = `${birthday.getDate()} ${birthday.toLocaleString('pt-BR', { month: 'short' })}`;
                  
                  return (
                    <BirthdayCard
                      key={user.id}
                      name={`${user.firstName} ${user.lastName}`}
                      email={user.email}
                      date={formattedDate}
                    />
                  );
                })}
              </div>
            </>
          )}
          
          {todaysBirthdays.length === 0 && upcomingBirthdays.length === 0 && (
            <p className="text-secondary-foreground">Não há aniversariantes hoje ou nos próximos dias.</p>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
