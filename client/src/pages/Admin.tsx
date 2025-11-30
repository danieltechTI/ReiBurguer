import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import type { Order } from "@shared/schema";

export function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Check if admin is logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setLocation("/admin-login");
  };
  const [newOrderNotification, setNewOrderNotification] = useState<Order | null>(null);
  const [playingNotificationSound, setPlayingNotificationSound] = useState(false);
  const [shownNotificationIds, setShownNotificationIds] = useState<Set<string>>(new Set());
  const lastOrderCountRef = useRef<number>(0);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play continuous notification sound
  function startNotificationSound() {
    if (playingNotificationSound) return; // Already playing
    
    setPlayingNotificationSound(true);
    
    // Stop any existing interval
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }

    let audioContext: any = null;

    const playBeep = () => {
      try {
        // Create or get existing audio context
        if (!audioContext) {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        // Resume context if suspended
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }

        const now = audioContext.currentTime;
        
        // Create oscillator
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 900;
        oscillator.type = "sine";
        
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        oscillator.start(now);
        oscillator.stop(now + 0.4);
        
        console.log("🔔 Som tocando!");
      } catch (e) {
        console.error("Error playing sound:", e);
      }
    };

    // Play immediately and then every 2 seconds
    console.log("🔔 Iniciando som de notificação...");
    playBeep();
    audioIntervalRef.current = setInterval(playBeep, 2000);
  }

  function stopNotificationSound() {
    setPlayingNotificationSound(false);
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
  }

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
    refetchInterval: 2000, // Check every 2 seconds for new orders
  });

  // Detect new orders and show notification
  useEffect(() => {
    if (orders.length > lastOrderCountRef.current) {
      // Find the newest order that's "confirmado" and hasn't been shown yet
      const newOrders = orders.filter(o => o.status === "confirmado" && !shownNotificationIds.has(o.id));
      if (newOrders.length > 0) {
        const newestOrder = newOrders[newOrders.length - 1];
        setNewOrderNotification(newestOrder);
        setShownNotificationIds(prev => new Set([...prev, newestOrder.id]));
        startNotificationSound();
      }
    }
    lastOrderCountRef.current = orders.length;
  }, [orders, shownNotificationIds]);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      stopNotificationSound();
    };
  }, []);

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
      case "recusado":
        return "bg-red-100 text-red-800";
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

  const pendingOrders = orders.filter(o => o.status !== "finalizado" && o.status !== "recusado");
  const allOrders = orders;
  
  // Calculate stats (exclude recusado from revenue and counts)
  const acceptedOrders = allOrders.filter(o => o.status !== "recusado");
  const totalRevenue = acceptedOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = acceptedOrders.length;
  const completedOrders = acceptedOrders.filter(o => o.status === "finalizado").length;

  if (isLoading) {
    return <div className="p-4">Carregando...</div>;
  }

  const handleAcceptOrder = () => {
    stopNotificationSound();
    setNewOrderNotification(null);
    if (newOrderNotification) {
      // Accept the order by moving to "preparando" status
      updateStatusMutation.mutate({
        orderId: newOrderNotification.id,
        status: "preparando",
      });
    }
  };

  const handleRejectOrder = () => {
    stopNotificationSound();
    if (newOrderNotification) {
      updateStatusMutation.mutate({
        orderId: newOrderNotification.id,
        status: "recusado",
      });
      toast({
        title: "Pedido Recusado",
        description: "O pedido foi marcado como recusado e não aparece no faturamento.",
        duration: 3000,
      });
    }
    setNewOrderNotification(null);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* New Order Notification Dialog */}
      <AlertDialog open={!!newOrderNotification} onOpenChange={(open) => {
        if (!open) {
          stopNotificationSound();
          setNewOrderNotification(null);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Novo Pedido!</AlertDialogTitle>
            <AlertDialogDescription>
              {newOrderNotification && (
                <div className="mt-4 space-y-2 text-foreground">
                  <p>
                    <strong>Pedido #{newOrderNotification.orderNumber}</strong>
                  </p>
                  <p>Cliente: {newOrderNotification.customerName}</p>
                  <p>Telefone: {newOrderNotification.customerPhone}</p>
                  <p>Itens: {newOrderNotification.items.length}</p>
                  <p className="text-lg font-bold">
                    Total: R$ {newOrderNotification.total.toFixed(2)}
                  </p>
                  {newOrderNotification.notes && (
                    <p>Obs: {newOrderNotification.notes}</p>
                  )}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel
              onClick={handleRejectOrder}
              data-testid="button-reject-order"
            >
              Rejeitar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAcceptOrder}
              className="bg-green-600 hover:bg-green-700"
              data-testid="button-accept-order"
            >
              Aceitar Pedido
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Painel Admin - Controle de Pedidos</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <p className="text-sm text-secondary mb-2">Faturamento Total</p>
            <p className="text-3xl font-bold text-primary">R$ {totalRevenue.toFixed(2)}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <p className="text-sm text-secondary mb-2">Total de Pedidos</p>
            <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5">
            <p className="text-sm text-secondary mb-2">Pedidos Finalizados</p>
            <p className="text-3xl font-bold text-green-600">{completedOrders}</p>
          </Card>
        </div>

        {/* Pending Orders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Pedidos Pendentes ({pendingOrders.length})</h2>
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
        </div>

        {/* Order History Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Histórico Completo de Pedidos ({allOrders.length})</h2>
          {allOrders.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-secondary">Nenhum pedido ainda</p>
            </Card>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allOrders
                .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
                .map((order) => (
                  <Card key={order.id} className="p-3 flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">Pedido #{order.orderNumber}</p>
                        <Badge className={`${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary">
                        {order.customerName} • R$ {order.total.toFixed(2)} • {order.items.length} itens
                      </p>
                      {order.createdAt && (
                        <p className="text-xs text-secondary/60">
                          {new Date(order.createdAt).toLocaleString("pt-BR")}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
