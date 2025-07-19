"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/data";
import Image from "next/image";
import { Check} from "lucide-react";

interface ServiceDialogProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceDialog({ service, open, onOpenChange }: ServiceDialogProps) {
  if (!service) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleScheduleService = () => {
    // Here you can implement the scheduling logic
    console.log('Scheduling service:', service.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                {service.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-lg font-semibold">
                  {formatPrice(service.price)}
                </Badge>
              </div>
            </div>

          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Service Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Descrição do Serviço</h3>
            <DialogDescription className="text-base leading-relaxed">
              {service.description}
            </DialogDescription>
          </div>

          {/* Service Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Benefícios</h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Section (if available) */}
          {service.videoUrl && service.videoUrl !== service.imageUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Demonstração</h3>
              <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                {/* You can replace this with actual video component */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Vídeo demonstrativo disponível</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={handleScheduleService}
              className="flex-1"
              size="lg"
            >
              Agendar Serviço
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
              size="lg"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}