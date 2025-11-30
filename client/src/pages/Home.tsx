import { Link } from "wouter";
import { ArrowRight, MapPin, Lock, CreditCard, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { categoryLabels, type Category } from "@shared/schema";

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categoryIcons: Record<Category, string> = {
  hamburguer: "🍔",
  bebidas: "🥤",
  acompanhamentos: "🍟",
  sobremesas: "🍰",
  combos: "🎁",
};

export function Home({ products, onAddToCart }: HomeProps) {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const mostViewed = products.slice(0, 8);

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Hero with Background */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/30 via-background to-secondary/15 border-b-2 border-primary/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-primary/5"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,hsl(0_100%_45%),transparent_50%)] animate-vibrant-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-4 animate-bounce-in text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary drop-shadow-2xl">
            ReiBurguer
          </h1>
          <p className="text-foreground/90 max-w-2xl mx-auto mb-8 text-lg animate-slideInRight">
            Hambúrgueres deliciosos, bebidas refrescantes e muito sabor!
          </p>
          <Link href="/colecao">
            <Button size="lg" className="animate-vibrant-pulse hover-elevate bg-primary text-primary-foreground shadow-lg shadow-primary/50" data-testid="button-hero-collection">
              Ver Cardápio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/15 py-8 md:py-12 border-b-2 border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent hover:bg-primary/10 transition-all duration-300 animate-rotateIn border border-primary/20 shadow-sm shadow-primary/10">
              <div className="inline-block p-3 rounded-full bg-primary/20 mb-3 animate-vibrant-pulse">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Fácil de Pedir</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Pelo WhatsApp</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent hover:bg-primary/10 transition-all duration-300 animate-rotateIn border border-primary/20 shadow-sm shadow-primary/10" style={{ animationDelay: "0.1s" }}>
              <div className="inline-block p-3 rounded-full bg-primary/20 mb-3 animate-vibrant-pulse" style={{ animationDelay: "0.2s" }}>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Retirada na Loja</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Rua Antonio Giarola, 30</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent hover:bg-primary/10 transition-all duration-300 animate-rotateIn border border-primary/20 shadow-sm shadow-primary/10" style={{ animationDelay: "0.2s" }}>
              <div className="inline-block p-3 rounded-full bg-primary/20 mb-3 animate-vibrant-pulse" style={{ animationDelay: "0.4s" }}>
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1">Qualidade</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Ingredientes frescos</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent hover:bg-primary/10 transition-all duration-300 animate-rotateIn border border-primary/20 shadow-sm shadow-primary/10" style={{ animationDelay: "0.3s" }}>
              <div className="inline-block p-3 rounded-full bg-primary/20 mb-3 animate-vibrant-pulse" style={{ animationDelay: "0.6s" }}>
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Atendimento</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias em grid compacto */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-8 animate-slideInLeft">
            Cardápio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {(Object.keys(categoryLabels) as Category[]).map((category, idx) => (
              <Link
                key={category}
                href={`/categorias/${category}`}
                data-testid={`link-category-${category}`}
              >
                <Card 
                  className="p-4 text-center hover-elevate cursor-pointer h-full flex flex-col items-center justify-center transition-all duration-500 hover:shadow-lg"
                  style={{ 
                    animation: `rotateIn 0.6s ease-out ${idx * 0.1}s both`
                  }}
                >
                  <span className="text-3xl md:text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">
                    {categoryIcons[category]}
                  </span>
                  <p className="text-sm md:text-base font-medium">
                    {categoryLabels[category]}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTAQUES - VÍDEOS VIRAIS */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-light animate-slideInLeft text-foreground drop-shadow mb-8">
            DESTAQUES DO DIA
          </h2>
          
          {/* VÍDEOS DO INSTAGRAM */}
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-6">Confira nossos vídeos virais!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vídeo 1 */}
              <div className="relative overflow-hidden rounded-lg shadow-lg hover-elevate transition-all duration-300" style={{ animation: "fadeInDown 0.6s ease-out 0s both" }}>
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.instagram.com/reel/DN6gITtEuxD/embed"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    data-testid="video-instagram-1"
                  ></iframe>
                </div>
              </div>

              {/* Vídeo 2 */}
              <div className="relative overflow-hidden rounded-lg shadow-lg hover-elevate transition-all duration-300" style={{ animation: "fadeInDown 0.6s ease-out 0.1s both" }}>
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.instagram.com/reel/DNLXNOox2qj/embed"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    data-testid="video-instagram-2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* PRODUTOS EM DESTAQUE */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Produtos em Destaque</h3>
              <Link href="/colecao">
                <Button variant="outline" size="sm" className="animate-float" data-testid="button-see-all-new">
                  Ver Todos
                </Button>
              </Link>
            </div>
            
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredProducts.map((product, idx) => (
                  <div key={product.id} style={{ animation: `fadeInDown 0.6s ease-out ${idx * 0.1}s both` }}>
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Carregando produtos...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAIS VENDIDOS */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-light animate-slideInLeft">
              MAIS VENDIDOS
            </h2>
            <Link href="/colecao">
              <Button variant="outline" size="sm" className="animate-float" data-testid="button-see-all-viewed">
                Ver Todos
              </Button>
            </Link>
          </div>
          
          {mostViewed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mostViewed.map((product, idx) => (
                <div key={product.id} style={{ animation: `fadeInDown 0.6s ease-out ${idx * 0.1}s both` }}>
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Carregando produtos...
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4 animate-slideInLeft">
            Tem dúvidas?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto animate-slideInRight">
            Entre em contato conosco pelo WhatsApp e nossa equipe estará pronta para ajudar!
          </p>
          <a
            href="https://wa.me/5533987062406?text=Olá%2C%20estou%20navegando%20no%20cardápio%20da%20ReiBurguer%20e%20gostaria%20de%20fazer%20um%20pedido%21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="animate-glow" data-testid="button-hero-whatsapp">
              Pedir Agora
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
