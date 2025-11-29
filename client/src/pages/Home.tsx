import { Link } from "wouter";
import { ArrowRight, Truck, Lock, CreditCard, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { categoryLabels, type Category } from "@shared/schema";
import luxuryJewelry from "@assets/generated_images/luxury_jewelry_flat_lay_background.png";
import womenJewelry from "@assets/generated_images/women's_jewelry_collection_aesthetic.png";
import stainlessSteelJewelry from "@assets/generated_images/stainless_steel_jewelry_modern.png";

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categoryIcons: Record<Category, string> = {
  joias: "💎",
  "semi-joias": "✨",
  "aco-inoxidavel": "🔗",
  biju: "💍",
  bolsas: "👜",
};

export function Home({ products, onAddToCart }: HomeProps) {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const mostViewed = products.slice(0, 8);

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Hero with Background */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${luxuryJewelry})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-4 animate-slideInLeft text-foreground drop-shadow-lg">
            Glam Gear
          </h1>
          <p className="text-foreground/90 max-w-2xl mx-auto mb-8 text-lg animate-slideInRight">
            Joias, Semi-joias, Aço Inoxidável, Bijuterias e Bolsas com estilo e qualidade
          </p>
          <Link href="/colecao">
            <Button size="lg" className="animate-float hover-elevate" data-testid="button-hero-collection">
              Explorar Coleção
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-8 md:py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 rounded-lg hover:bg-background/50 transition-all duration-300 animate-rotateIn">
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1">Parcelamento</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Até 5x sem juros</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-background/50 transition-all duration-300 animate-rotateIn" style={{ animationDelay: "0.1s" }}>
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1">Envio Rápido</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Para todo Brasil</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-background/50 transition-all duration-300 animate-rotateIn" style={{ animationDelay: "0.2s" }}>
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1">Segurança</h3>
              <p className="text-xs md:text-sm text-muted-foreground">100% confiável</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-background/50 transition-all duration-300 animate-rotateIn" style={{ animationDelay: "0.3s" }}>
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1">Atendimento</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias em grid compacto */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-8 animate-slideInLeft">
            Categorias
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

      {/* NEW IN */}
      <section 
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(${womenJewelry})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-light animate-slideInLeft text-foreground drop-shadow">
              NOVIDADES
            </h2>
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
      </section>

      {/* MAIS VISTOS */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-light animate-slideInLeft">
              MAIS VISTOS
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
            href="https://wa.me/5511999999999?text=Olá%2C%20estou%20navegando%20em%20sua%20loja%20e%20gostaria%20de%20um%20atendimento%21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="animate-glow" data-testid="button-hero-whatsapp">
              Fale Conosco
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
