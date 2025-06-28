import { PageContainer } from "@/components/layout/page-container";
import { ServiceCard } from "@/components/services/service-card";
import { SERVICES } from "@/lib/data";

export default function ServicesPage() {
  return (
    <PageContainer activeNavItem="services">
      <h1 className="text-3xl font-bold mb-6">Serviços</h1>
      
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </PageContainer>
  );
}
