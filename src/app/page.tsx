"use client";

import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { ScrollSections } from "@/components/ui/scroll-sections";
import { SERVICES } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleContactClick = () => {
    // Navigate directly to services page
    router.push("/services");
  };

  const handleServiceClick = (serviceId: string) => {
    if (user) {
      // User is authenticated, pass authenticated=true
      router.push(`/services/${serviceId}?authenticated=true`);
    } else {
      // User is not authenticated
      router.push(`/services/${serviceId}`);
    }
  };

  const heroSection = (
    <section className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          E3 Audio
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 mb-8 font-medium">
          Estamos no mercado sempre em busca do melhor atendimento, de prestar o melhor serviço de manutenção para seus equipamentos e instrumentos musicais.
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Serviços especializados em luthieria.
          Oferecemos desde regulagens básicas até restaurações completas com qualidade profissional.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={handleContactClick}
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Entre em Contato
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => {
              // This will be handled by the scroll component
              const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
              window.dispatchEvent(event);
            }}
          >
            Ver Serviços
          </Button>
        </div>
      </div>
    </section>
  );

  const servicesSection = (
    <section className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="services-section-content">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Nossos Serviços
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
              Oferecemos uma gama completa de serviços especializados para manter seus instrumentos em perfeitas condições
            </p>
          </div>
          
          {/* Services Grid - Optimized for better fit */}
          <div className="services-grid max-w-6xl mx-auto px-4">
            {SERVICES.slice(0, 3).map((service) => (
              <div key={service.id} className="service-card">
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  price={service.price}
                  onClick={() => handleServiceClick(service.id)}
                />
              </div>
            ))}
          </div>
          
          {/* View All Services Button */}
          <div className="text-center mt-6 lg:mt-8">
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white hover:text-black px-6 py-2.5 lg:px-8 lg:py-3 text-base lg:text-lg transition-all duration-300 hover:scale-105"
              onClick={() => router.push("/services")}
            >
              Ver Todos os Serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const contactSection = (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-br from-black via-gray-800 to-black flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Pronto para cuidar do seu instrumento?
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Entre em contato conosco para agendar seu serviço ou tirar suas dúvidas
        </p>
        <div className="space-y-6">
          <Button 
            onClick={handleContactClick}
            className="bg-white text-black hover:bg-gray-200 px-12 py-4 text-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Entre em Contato
          </Button>
          
          {/* Contact Info */}
          <div className="border-t border-gray-700 pt-8 mt-12">
            <p className="text-lg text-gray-400 mb-4">
              Ou entre em contato diretamente:
            </p>
            <div className="flex justify-center gap-8 text-gray-300 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xl">📞</span>
                <span className="text-lg">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✉️</span>
                <span className="text-lg">contato@e3audio.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const footerSection = (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="mb-12">
          <h3 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            E3 Audio
          </h3>
          <p className="text-xl text-gray-400 mb-8">
            Excelência em luteria desde 2025
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Serviços</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Regulagem de Trastes</li>
              <li>Troca de Cordas</li>
              <li>Ajuste de Ponte</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contato</h4>
            <ul className="text-gray-400 space-y-2">
              <li>(11) 99999-9999</li>
              <li>contato@e3audio.com</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Horários</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Seg - Sex: 9h às 18h</li>
              <li>Sáb: 9h às 14h</li>
              <li>Dom: Fechado</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400">
            © 2025 E3 Audio - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <ScrollSections>
      {[heroSection, servicesSection, contactSection, footerSection]}
    </ScrollSections>
  );
}

