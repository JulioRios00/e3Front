import { PageContainer } from "@/components/layout/page-container";
import { ServicesCarousel } from "@/components/services/services-carousel";
import { SERVICES } from "@/lib/data";

export default function ServicesPage() {
  return (
    <PageContainer activeNavItem="services">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center">Serviços</h1>
        
        <ServicesCarousel services={SERVICES} />
      </div>
    </PageContainer>
  );
}
