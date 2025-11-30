
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
      {/* Hero Section - Premium */}
      <div 
        className="w-full flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/hero-background.png?v=1')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '520px',
          maxHeight: '650px',
        }}
      >
        <div className="text-left px-6 md:px-16 max-w-2xl bg-black/40 py-8 md:py-12 rounded-lg backdrop-blur-sm">
          <p className="text-yellow-400 font-bold text-base md:text-lg mb-4 uppercase tracking-wider drop-shadow-lg">✨ A Melhor Hamburgueria da Região ✨</p>
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-xl" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8)'}}>
            ReiBurguer
          </h1>
          <p className="text-white font-semibold mb-8 text-xl md:text-2xl drop-shadow-xl leading-relaxed" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            Hambúrgueres artesanais, bebidas geladas e muito sabor. Feita com amor em cada detalhe!
          </p>
          <Link href="/colecao">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold gap-2" data-testid="button-hero-collection">
              Explorar Cardápio
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Benefícios - Premium Layout com Animações */}
      <section className="bg-white py-16 md:py-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {/* Fácil de Pedir - Com Bandeiras de Pagamento */}
            <div className="text-center flex flex-col items-center group cursor-pointer">
              <div className="inline-block p-4 rounded-full bg-primary/15 mb-4 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110">
                <CreditCard className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground">Fácil de Pedir</h3>
              <p className="text-sm text-muted-foreground transition-opacity duration-300 group-hover:opacity-0">Pelo WhatsApp</p>
              
              {/* Bandeiras aparecem ao passar mouse */}
              <div className="absolute text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>💰</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💳</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>📱</span>
              </div>
            </div>

            {/* Retirada Rápida - Com Animação de Velocidade */}
            <div className="text-center flex flex-col items-center group">
              <div className="inline-block p-4 rounded-full bg-primary/15 mb-4 transition-all duration-300 group-hover:bg-primary/25">
                <MapPin className="h-7 w-7 text-primary transition-transform duration-500 group-hover:animate-pulse" />
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">Retirada Rápida</h3>
              <p className="text-sm text-muted-foreground">R. Antônio Giarola, 30</p>
              
              {/* Linha de velocidade */}
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>

            {/* Premium - Com Animação de Brilho */}
            <div className="text-center flex flex-col items-center group">
              <div className="inline-block p-4 rounded-full bg-primary/15 mb-4 transition-all duration-300 group-hover:bg-yellow-200/30 relative">
                <Lock className="h-7 w-7 text-primary transition-all duration-300 group-hover:text-yellow-500" />
                {/* Brilho ao fundo */}
                <div className="absolute inset-0 rounded-full bg-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground group-hover:text-yellow-600 transition-colors duration-300">Premium</h3>
              <p className="text-sm text-muted-foreground">Ingredientes selecionados</p>
              
              {/* Estrelas aparecem */}
              <div className="mt-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>⭐</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
              </div>
            </div>

            {/* Suporte via WhatsApp - Com Animação de Pulso */}
            <div className="text-center flex flex-col items-center group">
              <div className="inline-block p-4 rounded-full bg-green-500/15 mb-4 transition-all duration-300 group-hover:bg-green-500/25 relative">
                <Phone className="h-7 w-7 text-green-600 transition-all duration-300 group-hover:text-green-500" />
                {/* Pulso de radiação */}
                <div className="absolute inset-0 rounded-full border-2 border-green-500/0 group-hover:border-green-500/50 animate-pulse"></div>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 text-foreground group-hover:text-green-600 transition-colors duration-300">Suporte via WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Rápido e fácil</p>
              
              {/* Mensagem flutuante */}
              <div className="mt-2 text-sm font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
                💬 Sempre online!
              </div>
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
            href="https://wa.me/5531993471856?text=Olá%21%20Seja%20bem-vindo%28a%29%20ao%20ReiBurguer%20%F0%9F%91%91%0A%0AEstamos%20muito%20felizes%20com%20o%20seu%20contato%21%20%F0%9F%8E%89%0A%0AVocê%20mencionou%20que%20está%20navegando%20no%20nosso%20cardápio%20%F0%9F%93%9C%20e%20gostaria%20de%20fazer%20um%20pedido%20%F0%9F%8D%94%0A%0APara%20agilizar%2C%20responda%20com%20a%20opção%20desejada%3A%0A%0A%F0%9F%91%89%20Ver%20o%20Cardápio%20novamente%3A%20https%3A%2F%2Freiburguer.com%2Fcolecao%0A%0A%F0%9F%92%B0%20Fazer%20um%20Pedido%2FFalar%20com%20um%20atendente%3A%20%28Será%20direcionado%20para%20o%20atendente%29%0A%0A%F0%9F%93%8D%20Consultar%20nosso%20horário%20de%20funcionamento%2Fendereço%3A%20Rua%20Antonio%20Giarola%2C%2030%0A%0AAguardamos%20seu%20pedido%21%20%F0%9F%9A%80%20%28Tempo%20médio%20de%20resposta%3A%201%20minuto%29"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" data-testid="button-hero-whatsapp">
              Pedir Agora
            </Button>
          </a>
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

        </div>
      </section>
    </div>
  );
}
