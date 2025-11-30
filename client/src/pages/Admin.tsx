import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import type { Order } from "@shared/schema";

export function Admin() {
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
    refetchInterval: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return apiRequest("PATCH", `/api/admin/orders/${orderId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-blue-100 text-blue-800";
      case "preparando":
        return "bg-yellow-100 text-yellow-800";
      case "pronto":
        return "bg-green-100 text-green-800";
      case "finalizado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNextStatus = (status: string) => {
    switch (status) {
      case "confirmado":
        return "preparando";
      case "preparando":
        return "pronto";
      case "pronto":
        return "finalizado";
      default:
        return status;
    }
  };

  const pendingOrders = orders.filter(o => o.status !== "finalizado");

  if (isLoading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Painel Admin - Pedidos</h1>

        {pendingOrders.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-secondary">Nenhum pedido pendente</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-bold" data-testid={`text-order-number-${order.id}`}>
                      Pedido #{order.orderNumber}
                    </p>
                    <p className="text-sm text-secondary">{order.customerName}</p>
                    <p className="text-sm text-secondary">{order.customerPhone}</p>
                    <p className="text-sm mt-2">
                      <strong>Itens:</strong> {order.items.length}
                    </p>
                    <p className="text-sm">
                      <strong>Total:</strong> R$ {order.total.toFixed(2)}
                    </p>
                    {order.notes && (
                      <p className="text-sm mt-2">
                        <strong>Obs:</strong> {order.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div>
                      <Badge className={`${getStatusColor(order.status)} px-3 py-1 font-bold`}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>

                    {order.status !== "finalizado" && (
                      <Button
                        onClick={() => {
                          const nextStatus = getNextStatus(order.status);
                          updateStatusMutation.mutate({ orderId: order.id, status: nextStatus });
                        }}
                        disabled={updateStatusMutation.isPending}
                        className="bg-red-600 hover:bg-red-700"
                        data-testid={`button-next-status-${order.id}`}
                      >
                        {order.status === "pronto" ? "Marcar como Finalizado" : "Próximo Status"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-secondary/10 rounded-lg text-sm">
          <p className="font-bold mb-2">Como usar:</p>
          <ol className="list-decimal list-inside space-y-1 text-secondary">
            <li>Cliente cria pedido online</li>
            <li>Aparece aqui em "CONFIRMADO"</li>
            <li>Clique "Próximo Status" para "PREPARANDO"</li>
            <li>Quando pronto, clique novamente para "PRONTO"</li>
            <li>Sistema envia WhatsApp para cliente automaticamente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
