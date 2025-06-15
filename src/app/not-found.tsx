import { PageContainer } from "@/components/layout/page-container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Página não encontrada</h2>
        <p className="text-secondary-foreground mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white">
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </PageContainer>
  );
}

