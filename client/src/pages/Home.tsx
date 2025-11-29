import { Link } from "wouter";
import { ArrowRight, Truck, Shield, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { categoryLabels, type Category } from "@shared/schema";

import heroImage from "@assets/generated_images/hero_jewelry_model_image.png";
import ringImage from "@assets/generated_images/gold_ring_product_shot.png";
import necklaceImage from "@assets/generated_images/gold_necklace_product_shot.png";
import earringsImage from "@assets/generated_images/gold_earrings_product_shot.png";
import braceletImage from "@assets/generated_images/gold_bracelet_product_shot.png";
import glamGearLogo from "@assets/generated_images/glam_gear_logo.png";

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categoryImages: Record<Category, string> = {
  joias: ringImage,
  "semi-joias": necklaceImage,
  "aco-inoxidavel": earringsImage,
  biju: braceletImage,
  bolsas: braceletImage,
};

const testimonials = [
  {
    id: 1,
    name: "Ana Carolina",
    text: "Qualidade impecável! As joias são ainda mais bonitas pessoalmente. Atendimento excepcional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria Fernanda",
    text: "Comprei um colar para presente e superou todas as expectativas. Embalagem linda e entrega rápida.",
    rating: 5,
  },
  {
    id: 3,
    name: "Juliana Santos",
    text: "Peças delicadas e sofisticadas. Já é minha loja favorita de joias online.",
    rating: 5,
  },
];

export function Home({ products, onAddToCart }: HomeProps) {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Joias exclusivas Lumière"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-8">
          <div className="max-w-xl flex-1">
            <span className="text-sm uppercase tracking-widest text-white/80 mb-4 block">
              Nova Coleção 2025
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
              Brilhe com
              <br />
              <span className="italic">Elegância</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-md">
              Descubra nossa coleção exclusiva de joias e semi joias, 
              criadas para realçar sua beleza natural.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/colecao">
                <Button
                  size="lg"
                  className="bg-white/90 text-foreground backdrop-blur-sm border border-white/20"
                  data-testid="button-hero-collection"
                >
                  Ver Coleção
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white bg-white/10 backdrop-blur-sm"
                  data-testid="button-hero-contact"
                >
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-1 justify-center">
            <img 
              src={glamGearLogo} 
              alt="Glam Gear Logo" 
              className="max-w-xs mix-blend-lighten"
              data-testid="img-hero-logo"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Explore por Categoria
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encontre a peça perfeita para cada momento especial
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {(Object.keys(categoryLabels) as Category[]).map((category) => (
              <Link
                key={category}
                href={`/categorias/${category}`}
                data-testid={`link-category-${category}`}
              >
                <Card className="group relative aspect-square overflow-hidden border-0 hover-elevate">
                  <img
                    src={categoryImages[category]}
                    alt={categoryLabels[category]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <h3 className="font-serif text-xl md:text-2xl font-light text-white">
                      {categoryLabels[category]}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-2">
                Destaques
              </h2>
              <p className="text-muted-foreground">
                Peças mais amadas pelos nossos clientes
              </p>
            </div>
            <Link href="/colecao">
              <Button variant="outline" data-testid="button-view-all">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-0 bg-card">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">
                Frete Grátis
              </h3>
              <p className="text-sm text-muted-foreground">
                Em compras acima de R$ 299
              </p>
            </Card>

            <Card className="p-8 text-center border-0 bg-card">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">
                Compra Segura
              </h3>
              <p className="text-sm text-muted-foreground">
                Pagamento 100% protegido
              </p>
            </Card>

            <Card className="p-8 text-center border-0 bg-card">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">
                Troca Fácil
              </h3>
              <p className="text-sm text-muted-foreground">
                30 dias para trocar ou devolver
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              O Que Dizem Nossas Clientes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A satisfação de quem escolhe Lumière
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 border-0 bg-background"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-sm">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Receba Novidades Exclusivas
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Seja a primeira a saber sobre novas coleções e ofertas especiais
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              data-testid="input-newsletter"
            />
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary"
              data-testid="button-newsletter"
            >
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
