import { useState, useCallback } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AuthProvider } from "@/lib/authContext";
import { ColorProvider } from "@/lib/colorContext";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Home } from "@/pages/Home";
import { Collection } from "@/pages/Collection";
import { Category } from "@/pages/Category";
import { ProductDetail } from "@/pages/ProductDetail";
import { Contact } from "@/pages/Contact";
import { Delivery } from "@/pages/Delivery";
import { Videos } from "@/pages/Videos";
import { Checkout } from "@/pages/Checkout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Admin } from "@/pages/Admin";
import type { Product, CartItem, InsertContact } from "@shared/schema";

function AppContent() {
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      return apiRequest("POST", "/api/cart", { productId, quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Adicionado ao carrinho",
        description: "O produto foi adicionado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto.",
        variant: "destructive",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${itemId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Removido do carrinho",
        description: "O produto foi removido.",
      });
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
  });

  const handleAddToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      addToCartMutation.mutate({ productId: product.id, quantity });
      setCartOpen(true);
    },
    [addToCartMutation]
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateQuantityMutation.mutate({ itemId, quantity });
    },
    [updateQuantityMutation]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItemMutation.mutate(itemId);
    },
    [removeItemMutation]
  );

  const handleContactSubmit = useCallback(
    async (data: InsertContact) => {
      await contactMutation.mutateAsync(data);
    },
    [contactMutation]
  );

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} onCartClick={() => setCartOpen(true)} />
      
      <main>
        <Switch>
          <Route path="/">
            <Home products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route path="/colecao">
            <Collection
              products={products}
              isLoading={productsLoading}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route path="/categorias/:category">
            <Category
              products={products}
              isLoading={productsLoading}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route path="/produto/:id">
            <ProductDetail
              products={products}
              isLoading={productsLoading}
              onAddToCart={handleAddToCart}
            />
          </Route>
          <Route path="/contato">
            <Contact
              onSubmit={handleContactSubmit}
              isSubmitting={contactMutation.isPending}
            />
          </Route>
          <Route path="/delivery">
            <Delivery />
          </Route>
          <Route path="/videos">
            <Videos />
          </Route>
          <Route path="/checkout">
            <Checkout cartItems={cartItems} subtotal={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registro">
            <Register />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ColorProvider>
          <AuthProvider>
            <Toaster />
            <AppContent />
          </AuthProvider>
        </ColorProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
