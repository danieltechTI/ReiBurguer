import { Link } from "wouter";
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Map } from "./Map";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h3 className="font-serif text-2xl font-light mb-4">Encontre a Gente!</h3>
          <Map />
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-light">ReiBurguer 🍔</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hambúrgueres deliciosos, bebidas refrescantes e acompanhamentos crocantes feitos com ingredientes frescos e de qualidade!
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/reiBurguer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  data-testid="button-social-instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
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
              Cardápio
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/categorias/hamburguer" data-testid="link-footer-hamburgueres">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hambúrgueres
                </span>
              </Link>
              <Link href="/categorias/bebidas" data-testid="link-footer-bebidas">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Bebidas
                </span>
              </Link>
              <Link href="/categorias/acompanhamentos" data-testid="link-footer-acompanhamentos">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Acompanhamentos
                </span>
              </Link>
              <Link href="/categorias/sobremesas" data-testid="link-footer-sobremesas">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobremesas
                </span>
              </Link>
              <Link href="/categorias/combos" data-testid="link-footer-combos">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Combos
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
                href="https://wa.me/5531995030612?text=Olá%2C%20estou%20navegando%20no%20cardápio%20da%20ReiBurguer%20e%20gostaria%20de%20fazer%20um%20pedido%21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp: (33) 98706-2406
              </a>
              <a
                href="tel:+5531995030612"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-phone"
              >
                <Phone className="h-4 w-4" />
                (33) 98706-2406
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Rua Antonio Giarola, 30 - Céu Azul
              </div>
              <div className="text-xs text-muted-foreground">
                Aberto todos os dias
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
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {currentYear} ReiBurguer. Todos os direitos reservados.
            </p>
            <Link href="/admin-login" data-testid="link-admin-secret" className="ml-auto md:ml-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 opacity-0 hover:opacity-100 transition-opacity"
                title="Admin"
              >
                <Settings className="h-3 w-3 text-muted-foreground" />
              </Button>
            </Link>
          </div>
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
        href="https://wa.me/5531995030612"
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
