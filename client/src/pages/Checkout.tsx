import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { ArrowLeft, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertOrderSchema, type CartItem, type InsertOrder, WHATSAPP_NUMBER, type ShippingInfo } from "@shared/schema";

interface CheckoutProps {
  cartItems: CartItem[];
  subtotal: number;
}

export function Checkout({ cartItems, subtotal }: CheckoutProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      address: {
        cep: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
    },
  });

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        // First: Get address via viaCEP
        const addressResponse = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const addressData = await addressResponse.json();
        
        if (addressData.erro) {
          toast({
            title: "CEP não encontrado",
            description: "Verifique e tente novamente",
            variant: "destructive",
          });
          setLoadingCep(false);
          return;
        }

        form.setValue("address.street", addressData.logradouro);
        form.setValue("address.neighborhood", addressData.bairro);
        form.setValue("address.city", addressData.localidade);
        form.setValue("address.state", addressData.uf);

        // Second: Calculate shipping via our API (uses Correios)
        const shippingResponse = await fetch("/api/shipping/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cep: cleanCep })
        });

        const shippingData = await shippingResponse.json();
        
        if (shippingData.shippingOptions && shippingData.shippingOptions.length > 0) {
          // Use PAC option by default (cheaper)
          const pacOption = shippingData.shippingOptions.find((opt: any) => opt.service === "PAC") || shippingData.shippingOptions[0];
          setShippingInfo({ days: pacOption.days, value: pacOption.value });
          toast({
            title: "Frete calculado",
            description: `${pacOption.service} - ${pacOption.days} dias úteis - R$ ${pacOption.value.toFixed(2)}`,
          });
        } else {
          throw new Error("No shipping options available");
        }
      } catch (error) {
        toast({
          title: "Erro ao calcular frete",
          description: "Usando frete padrão",
          variant: "destructive",
        });
        // Fallback to default shipping
        setShippingInfo({ days: 7, value: 25 });
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSubmit = async (data: InsertOrder) => {
    if (!shippingInfo) {
      toast({
        title: "Erro",
        description: "Preencha o CEP para calcular o frete",
        variant: "destructive",
      });
      return;
    }

    const total = subtotal + shippingInfo.value;
    const message = `✨ *Bem-vindo à Glam Gear!* ✨\n\nOlá ${data.name}, seu pedido chegou!\n\n*RESUMO DO PEDIDO*\n\n*Cliente:*\n${data.name}\nEmail: ${data.email}\nTelefone: ${data.phone}\nCPF: ${data.cpf}\n\n*Endereço de Entrega:*\n${data.address.street}, ${data.address.number}${data.address.complement ? ` - ${data.address.complement}` : ""}\n${data.address.neighborhood}, ${data.address.city} - ${data.address.state}\nCEP: ${data.address.cep}\n\n*Produtos:*\n${cartItems.map(item => `- ${item.product.name} (${item.quantity}x) - R$ ${(item.product.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`).join("\n")}\n\n*Cálculo:*\nSubtotal: R$ ${subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\nFrete (${shippingInfo.days} dias): R$ ${shippingInfo.value.toFixed(2)}\n\n*TOTAL: R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}*\n\nObrigado por escolher Glam Gear! 💎`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="font-serif text-xl mb-4">Carrinho vazio</h2>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à Loja
          </Button>
        </Card>
      </div>
    );
  }

  const total = subtotal + (shippingInfo?.value || 0);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
          data-testid="button-back-checkout"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <h1 className="font-serif text-4xl font-light mb-8">Finalizar Pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 border-0 bg-card">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="font-medium text-lg mb-4">Dados Pessoais</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cpf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <Input placeholder="000.000.000-00" {...field} data-testid="input-cpf" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Endereço de Entrega
                    </h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="address.cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="00000-000"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleCepChange(e.target.value);
                                  }}
                                  data-testid="input-cep"
                                />
                                {loadingCep && <Loader2 className="h-5 w-5 animate-spin" />}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="address.street"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input placeholder="Rua das Flores" {...field} data-testid="input-street" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address.number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} data-testid="input-number" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address.complement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Complemento (Opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apto 42, Bloco B" {...field} data-testid="input-complement" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address.neighborhood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input placeholder="Centro" {...field} data-testid="input-neighborhood" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="São Paulo" {...field} data-testid="input-city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="SP" maxLength={2} {...field} data-testid="input-state" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" data-testid="button-submit-checkout">
                    Finalizar Pedido no WhatsApp
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          {/* Resumo */}
          <div>
            <Card className="p-6 border-0 bg-card sticky top-24">
              <h3 className="font-medium text-lg mb-4">Resumo do Pedido</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>
                      R$ {(item.product.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>

                {shippingInfo && (
                  <div className="flex justify-between text-sm">
                    <span>Frete ({shippingInfo.days} dias)</span>
                    <span>R$ {shippingInfo.value.toFixed(2)}</span>
                  </div>
                )}

                {!shippingInfo && (
                  <div className="text-xs text-muted-foreground">
                    Preencha o CEP para calcular o frete
                  </div>
                )}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>
                    R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
