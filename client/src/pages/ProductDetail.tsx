import { useState } from "react";
import { useParams, Link } from "wouter";
import { ChevronLeft, Minus, Plus, ShoppingBag, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { categoryLabels, ingredientLabels } from "@shared/schema";

interface ProductDetailProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetail({ products, isLoading, onAddToCart }: ProductDetailProps) {
  const params = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => p.id === params.id);

  const relatedProducts = products
    .filter((p) => p.id !== params.id && p.category === product?.category)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-[4/5] rounded-md" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-light mb-4">
            Produto não encontrado
          </h2>
          <Link href="/colecao">
            <Button data-testid="button-back-to-collection">
              Ver Coleção
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const images = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/colecao" data-testid="link-back">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-md overflow-hidden bg-muted">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  {categoryLabels[product.category]}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {ingredientLabels[product.ingredient]}
                </Badge>
                {discount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{discount}%
                  </Badge>
                )}
              </div>

              <h1
                className="font-serif text-3xl md:text-4xl font-light"
                data-testid="text-product-title"
              >
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span
                  className="text-2xl font-light tracking-wide"
                  data-testid="text-product-price"
                >
                  R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Quantidade:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-quantity-decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-quantity-increase"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={!product.inStock}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.inStock ? "Adicionar ao Carrinho" : "Produto Esgotado"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <Truck className="h-5 w-5 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Frete Grátis</p>
              </div>
              <div className="space-y-1">
                <Shield className="h-5 w-5 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Compra Segura</p>
              </div>
              <div className="space-y-1">
                <RefreshCw className="h-5 w-5 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">30 Dias Troca</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {Object.keys(product.specifications).length > 0 && (
                <AccordionItem value="specifications">
                  <AccordionTrigger className="text-sm uppercase tracking-widest" data-testid="accordion-specifications">
                    Especificações
                  </AccordionTrigger>
                  <AccordionContent>
                    <dl className="space-y-2">
                      {product.specifications.weight && (
                        <div className="flex justify-between text-sm">
                          <dt className="text-muted-foreground">Peso</dt>
                          <dd>{product.specifications.weight}</dd>
                        </div>
                      )}
                      {product.specifications.size && (
                        <div className="flex justify-between text-sm">
                          <dt className="text-muted-foreground">Tamanho</dt>
                          <dd>{product.specifications.size}</dd>
                        </div>
                      )}
                      {product.specifications.ingredients && (
                        <div className="flex justify-between text-sm">
                          <dt className="text-muted-foreground">Ingredientes</dt>
                          <dd>{product.specifications.ingredients}</dd>
                        </div>
                      )}
                      {product.specifications.allergen && (
                        <div className="flex justify-between text-sm">
                          <dt className="text-muted-foreground">Alérgenos</dt>
                          <dd>{product.specifications.allergen}</dd>
                        </div>
                      )}
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="care">
                <AccordionTrigger className="text-sm uppercase tracking-widest" data-testid="accordion-care">
                  Cuidados
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aproveite logo seus hambúrgueres e bebidas fresquinhas! 
                    Se for for levar para casa, mantenha em embalagem térmica. 
                    Melhor consumir no máximo 2 horas após o recebimento.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm uppercase tracking-widest" data-testid="accordion-shipping">
                  Envio
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Entregamos em Governador Valadares e região. 
                    Frete calculado automaticamente baseado no seu CEP. 
                    Entrega rápida via Correios (SEDEX e PAC disponível).
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">
              Você Também Pode Gostar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(product) => onAddToCart(product, 1)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
