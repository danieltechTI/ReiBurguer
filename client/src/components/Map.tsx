import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Map() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-border shadow-md bg-card p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-medium text-foreground">Endereço</h3>
            <p className="text-sm text-muted-foreground">R. Antônio Giarola, 30 - Céu Azul</p>
            <p className="text-xs text-muted-foreground">Belo Horizonte - MG, 31580-200</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-medium text-foreground">Contato</h3>
            <p className="text-sm text-muted-foreground">+55 31 99347-1856</p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=R.+Antônio+Giarola+30+Céu+Azul+Belo+Horizonte+MG"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2"
        >
          <Button variant="default" size="sm">
            Abrir no Google Maps
          </Button>
        </a>
      </div>
    </div>
  );
}
