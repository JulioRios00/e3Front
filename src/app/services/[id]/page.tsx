import { PageContainer } from "@/components/layout/page-container";
// import { ServiceDetail } from "@/components/services/service-detail";
import { SERVICES } from "@/lib/data";
import { notFound } from "next/navigation";

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <PageContainer activeNavItem="services">
      <div>
        <h1>Debug: {service.title}</h1>
        <p>ID: {service.id}</p>
        <p>Price: {service.price}</p>
      </div>
      {/* Temporarily comment out ServiceDetail */}
      {/* <ServiceDetail
        title={service.title}
        description={service.description}
        benefits={service.benefits}
        price={service.price}
        videoUrl={service.videoUrl}
      /> */}
    </PageContainer>
  );
}
