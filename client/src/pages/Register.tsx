import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/authContext";

export function Register() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { register, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      await register(data.email, data.password, data.name);
      toast({
        title: "Bem-vindo!",
        description: "Conta criada com sucesso.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error?.response?.data?.message || "Erro ao registrar.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 border-0">
        <h1 className="font-serif text-3xl font-light mb-2 text-center">Registrar</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Crie sua conta para comprar como cliente
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} data-testid="input-register-name" />
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
                    <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-register-email" />
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
                    <Input type="password" placeholder="Mínimo 6 caracteres" {...field} data-testid="input-register-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting || isLoading} data-testid="button-register-submit">
              {isSubmitting ? "Registrando..." : "Criar Conta"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Já tem conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
              data-testid="link-to-login"
            >
              Entrar
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
