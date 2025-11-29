import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CartItem } from "@shared/schema";
import { Link } from "wouter";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-2xl font-light">
              Seu Carrinho
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-serif text-xl font-light mb-2">
              Carrinho Vazio
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Adicione peças incríveis à sua coleção
            </p>
            <Button onClick={onClose} data-testid="button-continue-shopping">
              Explorar Coleção
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <div className="h-24 w-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-base font-normal line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            R${" "}
                            {item.product.price.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => onRemoveItem(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          className="w-8 text-center text-sm"
                          data-testid={`text-quantity-${item.id}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-4 space-y-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">
                    R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-primary">Grátis</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span className="font-serif text-lg">Total</span>
                <span className="text-xl" data-testid="text-total">
                  R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    const message = `Olá! Gostaria de finalizar meu pedido:\n\n${items
                      .map(
                        (item) =>
                          `- ${item.product.name} (${item.quantity}x) - R$ ${(
                            item.product.price * item.quantity
                          ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                      )
                      .join("\n")}\n\nTotal: R$ ${subtotal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`;
                    window.open(
                      `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                  data-testid="button-checkout-whatsapp"
                >
                  Finalizar via WhatsApp
                </Button>
                <Link href="/contato" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    data-testid="button-contact"
                  >
                    Entrar em Contato
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
