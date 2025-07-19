"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ContactDialogProps {
  serviceTitle: string;
  servicePrice: number;
  triggerText?: string;
  triggerClassName?: string;
}

export function ContactDialog({ 
  serviceTitle, 
  servicePrice, 
  triggerText = "AGENDAR SERVIÇO",
  triggerClassName = "bg-white text-black hover:bg-gray-200 px-6 py-3 text-lg font-semibold"
}: ContactDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border-gray-800 text-white max-w-md">
        <ContactForm 
          serviceTitle={serviceTitle}
          servicePrice={servicePrice}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
