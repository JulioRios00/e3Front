"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserDetailProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string; // Should be ISO string, not Date object
  role: "ADMIN" | "USER" | "LUTHIER";
  isActive: boolean;
  createdAt: string; // Should be ISO string, not Date object
  onEdit?: () => void;
  onToggleActive?: () => void;
}

export function UserDetail({
  id,
  email,
  firstName,
  lastName,
  phone,
  birthday,
  role,
  isActive,
  createdAt,
  onEdit,
  onToggleActive,
}: UserDetailProps) {
  // Serialize all props to ensure they're plain values
  const serializedProps = {
    id: String(id || ''),
    email: String(email || ''),
    firstName: String(firstName || ''),
    lastName: String(lastName || ''),
    phone: String(phone || ''),
    birthday: String(birthday || ''),
    role: role as "ADMIN" | "USER" | "LUTHIER",
    isActive: Boolean(isActive),
    createdAt: String(createdAt || ''),
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-secondary-foreground">ID</p>
          <p className="font-medium">{serializedProps.id}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Email</p>
          <p className="font-medium">{serializedProps.email}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Nome</p>
          <p className="font-medium">{serializedProps.firstName}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Sobrenome</p>
          <p className="font-medium">{serializedProps.lastName}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Telefone</p>
          <p className="font-medium">{serializedProps.phone}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Data de nascimento</p>
          <p className="font-medium">{formatDate(serializedProps.birthday)}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Função</p>
          <Badge className="bg-primary text-white mt-1">{serializedProps.role}</Badge>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Status</p>
          <p className="font-medium">{serializedProps.isActive ? "Ativo" : "Inativo"}</p>
        </div>
        
        <div>
          <p className="text-secondary-foreground">Data de criação</p>
          <p className="font-medium">{formatDate(serializedProps.createdAt)}</p>
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button 
          className="flex-1 bg-primary hover:bg-primary/90 text-white"
          onClick={onEdit}
        >
          Editar
        </Button>
        <Button 
          className="flex-1 bg-secondary hover:bg-secondary/90 text-foreground"
          onClick={onToggleActive}
        >
          {serializedProps.isActive ? "Desativar" : "Ativar"}
        </Button>
      </div>
    </div>
  );
}
