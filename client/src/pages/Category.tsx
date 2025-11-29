import { useState, useMemo } from "react";
import { useParams } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import type { Product, Category as CategoryType, Material } from "@shared/schema";
import { categoryLabels, materials, materialLabels } from "@shared/schema";

import ringImage from "@assets/generated_images/gold_ring_product_shot.png";
import necklaceImage from "@assets/generated_images/gold_necklace_product_shot.png";
import earringsImage from "@assets/generated_images/gold_earrings_product_shot.png";
import braceletImage from "@assets/generated_images/gold_bracelet_product_shot.png";

interface CategoryProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const categoryBanners: Record<CategoryType, { image: string; description: string }> = {
  aneis: {
    image: ringImage,
    description: "Anéis elegantes para todos os momentos. Do clássico ao contemporâneo.",
  },
  colares: {
    image: necklaceImage,
    description: "Colares delicados e sofisticados que realçam sua beleza natural.",
  },
  brincos: {
    image: earringsImage,
    description: "Brincos que emolduram seu rosto com brilho e elegância.",
  },
  pulseiras: {
    image: braceletImage,
    description: "Pulseiras que adornam seus pulsos com charme e distinção.",
  },
};

export function Category({ products, isLoading, onAddToCart }: CategoryProps) {
  const params = useParams<{ category: string }>();
  const category = params.category as CategoryType;
  
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const maxPrice = useMemo(() => {
    if (categoryProducts.length === 0) return 5000;
    return Math.max(...categoryProducts.map((p) => p.price));
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (selectedMaterials.length > 0) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [categoryProducts, selectedMaterials, priceRange, sortBy]);

  const handleMaterialChange = (material: Material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const banner = categoryBanners[category];
  const categoryLabel = categoryLabels[category] || category;

  if (!banner) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Categoria não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <section className="relative h-64 md:h-80 flex items-center">
        <div className="absolute inset-0">
          <img
            src={banner.image}
            alt={categoryLabel}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
            {categoryLabel}
          </h1>
          <p className="text-white/80 max-w-lg">{banner.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-widest font-medium">
                  Material
                </h4>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={() => handleMaterialChange(material)}
                        data-testid={`checkbox-cat-material-${material}`}
                      />
                      <Label
                        htmlFor={`cat-material-${material}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {materialLabels[material]}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-widest font-medium">
                  Faixa de Preço
                </h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={maxPrice}
                    step={50}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="w-full"
                    data-testid="slider-cat-price-range"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0].toLocaleString("pt-BR")}</span>
                  <span>R$ {priceRange[1].toLocaleString("pt-BR")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-muted-foreground" data-testid="text-cat-product-count">
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                {selectedMaterials.map((material) => (
                  <Badge
                    key={material}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleMaterialChange(material)}
                  >
                    {materialLabels[material]} ×
                  </Badge>
                ))}
              </div>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-48" data-testid="select-cat-sort">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destaques</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square rounded-md" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Nenhum produto encontrado nesta categoria.
                </p>
                {selectedMaterials.length > 0 && (
                  <button
                    onClick={() => setSelectedMaterials([])}
                    className="text-primary hover:underline"
                    data-testid="button-cat-clear-filters"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
