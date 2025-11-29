import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/authContext";
import glamGearLogoHeader from "@assets/generated_images/glam_gear_logo_header.png";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/colecao", label: "Coleção" },
  { href: "/categorias/joias", label: "Joias" },
  { href: "/categorias/semi-joias", label: "Semi-Joias" },
  { href: "/categorias/aco-inoxidavel", label: "Aço Inoxidável" },
  { href: "/categorias/biju", label: "Bijuterias" },
  { href: "/categorias/bolsas", label: "Bolsas" },
];

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { customer, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background via-background to-primary/10 backdrop-blur-md border-b border-border">
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

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                <span
                  className={`text-sm uppercase tracking-widest font-light transition-all duration-300 hover:text-primary relative group ${
                    location === link.href
                      ? "text-primary font-medium"
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
            <h1 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-foreground">
              Glam Gear
            </h1>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden md:flex items-center gap-8 mr-4">
              {navLinks.slice(3).map((link) => (
                <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                  <span
                    className={`text-sm uppercase tracking-widest font-light transition-all duration-300 hover:text-primary relative group ${
                      location === link.href
                        ? "text-primary font-medium"
                        : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>

            <Link href="/" data-testid="link-logo-right" className="transition-transform duration-300 hover:scale-110">
              <img 
                src={glamGearLogoHeader} 
                alt="Glam Gear" 
                className="h-16 md:h-20 w-auto animate-fadeInDown"
                data-testid="img-header-logo"
              />
            </Link>

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
