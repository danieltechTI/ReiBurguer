import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, Category, Ingredient } from "@shared/schema";

interface CollectionProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export function Collection({ products, isLoading, onAddToCart }: CollectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 5000;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedIngredients.length > 0) {
      result = result.filter((p) => selectedIngredients.includes(p.ingredient));
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
  }, [products, selectedCategories, selectedIngredients, priceRange, sortBy]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleIngredientChange = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((m) => m !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedIngredients([]);
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Nosso Cardápio
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore todos os nossos deliciosos hambúrgueres, bebidas e acompanhamentos feitos com ingredientes frescos e de qualidade!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            selectedCategories={selectedCategories}
            selectedMaterials={selectedIngredients}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onCategoryChange={handleCategoryChange}
            onMaterialChange={handleIngredientChange}
            onPriceChange={setPriceRange}
            onClearFilters={handleClearFilters}
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-48" data-testid="select-sort">
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
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:underline"
                  data-testid="button-clear-filters-empty"
                >
                  Limpar filtros
                </button>
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
