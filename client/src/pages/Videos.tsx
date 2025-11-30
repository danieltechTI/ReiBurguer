import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Videos() {
  const videos = [
    {
      id: 1,
      title: "Nossos Hambúrgueres",
      description: "Conheça como preparamos nossos deliciosos hambúrgueres com ingredientes frescos",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Visita à Cozinha",
      description: "Veja como funciona nossa cozinha e o processo de preparação",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Clientes Felizes",
      description: "Veja depoimentos de nossos clientes satisfeitos",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Vídeos 📹
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Confira nossos vídeos e conheça melhor a ReiBurguer!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover-elevate">
              <div className="relative aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">
            Gostou do que viu?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Faça um pedido agora e compre nossos deliciosos hambúrgueres!
          </p>
          <a href="/colecao">
            <Button size="lg">
              Ver Cardápio Completo
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
