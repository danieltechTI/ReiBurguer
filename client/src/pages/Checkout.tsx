import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import type { CartItem } from "@shared/schema";
import whatsappIcon from "@assets/icons8-whatsapp-96_1764516128170.png";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Nome obrigatório"),
  customerPhone: z.string().min(10, "Telefone obrigatório"),
  paymentMethod: z.enum(["dinheiro", "cartao", "pix"]).default("dinheiro"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutProps {
  cartItems: CartItem[];
  subtotal: number;
}

export function Checkout({ cartItems, subtotal }: CheckoutProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{
    orderNumber: string;
    total: number;
    whatsappLink: string;
    message: string;
  } | null>(null);

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      paymentMethod: "dinheiro",
      notes: "",
    },
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Carrinho Vazio</h2>
          <p className="text-secondary mb-6">Adicione itens ao carrinho para fazer um pedido.</p>
          <Button 
            onClick={() => navigate("/")}
            className="w-full"
          >
            Voltar ao Menu
          </Button>
        </Card>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao criar pedido",
          variant: "destructive",
        });
        return;
      }

      const result = await response.json();
      setOrderCreated(result);
      
      toast({
        title: "Pedido Criado!",
        description: `Pedido #${result.orderNumber} - Clique no botão abaixo para confirmar no WhatsApp`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao processar pedido",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Pedido Criado!</h2>
            <p className="text-2xl font-bold text-red-600">#{orderCreated.orderNumber}</p>
            <p className="text-lg mt-4">Total: R$ {orderCreated.total.toFixed(2)}</p>
          </div>

          <div className="bg-secondary/10 p-4 rounded-lg mb-6 max-h-32 overflow-y-auto">
            <p className="text-sm text-secondary whitespace-pre-wrap">{orderCreated.message}</p>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white mb-3"
          >
            <a
              href={orderCreated.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
              data-testid="button-confirm-whatsapp"
            >
              <img width="20" height="20" src={whatsappIcon} alt="whatsapp" />
              Confirmar no WhatsApp
            </a>
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full"
            data-testid="button-back-home"
          >
            Voltar ao Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
        </div>

        {/* Order Summary */}
        <Card className="p-4 mb-6">
          <h2 className="font-bold mb-4">Resumo do Pedido</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span data-testid={`text-item-${item.id}`}>
                  {item.quantity}x {item.product?.name}
                </span>
                <span data-testid={`text-price-${item.id}`}>
                  R$ {(item.product?.price || 0 * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span data-testid="text-total">R$ {subtotal.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Checkout Form */}
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        {...field}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(33) 9 8706-2406"
                        {...field}
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Method */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de Pagamento</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        data-testid="select-payment"
                      >
                        <option value="dinheiro">Dinheiro</option>
                        <option value="cartao">Cartão</option>
                        <option value="pix">PIX</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Sem cebola, sem tomate..."
                        {...field}
                        data-testid="textarea-notes"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || cartItems.length === 0}
                className="w-full"
                size="lg"
                data-testid="button-submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando Pedido...
                  </>
                ) : (
                  "Criar Pedido"
                )}
              </Button>

              {/* Info */}
              <p className="text-xs text-secondary text-center">
                Você receberá um link do WhatsApp para confirmar seu pedido
              </p>
            </form>
          </Form>
        </Card>

        {/* Location Info */}
        <Card className="p-4 mt-6 bg-secondary/5">
          <p className="text-sm font-bold mb-2">📍 Retirada em:</p>
          <p className="text-sm">R. Antônio Giarola, 30</p>
          <p className="text-sm">Céu Azul, Belo Horizonte - MG</p>
          <p className="text-sm">31580-200</p>
        </Card>
      </div>
    </div>
  );
}
