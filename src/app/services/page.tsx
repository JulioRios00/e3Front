import { PageContainer } from "@/components/layout/page-container";
import { ServiceCard } from "@/components/services/service-card";
import { SERVICES } from "@/lib/data";

export default function ServicesPage() {
  return (
    <PageContainer activeNavItem="services">
      <h1 className="text-3xl font-bold mb-6">Serviços</h1>
      
      <div className="space-y-4">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
          />
        ))}
      </div>
    </PageContainer>
  );
}

