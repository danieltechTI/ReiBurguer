import { Link } from "wouter";
import { ArrowRight, MapPin, Lock, CreditCard, Phone, Instagram } from "lucide-react";
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
    <div>
      {/* Hero with Background Image */}
      <div 
        className="w-full h-screen pt-20 flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="text-center px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-4 text-white drop-shadow-lg">
            ReiBurguer
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-base md:text-lg drop-shadow">
            Hambúrgueres deliciosos, bebidas refrescantes e muito sabor!
          </p>
          <Link href="/colecao">
            <Button size="lg" className="hover-elevate bg-primary text-primary-foreground" data-testid="button-hero-collection">
              Ver Cardápio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Benefícios */}
      <section className="bg-white py-12 md:py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-4">
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Fácil de Pedir</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Pelo WhatsApp</p>
            </div>
            <div className="text-center p-4">
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Retirada na Loja</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Rua Antonio Giarola, 30</p>
            </div>
            <div className="text-center p-4">
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Qualidade</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Ingredientes frescos</p>
            </div>
            <div className="text-center p-4">
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base mb-1 text-foreground">Atendimento</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias em grid compacto */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">
            Cardápio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(Object.keys(categoryLabels) as Category[]).map((category) => (
              <Link
                key={category}
                href={`/categorias/${category}`}
                data-testid={`link-category-${category}`}
              >
                <Card 
                  className="p-4 text-center hover-elevate cursor-pointer h-full flex flex-col items-center justify-center border-border"
                >
                  <span className="text-3xl md:text-4xl mb-3">
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
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-8">
            Destaques do Dia
          </h2>
          
          {/* VÍDEOS LOCAIS */}
          <div className="mb-12">
            <h3 className="text-base font-medium mb-6">Confira nossos vídeos virais!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vídeo 1 */}
              <div className="relative overflow-hidden rounded-md border border-border bg-black">
                <video
                  width="100%"
                  height="auto"
                  controls
                  style={{ display: "block", aspectRatio: "16/9" }}
                  data-testid="video-player-1"
                >
                  <source src="/videos/video1.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Vídeo 2 */}
              <div className="relative overflow-hidden rounded-md border border-border bg-black">
                <video
                  width="100%"
                  height="auto"
                  controls
                  style={{ display: "block", aspectRatio: "16/9" }}
                  data-testid="video-player-2"
                >
                  <source src="/videos/video2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* PRODUTOS EM DESTAQUE */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Produtos em Destaque</h3>
              <a href="/colecao">
                <Button variant="outline" size="sm" data-testid="button-see-all-new">
                  Ver Todos
                </Button>
              </a>
            </div>
            
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredProducts.map((product) => (
                  <div key={product.id}>
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
      <section className="py-12 md:py-16 bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-light">
              Mais Vendidos
            </h2>
            <a href="/colecao">
              <Button variant="outline" size="sm" data-testid="button-see-all-viewed">
                Ver Todos
              </Button>
            </a>
          </div>
          
          {mostViewed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mostViewed.map((product) => (
                <div key={product.id}>
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
      <section className="py-12 md:py-16 bg-white border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Tem dúvidas?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Entre em contato conosco pelo WhatsApp e nossa equipe estará pronta para ajudar!
          </p>
          <a
            href="https://wa.me/31995030612?text=Olá%2C%20estou%20navegando%20no%20cardápio%20da%20ReiBurguer%20e%20gostaria%20de%20fazer%20um%20pedido%21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" data-testid="button-hero-whatsapp">
              Pedir Agora
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
