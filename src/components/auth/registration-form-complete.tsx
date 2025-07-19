"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      // After successful registration, redirect to services page
      window.location.href = "/services";
    } catch (error) {
      console.error("Registration error:", error);
      setError(error instanceof Error ? error.message : "Erro ao criar conta");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-black border-gray-800 shadow-xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Criar Conta
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Preencha os dados para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white font-medium">
              Nome *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="firstName"
                type="text"
                placeholder="Seu nome"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white font-medium">
              Sobrenome *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="lastName"
                type="text"
                placeholder="Seu sobrenome"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-medium">
              Telefone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Birthday Field */}
          <div className="space-y-2">
            <Label htmlFor="birthday" className="text-white font-medium">
              Data de Nascimento *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => handleInputChange("birthday", e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-medium">
              Senha *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white font-medium">
              Confirmar Senha *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="pl-10 pr-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-sm text-gray-400 hover:text-white font-medium"
              onClick={() => window.location.href = "/login"}
            >
              Já tem uma conta? Faça login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
