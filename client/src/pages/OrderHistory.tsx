import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@shared/schema";

const statusColors: Record<string, string> = {
  confirmado: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  preparando: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  pronto: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  finalizado: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  recusado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const statusLabels: Record<string, string> = {
  confirmado: "Confirmado",
  preparando: "Preparando",
  pronto: "Pronto",
  finalizado: "Finalizado",
  recusado: "Recusado",
};

export function OrderHistory() {
  const [, navigate] = useLocation();

  const { data: orders = [], isLoading, isError } = useQuery<Order[]>({
    queryKey: ["/api/customer/orders"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Meus Pedidos</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando pedidos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !orders) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Meus Pedidos</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-destructive">Erro ao carregar pedidos. Tente novamente.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Meus Pedidos</h1>
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center border-0">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">Você ainda não fez nenhum pedido</p>
            <Button className="mt-4" onClick={() => navigate("/")} data-testid="button-start-shopping">
              Começar a Comprar
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 border-0 bg-card hover-elevate">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Número do Pedido</p>
                    <p className="text-lg font-bold" data-testid={`text-order-number-${order.orderNumber}`}>
                      #{order.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="text-sm font-medium" data-testid={`text-order-date-${order.orderNumber}`}>
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={`${statusColors[order.status]} mt-1`} data-testid={`badge-status-${order.orderNumber}`}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-bold text-primary" data-testid={`text-total-${order.orderNumber}`}>
                      R$ {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">Itens Pedidos:</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={`${order.id}-${idx}`}
                        className="flex justify-between items-center text-sm p-3 bg-muted/50 rounded-md"
                        data-testid={`item-${order.orderNumber}-${item.product?.id || idx}`}
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.product?.name || "Produto"}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.product?.specifications?.ingredients || "Sem detalhes"}
                          </p>
                        </div>
                        <div className="text-right flex gap-4">
                          <span className="text-muted-foreground">
                            <span className="font-semibold text-foreground">{item.quantity}x</span>
                          </span>
                          <span className="font-medium w-20 text-right">
                            R$ {((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <div className="border-t pt-3 mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Observações:</p>
                    <p className="text-sm italic text-muted-foreground">{order.notes}</p>
                  </div>
                )}

                <div className="border-t pt-3 mt-3 text-xs text-muted-foreground">
                  <p>Telefone: {order.customerPhone}</p>
                  <p>Forma de Pagamento: {order.paymentMethod?.toUpperCase() || "Pendente"}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
