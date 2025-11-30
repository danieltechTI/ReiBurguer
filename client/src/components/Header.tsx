import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, LogIn, LogOut, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/authContext";
import { useColor } from "@/lib/colorContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/delivery", label: "Delivery" },
  { href: "/colecao", label: "Cardápio" },
  { href: "/videos", label: "Vídeos" },
  { href: "/contato", label: "Contato" },
];

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { customer, logout } = useAuth();
  const { hue, setHue } = useColor();

  const colorPresets = [
    { name: "Vermelho", hue: 0 },
    { name: "Laranja", hue: 30 },
    { name: "Amarelo", hue: 45 },
    { name: "Verde", hue: 120 },
    { name: "Azul", hue: 220 },
    { name: "Roxo", hue: 280 },
    { name: "Rosa", hue: 330 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background via-background/95 to-primary/20 backdrop-blur-md border-b-2 border-primary/40 shadow-lg shadow-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
                  >
                    <span
                      className={`text-lg font-light tracking-wide transition-colors hover-elevate px-3 py-2 rounded-md block ${
                        location === link.href
                          ? "text-primary font-medium"
                          : "text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <div className="border-t border-border mt-4 pt-4">
                  {customer ? (
                    <>
                      <p className="text-sm font-light text-foreground/70 mb-3">
                        Olá, {customer.name}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        data-testid="button-logout-mobile"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="link-login-mobile"
                      >
                        <Button variant="ghost" className="w-full justify-start">
                          <LogIn className="h-4 w-4 mr-2" />
                          Entrar
                        </Button>
                      </Link>
                      <Link
                        href="/registro"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="link-register-mobile"
                      >
                        <Button variant="ghost" className="w-full justify-start">
                          Registrar
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                <span
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group ${
                    location === link.href
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
          </nav>

          <Link href="/" data-testid="link-logo">
            <h1 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-primary animate-red-glow drop-shadow-lg">
              ReiBurguer
            </h1>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {customer && (
              <div className="hidden md:flex items-center gap-2 text-sm font-light">
                <span className="text-foreground/70">Olá, {customer.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  data-testid="button-logout"
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}

            {!customer && (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" data-testid="link-login">
                  <Button variant="ghost" size="sm" data-testid="button-login">
                    <LogIn className="h-4 w-4 mr-1" />
                    Entrar
                  </Button>
                </Link>
                <Link href="/registro" data-testid="link-register">
                  <Button size="sm" data-testid="button-register">
                    Registrar
                  </Button>
                </Link>
              </div>
            )}

            <DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-color-picker"
                title="Mudar cor"
              >
                <Palette className="h-5 w-5" />
              </Button>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Escolha a cor</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-2 p-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.hue}
                      onClick={() => setHue(preset.hue)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        hue === preset.hue
                          ? "ring-2 ring-offset-2"
                          : "hover:bg-accent"
                      }`}
                      style={{
                        backgroundColor: `hsl(${preset.hue} 100% 52%)`,
                        color: "white",
                        opacity: hue === preset.hue ? 1 : 0.7,
                      }}
                      data-testid={`button-color-${preset.name.toLowerCase()}`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Cor personalizada
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={`hsl(${hue}, 100%, 52%)`}
                      onChange={(e) => {
                        const rgb = e.target.value;
                        const hex = rgb.replace("#", "");
                        const r = parseInt(hex.substr(0, 2), 16) / 255;
                        const g = parseInt(hex.substr(2, 2), 16) / 255;
                        const b = parseInt(hex.substr(4, 2), 16) / 255;
                        const max = Math.max(r, g, b);
                        const min = Math.min(r, g, b);
                        let h = 0;
                        if (max === r)
                          h = ((g - b) / (max - min)) * 60;
                        else if (max === g)
                          h = 120 + ((b - r) / (max - min)) * 60;
                        else h = 240 + ((r - g) / (max - min)) * 60;
                        if (h < 0) h += 360;
                        setHue(Math.round(h));
                      }}
                      data-testid="input-color-custom"
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="number"
                      min="0"
                      max="359"
                      value={hue}
                      onChange={(e) => setHue(parseInt(e.target.value) || 0)}
                      data-testid="input-hue-value"
                      className="flex-1 px-2 py-1 border border-border rounded text-sm"
                      placeholder="Hue (0-359)"
                    />
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
