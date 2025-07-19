import { ServiceDetail } from "@/components/services/service-detail";
import { AuthenticatedServiceDetail } from "@/components/services/authenticated-service-detail";
import { SERVICES } from "@/lib/data";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ authenticated?: string }>;
}

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const { id } = await params;
  const { authenticated } = await searchParams;
  const service = SERVICES.find((s) => s.id === id);
  const isAuthenticated = authenticated === 'true';

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        {isAuthenticated ? (
          <AuthenticatedServiceDetail
            title={service.title}
            description={service.description}
            benefits={service.benefits}
            price={service.price}
            videoUrl={service.videoUrl}
          />
        ) : (
          <ServiceDetail
            title={service.title}
            description={service.description}
            benefits={service.benefits}
            price={service.price}
            videoUrl={service.videoUrl}
          />
        )}
      </div>
    </div>
  );
}
