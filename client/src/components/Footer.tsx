import { Link } from "wouter";
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-light">Lumière</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Joias e semi joias exclusivas que celebram a beleza feminina com
              elegância e sofisticação.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                data-testid="button-social-instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                data-testid="button-social-facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest font-medium">
              Categorias
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/categorias/aneis" data-testid="link-footer-aneis">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Anéis
                </span>
              </Link>
              <Link href="/categorias/colares" data-testid="link-footer-colares">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Colares
                </span>
              </Link>
              <Link href="/categorias/brincos" data-testid="link-footer-brincos">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Brincos
                </span>
              </Link>
              <Link href="/categorias/pulseiras" data-testid="link-footer-pulseiras">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pulseiras
                </span>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest font-medium">
              Atendimento
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-phone"
              >
                <Phone className="h-4 w-4" />
                (11) 99999-9999
              </a>
              <a
                href="mailto:contato@lumiere.com.br"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4" />
                contato@lumiere.com.br
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Rua das Joias, 123
                  <br />
                  São Paulo - SP
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest font-medium">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground">
              Receba novidades e ofertas exclusivas
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-subscribe">
                Assinar
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Lumière Joias. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/termos" data-testid="link-terms">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </span>
            </Link>
            <Link href="/privacidade" data-testid="link-privacy">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidade
              </span>
            </Link>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        data-testid="button-whatsapp-float"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg bg-green-500 hover:bg-green-600"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </a>
    </footer>
  );
}
