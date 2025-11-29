import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categories, materials, categoryLabels, materialLabels, type Category, type Material } from "@shared/schema";

interface ProductFiltersProps {
  selectedCategories: Category[];
  selectedMaterials: Material[];
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: Category) => void;
  onMaterialChange: (material: Material) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  selectedCategories,
  selectedMaterials,
  priceRange,
  maxPrice,
  onCategoryChange,
  onMaterialChange,
  onPriceChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedMaterials.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm uppercase tracking-widest font-medium">
          Categorias
        </h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
                data-testid={`checkbox-category-${category}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer"
              >
                {categoryLabels[category]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm uppercase tracking-widest font-medium">
          Material
        </h4>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => onMaterialChange(material)}
                data-testid={`checkbox-material-${material}`}
              />
              <Label
                htmlFor={`material-${material}`}
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
            onValueChange={(value) => onPriceChange(value as [number, number])}
            className="w-full"
            data-testid="slider-price-range"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span data-testid="text-price-min">
            R$ {priceRange[0].toLocaleString("pt-BR")}
          </span>
          <span data-testid="text-price-max">
            R$ {priceRange[1].toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            className="w-full"
            onClick={onClearFilters}
            data-testid="button-clear-filters"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h3 className="font-serif text-xl font-light mb-6">Filtros</h3>
          <FilterContent />
        </div>
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2" data-testid="button-open-filters">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  {selectedCategories.length + selectedMaterials.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="font-serif text-xl font-light">
                Filtros
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
