import { Link } from "wouter";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Product } from "@shared/schema";
import { materialLabels } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="group relative overflow-visible border-0 bg-transparent shadow-none"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <Link href={`/produto/${product.id}`} data-testid={`link-product-${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm"
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Link href={`/produto/${product.id}`} className="flex-1">
              <Button
                variant="secondary"
                className="w-full bg-background/90 backdrop-blur-sm"
                data-testid={`button-view-${product.id}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </Link>
            <Button
              size="icon"
              className="bg-primary/90 backdrop-blur-sm"
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

      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal tracking-wide">
            {materialLabels[product.material]}
          </Badge>
        </div>
        
        <Link href={`/produto/${product.id}`}>
          <h3
            className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-light tracking-wide text-foreground"
            data-testid={`text-product-price-${product.id}`}
          >
            R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
