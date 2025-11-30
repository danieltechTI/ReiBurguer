import { Link } from "wouter";
import { Instagram, Facebook, Mail, Phone, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Map } from "./Map";
import whatsappIcon from "@assets/icons8-whatsapp-96_1764516128170.png";

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
                href="https://wa.me/5531993471856?text=Olá%21%20Seja%20bem-vindo%28a%29%20ao%20ReiBurguer%20%F0%9F%91%91%0A%0AEstamos%20muito%20felizes%20com%20o%20seu%20contato%21%20%F0%9F%8E%89%0A%0AVocê%20mencionou%20que%20está%20navegando%20no%20nosso%20cardápio%20%F0%9F%93%9C%20e%20gostaria%20de%20fazer%20um%20pedido%20%F0%9F%8D%94%0A%0APara%20agilizar%2C%20responda%20com%20a%20opção%20desejada%3A%0A%0A%F0%9F%91%89%20Ver%20o%20Cardápio%20novamente%3A%20https%3A%2F%2Freiburguer.com%2Fcolecao%0A%0A%F0%9F%92%B0%20Fazer%20um%20Pedido%2FFalar%20com%20um%20atendente%3A%20%28Será%20direcionado%20para%20o%20atendente%29%0A%0A%F0%9F%93%8D%20Consultar%20nosso%20horário%20de%20funcionamento%2Fendereço%3A%20Rua%20Antonio%20Giarola%2C%2030%0A%0AAguardamos%20seu%20pedido%21%20%F0%9F%9A%80%20%28Tempo%20médio%20de%20resposta%3A%201%20minuto%29"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-whatsapp"
              >
                <img width="16" height="16" src={whatsappIcon} alt="whatsapp" />
                WhatsApp: +55 31 99347-1856
              </a>
              <a
                href="tel:+5531993471856"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-phone"
              >
                <Phone className="h-4 w-4" />
                +55 31 99347-1856
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                R. Antônio Giarola, 30 - Céu Azul, Belo Horizonte - MG, 31580-200
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
          <p className="text-sm text-muted-foreground">
            {currentYear} ReiBurguer. Todos os direitos reservados.
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
            <Link href="/admin-login" data-testid="link-admin-secret" title="Admin">
              <Settings className="h-3 w-3 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/5531993471856"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        data-testid="button-whatsapp-float"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg bg-green-500 hover:bg-green-600"
        >
          <img width="24" height="24" src={whatsappIcon} alt="whatsapp" />
        </Button>
      </a>
    </footer>
  );
}
