"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ContactFormProps {
  onClose?: () => void;
  serviceTitle?: string;
  servicePrice?: number;
}

export function ContactForm({ onClose, serviceTitle, servicePrice }: ContactFormProps) {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate contact/scheduling logic
    try {
      console.log("Contact form submitted:", {
        service: serviceTitle,
        price: servicePrice,
        phone,
        message
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-black border-gray-800 shadow-xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-xl font-bold text-center text-white flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Entre em Contato
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          {serviceTitle ? `Solicitar: ${serviceTitle}` : "Envie sua mensagem"}
          {servicePrice && (
            <div className="text-white font-semibold mt-1">
              R$ {servicePrice.toFixed(2).replace(".", ",")}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-medium">
              Telefone/WhatsApp
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white font-medium">
              Mensagem
            </Label>
            <textarea
              id="message"
              placeholder="Descreva o que você precisa..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[100px] px-3 py-2 bg-gray-900 border border-gray-700 text-white focus:border-gray-500 focus:ring-gray-500 placeholder:text-gray-500 rounded-md resize-none"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {onClose && (
              <Button 
                type="button" 
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancelar
              </Button>
            )}
            <Button 
              type="submit" 
              className="flex-1 bg-white text-black hover:bg-gray-200 font-medium transition-colors duration-200" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
            </Button>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-700 pt-4 mt-6">
            <p className="text-sm text-gray-400 text-center mb-2">
              Ou entre em contato diretamente:
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>contato@e3audio.com</span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
