import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const ADMIN_PASSWORD = "reiburguer2024"; // Admin password

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao painel admin!",
      });
      setLocation("/admin");
    } else {
      toast({
        title: "Erro",
        description: "Senha incorreta",
        variant: "destructive",
      });
    }

    setIsLoading(false);
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ReiBurguer</h1>
          <p className="text-secondary">Painel de Administração</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Senha de Admin
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              data-testid="input-admin-password"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-primary hover:bg-primary/90"
            data-testid="button-admin-login"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-xs text-secondary/60 text-center mt-4">
          Apenas para administradores da loja
        </p>
      </Card>
    </div>
  );
}
