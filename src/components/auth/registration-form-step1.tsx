import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

interface RegistrationFormStep1Props {
  onNext: (data: PersonalInfoValues) => void;
}

export function RegistrationFormStep1({ onNext }: RegistrationFormStep1Props) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: PersonalInfoValues) {
    onNext(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cadastro</h1>
        <p className="text-secondary-foreground">Informações Pessoais</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome"
                    {...field}
                    className="bg-card border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sobrenome"
                    {...field}
                    className="bg-card border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="bg-card border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Telefone"
                    {...field}
                    className="bg-card border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
          >
            Próximo
          </Button>
        </form>
      </Form>
    </div>
  );
}

