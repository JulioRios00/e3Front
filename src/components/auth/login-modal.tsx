"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (redirectTo?: string) => void;
  redirectTo?: string;
  serviceName?: string;
}

export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  redirectTo,
  serviceName,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      console.log("Login attempt:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);

      // Call success callback
      if (onLoginSuccess) {
        onLoginSuccess(redirectTo);
      }

      // Close modal
      onClose();

      // Redirect if specified
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-md p-0 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 z-10 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="space-y-1 pb-6 pt-6">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white mb-1">E3 Audio</h1>
                <p className="text-sm text-gray-400">
                  Sistema de Gestão para Luthiers
                </p>
              </div>
              <CardTitle className="text-xl font-bold text-center text-white">
                Fazer Login
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                {serviceName ? (
                  <>
                    Faça login para entrar em contato sobre{" "}
                    <span className="text-white font-medium">
                      &apos;{serviceName}&apos;
                    </span>
                  </>
                ) : (
                  "Digite seu email e senha para acessar sua conta"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="modal-email"
                    className="text-white font-medium"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="modal-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="modal-password"
                    className="text-white font-medium"
                  >
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="modal-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-800"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium py-2.5 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Não tem uma conta?{" "}
                    <button
                      type="button"
                      className="font-medium text-white hover:text-gray-300 underline underline-offset-2"
                      onClick={() => {
                        onClose();
                        window.location.href = "/register";
                      }}
                    >
                      Cadastre-se aqui
                    </button>
                  </p>
                </div>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-gray-400 hover:text-white font-medium p-0 h-auto"
                    onClick={() => console.log("Forgot password clicked")}
                  >
                    Esqueceu sua senha?
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
