import { PageContainer } from "@/components/layout/page-container";
import { UserCard } from "@/components/admin/user-cards";
import { USERS, calculateAge } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, Calendar, User } from "lucide-react";

// This would typically come from your authentication system
// For now, I'm simulating getting the current user ID
function getCurrentUserId(): string {
  // TODO: Replace this with actual authentication logic
  // This could come from:
  // - NextAuth session
  // - JWT token
  // - Cookie
  // - Context/Redux store
  return "cmbfej9dy0003pa44nz187ssr"; // Simulating user ID 1 is logged in
}

export default function ProfilePage() {
  const currentUserId = getCurrentUserId();
  const currentUser = USERS.find(user => user.id === currentUserId);

  if (!currentUser) {
    return (
      <PageContainer>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-red-600">Usuário não encontrado</h1>
          <p className="text-secondary-foreground mt-2">
            Não foi possível carregar os dados do perfil.
          </p>
        </div>
      </PageContainer>
    );
  }

  const userAge = currentUser.birthday ? calculateAge(currentUser.birthday) : null;
  const formattedBirthday = currentUser.birthday 
    ? new Date(currentUser.birthday).toLocaleDateString('pt-BR')
    : 'Não informado';

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <Button className="bg-primary text-white">
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-secondary-foreground capitalize">
                {currentUser.role}
              </p>
              <div className="flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  currentUser.isActive ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-secondary-foreground">
                  {currentUser.isActive ? 'Ativo' : 'Inativo'}
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
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-secondary-foreground" />
              <div>
                <p className="text-sm text-secondary-foreground">Telefone</p>
                <p className="font-medium">{currentUser.phone}</p>
              </div>
            </div>

            {currentUser.birthday && (
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
                <span>{currentUser.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground">Tipo de Conta:</span>
                <span className="capitalize">{currentUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground">Status:</span>
                <span className={currentUser.isActive ? 'text-green-600' : 'text-red-600'}>
                  {currentUser.isActive ? 'Ativa' : 'Inativa'}
                </span>
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
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
