import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@shared/schema";

export function WhatsAppButton() {
  const handleClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os produtos Glam Gear.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse-glow z-40"
      onClick={handleClick}
      data-testid="button-whatsapp-floating"
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}
