import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function RegistrationSuccess() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-12">
      <h1 className="text-3xl font-bold">Cadastro Concluído!</h1>
      
      <div className="w-24 h-24 rounded-full bg-background border-4 border-primary flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-primary" />
      </div>
      
      <p className="text-secondary-foreground max-w-xs">
        Sua conta foi criada com sucesso. Você já pode acessar todos os serviços disponíveis.
      </p>
      
      <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full max-w-xs">
        <Link href="/services">
          Começar
        </Link>
      </Button>
    </div>
  );
}

