import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            E3 Audio
          </h1>

          <p className="text-sm text-gray-500 mt-4">
            Faça login para entrar em contato e agendar serviços
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">
            Não tem uma conta?{" "}
            <Link 
              href="/register" 
              className="font-medium text-white hover:text-gray-300 underline underline-offset-2"
            >
              Cadastre-se aqui
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            <Link 
              href="/" 
              className="font-medium text-gray-400 hover:text-white underline underline-offset-2"
            >
              ← Voltar para página inicial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}