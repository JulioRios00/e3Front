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

const additionalInfoSchema = z
  .object({
    birthday: z.string().min(1, "Data de nascimento é obrigatória"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    userType: z.enum(["CLIENT", "LUTHIER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type AdditionalInfoValues = z.infer<typeof additionalInfoSchema>;

interface RegistrationFormStep2Props {
  onBack: () => void;
  onSubmit: (data: AdditionalInfoValues) => void;
}

export function RegistrationFormStep2({
  onBack,
  onSubmit,
}: RegistrationFormStep2Props) {
  const form = useForm<AdditionalInfoValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      birthday: "",
      password: "",
      confirmPassword: "",
      userType: "CLIENT",
    },
  });

  function handleSubmit(data: AdditionalInfoValues) {
    onSubmit(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cadastro</h1>
        <p className="text-secondary-foreground">Informações Adicionais</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
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
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Usuário</FormLabel>
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    className={`flex-1 ${
                      field.value === "CLIENT"
                        ? "bg-primary text-white"
                        : "bg-card text-foreground"
                    }`}
                    onClick={() => field.onChange("CLIENT")}
                  >
                    Cliente
                  </Button>
                  <Button
                    type="button"
                    className={`flex-1 ${
                      field.value === "LUTHIER"
                        ? "bg-primary text-white"
                        : "bg-card text-foreground"
                    }`}
                    onClick={() => field.onChange("LUTHIER")}
                  >
                    Luthier
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              className="flex-1 bg-secondary hover:bg-secondary/90 text-foreground"
              onClick={onBack}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

