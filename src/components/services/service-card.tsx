"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  onClick?: () => void;
}

export function ServiceCard({ title, description, imageUrl, price, onClick }: ServiceCardProps) {
  return (
    <Card 
      className="group cursor-pointer hover:shadow-2xl transition-all duration-300 h-full bg-gray-900/50 border-gray-700 hover:border-gray-500 backdrop-blur-sm hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {price && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-black font-semibold px-3 py-1">
              R$ {price.toFixed(0)}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-white group-hover:text-gray-100 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="line-clamp-3 text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
          {description}
        </CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Ver detalhes →
          </span>
          {price && (
            <span className="text-lg font-bold text-white">
              R$ {price.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
