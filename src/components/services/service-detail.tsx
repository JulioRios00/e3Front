"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Play } from "lucide-react";
import Link from "next/link";

interface ServiceDetailProps {
  title: string;
  description: string;
  benefits: string[];
  price: number;
  videoUrl: string;
}

export function ServiceDetail({
  title,
  description,
  benefits,
  price,
  videoUrl,
}: ServiceDetailProps) {
  // Add debugging
  console.log('ServiceDetail received props:', { title, description, benefits, price, videoUrl });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/services" className="text-primary mr-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold uppercase">{title}</h1>
      </div>

      <div className="relative">
        <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${videoUrl})` }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">DESCRIÇÃO</h2>
        <p className="text-secondary-foreground">{description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">BENEFÍCIOS</h2>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-secondary-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          R$ {price.toFixed(2).replace(".", ",")}
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          AGENDAR SERVIÇO
        </Button>
      </div>
    </div>
  );
}
