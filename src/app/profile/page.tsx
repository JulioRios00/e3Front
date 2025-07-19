"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, Calendar, User, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, refreshProfile, logout } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading]);

  // Show loading while checking authentication or fetching user data
  if (isLoading || !isAuthenticated) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Carregando perfil...</span>
        </div>
      </PageContainer>
    );
  }

  // Show error if user data is not available
  if (!user) {
    return (
      <PageContainer>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-red-600">Usuário não encontrado</h1>
          <p className="text-secondary-foreground mt-2">
            Não foi possível carregar os dados do perfil.
          </p>
          <Button 
            onClick={refreshProfile}
            className="mt-4"
          >
            Tentar Novamente
          </Button>
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

  const userAge = user.birthday ? calculateAge(user.birthday) : null;
  const formattedBirthday = user.birthday 
    ? new Date(user.birthday).toLocaleDateString('pt-BR')
    : 'Não informado';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
            <Button className="bg-primary text-white">
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-secondary-foreground capitalize">
                {user.role}
              </p>
              <div className="flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  user.isActive ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-secondary-foreground">
                  {user.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-secondary-foreground" />
              <div>
                <p className="text-sm text-secondary-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-secondary-foreground" />
              <div>
                <p className="text-sm text-secondary-foreground">Telefone</p>
                <p className="font-medium">{user.phone || 'Não informado'}</p>
              </div>
            </div>

            {user.birthday && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-secondary-foreground" />
                <div>
                  <p className="text-sm text-secondary-foreground">Data de Nascimento</p>
                  <p className="font-medium">
                    {formattedBirthday}
                    {userAge && (
                      <span className="text-secondary-foreground ml-2">
                        ({userAge} anos)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Profile Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Informações da Conta</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-foreground">ID do Usuário:</span>
                <span className="font-mono text-xs">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground">Tipo de Conta:</span>
                <span className="capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground">Status:</span>
                <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
                  {user.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground">Criado em:</span>
                <span className="text-xs">{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground">Atualizado em:</span>
                <span className="text-xs">{formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Configurações</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Alterar Senha
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Configurações de Notificação
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Privacidade
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={refreshProfile}
              >
                Atualizar Perfil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
