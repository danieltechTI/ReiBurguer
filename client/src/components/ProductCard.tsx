import { Link } from "wouter";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Product } from "@shared/schema";
import { ingredientLabels } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const pixPrice = Math.round(product.price * 0.95); // 5% desconto no Pix
  const installmentPrice = Math.round(product.price / 5 * 100) / 100;

  return (
    <Card
      className="group relative overflow-visible border-0 bg-transparent shadow-none animate-scaleIn hover:shadow-lg transition-shadow duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <Link href={`/produto/${product.id}`} data-testid={`link-product-${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {discount > 0 && (
          <Badge
            className="absolute top-3 left-3 bg-destructive text-destructive-foreground"
            data-testid={`badge-discount-${product.id}`}
          >
            -{discount}%
          </Badge>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Esgotado
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2 animate-fadeInDown">
            <Link href={`/produto/${product.id}`} className="flex-1">
              <Button
                variant="secondary"
                size="sm"
                className="w-full bg-background/90 backdrop-blur-sm transition-all duration-300 hover:bg-background"
                data-testid={`button-view-${product.id}`}
              >
                <Eye className="h-3 w-3 mr-1" />
                Ver
              </Button>
            </Link>
            <Button
              size="icon"
              className="bg-primary/90 backdrop-blur-sm transition-all duration-300 hover:bg-primary"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              disabled={!product.inStock}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Link href={`/produto/${product.id}`}>
          <h3
            className="font-medium text-sm text-foreground group-hover:text-primary transition-all duration-300 line-clamp-2"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>
        
        {/* Preços */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span
              className="text-base font-semibold text-foreground"
              data-testid={`text-product-price-${product.id}`}
            >
              R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
          
          {/* Desconto Pix */}
          <p className="text-xs text-primary font-medium">
            R$ {pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} à vista no Pix
          </p>
          
          {/* Parcelamento */}
          <p className="text-xs text-muted-foreground">
            ou 5x de R$ {installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Ingredientes Badge */}
        <Badge variant="outline" className="text-xs font-normal w-fit">
          {ingredientLabels[product.ingredient]}
        </Badge>
      </div>
    </Card>
  );
}
