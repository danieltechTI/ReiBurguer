import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import logoUrl from "@assets/Gemini_Generated_Image_hm3t66hm3t66hm3t_1764511817843.png";
import burgerIconUrl from "@assets/Gemini_Generated_Image_hm3t66hm3t66hm3t_1764516570041.png";
import { useQuery } from "@tanstack/react-query";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  hideNav?: boolean;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/delivery", label: "Delivery" },
  { href: "/colecao", label: "Cardápio" },
  { href: "/videos", label: "Vídeos" },
  { href: "/contato", label: "Contato" },
];

export function Header({ cartItemCount, onCartClick, hideNav = false }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: authData } = useQuery<{ customerId?: string } | undefined>({
    queryKey: ["/api/auth/me"],
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background via-background/95 to-primary/20 backdrop-blur-md border-b-2 border-primary/40 shadow-lg shadow-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-16 md:h-20 ${hideNav ? "justify-center" : "justify-between"}`}>
          {!hideNav && (
            <div className="flex items-center gap-6">
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
            </div>
          )}

          <Link href="/" data-testid="link-logo" className="flex items-center gap-2 md:gap-3">
            <img src={burgerIconUrl} alt="ReiBurguer Logo" className="h-12 w-12 md:h-14 md:w-14 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Space Mono', monospace", letterSpacing: '-0.02em' }}>
              Rei<span style={{ color: '#D4AF37' }}>Burguer</span>
            </h1>
          </Link>

          {!hideNav && <div className="flex items-center gap-2 md:gap-4">
            {authData?.customerId && (
              <Link href="/meus-pedidos" data-testid="link-order-history">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Meus Pedidos"
                  className="hover-elevate"
                >
                  <History className="h-5 w-5" />
                </Button>
              </Link>
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
          </div>}
        </div>
      </div>
    </header>
  );
}
