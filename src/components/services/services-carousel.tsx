"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ServiceCard } from "./service-card";
import { Service } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

interface ServicesCarouselProps {
  services: Service[];
}

export function ServicesCarousel({ services }: ServicesCarouselProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleServiceClick = (serviceId: string) => {
    if (user) {
      // User is authenticated, pass authenticated=true
      router.push(`/services/${serviceId}?authenticated=true`);
    } else {
      // User is not authenticated
      router.push(`/services/${serviceId}`);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {services.map((service) => (
            <CarouselItem 
              key={service.id} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  onClick={() => handleServiceClick(service.id)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
