import { Truck, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Delivery() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Delivery 🚗
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Entregamos seus pedidos fresquinhos e quentinhos!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="flex gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
                <p className="text-muted-foreground">Receba seu pedido em até 30 minutos</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Área de Atendimento</h3>
                <p className="text-muted-foreground">Governador Valadares e região</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Entre em Contato</h3>
                <p className="text-muted-foreground">WhatsApp: (33) 98706-2406</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Horário</h3>
                <p className="text-muted-foreground">Seg-Dom: 11h às 23h</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">
            Pronto para pedir?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Faça seu pedido agora mesmo pelo WhatsApp ou navegue pelo nosso cardápio!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/5531995030612?text=Olá%2C%20gostaria%20de%20fazer%20um%20pedido%20para%20delivery%21"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Pedir via WhatsApp
              </Button>
            </a>
            <a href="/colecao">
              <Button size="lg" variant="outline">
                Ver Cardápio
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
