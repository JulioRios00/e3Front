"use client";

import { PageContainer } from "@/components/layout/page-container";
import { ServiceCard } from "@/components/services/service-card";
import { SERVICES } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
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
    <PageContainer activeNavItem="services">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Nossos Serviços</h1>
          <p className="text-gray-400 mt-2">
            Conheça todos os nossos serviços especializados em luthieria.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              price={service.price}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
