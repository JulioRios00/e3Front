export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  role: "ADMIN" | "USER" | "LUTHIER";
  isActive: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  price: number;
  imageUrl: string;
  videoUrl: string;
}

// Mock data for services
export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Regulagem de Trastes",
    description: "Nivelamento e polimento dos trastes para melhorar a tocabilidade do instrumento. Este processo é essencial para eliminar ruídos e melhorar a ação das cordas.",
    benefits: [
      "Melhora a tocabilidade",
      "Som mais limpo",
      "Maior durabilidade"
    ],
    price: 180.00,
    imageUrl: "/images/service-frets.jpg",
    videoUrl: "/images/service-frets.jpg"
  },
  {
    id: "2",
    title: "Troca de Cordas",
    description: "Substituição completa das cordas do instrumento, incluindo limpeza do braço e regulagem básica para garantir a melhor performance.",
    benefits: [
      "Som mais brilhante",
      "Melhor afinação",
      "Maior conforto ao tocar"
    ],
    price: 80.00,
    imageUrl: "/images/service-strings.jpg",
    videoUrl: "/images/service-strings.jpg"
  },
  {
    id: "3",
    title: "Ajuste de Ponte",
    description: "Otimização da ponte do instrumento para melhorar a entonação, altura das cordas e estabilidade da afinação.",
    benefits: [
      "Afinação mais precisa",
      "Melhor sustentação das notas",
      "Redução de zumbidos"
    ],
    price: 150.00,
    imageUrl: "/images/service-bridge.jpg",
    videoUrl: "/images/service-bridge.jpg"
  },
  {
    id: "4",
    title: "Setup Completo",
    description: "Serviço completo de manutenção incluindo regulagem de trastes, ajuste de ponte, troca de cordas e calibragem geral do instrumento.",
    benefits: [
      "Instrumento totalmente calibrado",
      "Máxima performance",
      "Garantia de 3 meses"
    ],
    price: 350.00,
    imageUrl: "/images/service-frets.jpg",
    videoUrl: "/images/service-frets.jpg"
  },
  {
    id: "5",
    title: "Limpeza e Hidratação",
    description: "Limpeza profunda do instrumento com produtos especializados e hidratação do braço para manter a madeira em perfeito estado.",
    benefits: [
      "Madeira protegida",
      "Aparência renovada",
      "Prevenção de rachaduras"
    ],
    price: 120.00,
    imageUrl: "/images/service-strings.jpg",
    videoUrl: "/images/service-strings.jpg"
  },
  {
    id: "6",
    title: "Reparo de Eletrônica",
    description: "Manutenção e reparo de sistemas eletrônicos, captadores, potenciômetros e jacks para instrumentos elétricos e semi-acústicos.",
    benefits: [
      "Som sem ruídos",
      "Captação otimizada",
      "Eletrônica funcionando perfeitamente"
    ],
    price: 200.00,
    imageUrl: "/images/service-bridge.jpg",
    videoUrl: "/images/service-bridge.jpg"
  },
];

// Mock data for users
export const USERS: User[] = [
  {
    id: "cmbfej9dy0003pa44nz187ssr",
    email: "carlos@example.com",
    firstName: "Carlos",
    lastName: "Oliveira",
    phone: "+5511987654321",
    birthday: "1985-03-15T00:00:00.000Z",
    role: "ADMIN",
    isActive: true,
    createdAt: "2024-01-10T18:07:01.702Z"
  },
  {
    id: "cmbfej9dy0004pa44nz187sst",
    email: "mariana@example.com",
    firstName: "Mariana",
    lastName: "Santos",
    phone: "+5521978543210",
    birthday: "1990-06-22T00:00:00.000Z",
    role: "LUTHIER",
    isActive: true,
    createdAt: "2024-02-15T14:30:22.456Z"
  },
  {
    id: "cmbfej9dy0005pa44nz187ssu",
    email: "paulo@example.com",
    firstName: "Paulo",
    lastName: "Almeida",
    phone: "+5531763432109",
    birthday: "1988-11-05T00:00:00.000Z",
    role: "LUTHIER",
    isActive: true,
    createdAt: "2024-03-20T09:15:45.789Z"
  },
  {
    id: "cmbfej9dy0006pa44nz187ssv",
    email: "ana@example.com",
    firstName: "Ana",
    lastName: "Pereira",
    phone: "+5541654321098",
    birthday: "1992-04-18T00:00:00.000Z",
    role: "ADMIN",
    isActive: false,
    createdAt: "2024-01-25T16:40:33.123Z"
  }
];

// Function to get today's birthdays
export function getTodayBirthdays(): User[] {
  const today = new Date();
  return USERS.filter(user => {
    const birthday = new Date(user.birthday);
    return birthday.getDate() === today.getDate() && 
           birthday.getMonth() === today.getMonth();
  });
}

// Function to get this week's birthdays (excluding today)
export function getWeekBirthdays(): User[] {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  return USERS.filter(user => {
    const birthday = new Date(user.birthday);
    const birthdayThisYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    // Skip today's birthdays
    if (birthdayThisYear.getDate() === today.getDate() && 
        birthdayThisYear.getMonth() === today.getMonth()) {
      return false;
    }
    
    return birthdayThisYear >= today && birthdayThisYear <= nextWeek;
  });
}

// Function to calculate age
export function calculateAge(birthdate: string): number {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

