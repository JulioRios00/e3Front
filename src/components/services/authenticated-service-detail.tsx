"use client";

import { ChevronLeft, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface AuthenticatedServiceDetailProps {
  title: string;
  description: string;
  benefits: string[];
  price: number;
  videoUrl: string;
}

export function AuthenticatedServiceDetail({
  title,
  description,
  benefits,
  price,
  videoUrl,
}: AuthenticatedServiceDetailProps) {
  const { user } = useAuth();
  
  const handleScheduleClick = () => {
    const phoneNumber = "5511934096737"; // WhatsApp phone number with country code
    const userName = user ? `${user.firstName} ${user.lastName}` : "Cliente";
    const serviceName = title;
    
    // Create WhatsApp message with user name and service
    const message = `Olá! Eu sou ${userName} e gostaria de agendar o serviço: ${serviceName}. Poderia me ajudar com o agendamento?`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/services" className="text-white hover:text-gray-300 mr-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold uppercase">{title}</h1>
      </div>

      <div className="relative">
        <div className="aspect-video bg-gray-800 relative overflow-hidden rounded-lg">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${videoUrl})` }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Play className="w-8 h-8 text-black ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-white">DESCRIÇÃO</h2>
        <p className="text-gray-300">{description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-white">BENEFÍCIOS</h2>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span className="text-gray-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          R$ {price.toFixed(2).replace(".", ",")}
        </div>
        <Button 
          onClick={handleScheduleClick}
          className="bg-white text-black hover:bg-gray-200 px-6 py-3 text-lg font-semibold"
        >
          AGENDAR SERVIÇO
        </Button>
      </div>
    </div>
  );
}
