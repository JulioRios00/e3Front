"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER" | "LUTHIER";
  isActive: boolean;
  onClick?: () => void;
}

export function UserCard({
  name,
  email,
  phone,
  role,
  isActive,
  onClick,
}: UserCardProps) {
  return (
    <Card 
      className="mb-4 border-border hover:border-primary/50 transition-colors duration-300 bg-card cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-secondary-foreground">{email}</p>
            <p className="text-secondary-foreground">{phone}</p>
          </div>
          <div className="flex flex-col items-end">
            <Badge 
              className="bg-primary text-white mb-2"
            >
              {role}
            </Badge>
            <span className={isActive ? "text-foreground" : "text-secondary-foreground"}>
              {isActive ? "Ativo" : "Inativo"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface BirthdayCardProps {
  name: string;
  email: string;
  date?: string;
  age?: number;
}

export function BirthdayCard({ name, email, date, age }: BirthdayCardProps) {
  return (
    <Card className="mb-4 border-border bg-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-secondary-foreground text-sm">{email}</p>
          </div>
          <div className="flex items-center">
            <span className="text-primary text-2xl mr-2">🎂</span>
            <span>{date || `${age} anos`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Mock data for testing
export const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    role: "USER" as const,
    isActive: true,
    firstName: "João",
    lastName: "Silva",
    birthday: "1990-05-15",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    role: "ADMIN" as const,
    isActive: true,
    firstName: "Maria",
    lastName: "Santos",
    birthday: "1985-08-22",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    phone: "(11) 77777-7777",
    role: "LUTHIER" as const,
    isActive: false,
    firstName: "Pedro",
    lastName: "Oliveira",
    birthday: "1992-12-03",
    createdAt: "2024-01-20",
  },
];

export const mockBirthdays = [
  {
    name: "Ana Costa",
    email: "ana@email.com",
    date: "15/03",
    age: 28,
  },
  {
    name: "Carlos Lima",
    email: "carlos@email.com",
    date: "22/03",
    age: 35,
  },
];
