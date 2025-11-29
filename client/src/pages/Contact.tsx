import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";

interface ContactProps {
  onSubmit: (data: InsertContact) => Promise<void>;
  isSubmitting: boolean;
}

export function Contact({ onSubmit, isSubmitting }: ContactProps) {
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit = async (data: InsertContact) => {
    try {
      await onSubmit(data);
      form.reset();
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Entre em Contato
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para ajudá-la a encontrar a joia perfeita. 
            Entre em contato conosco por qualquer um dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 border-0 bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telefone</h3>
                    <a
                      href="tel:+5511999999999"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-contact-phone"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:contato@lumiere.com.br"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-contact-email"
                    >
                      contato@lumiere.com.br
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Endereço</h3>
                    <p className="text-sm text-muted-foreground">
                      Rua das Joias, 123
                      <br />
                      São Paulo - SP
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Horário</h3>
                    <p className="text-sm text-muted-foreground">
                      Seg - Sex: 9h às 18h
                      <br />
                      Sáb: 9h às 13h
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 border-0 bg-green-500/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Atendimento rápido e personalizado
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-green-500 hover:bg-green-600" data-testid="button-whatsapp">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Falar no WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 md:p-8 border-0 bg-card">
            <h2 className="font-serif text-2xl font-light mb-6">
              Envie sua Mensagem
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome completo"
                          {...field}
                          data-testid="input-contact-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          {...field}
                          data-testid="input-contact-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          {...field}
                          data-testid="input-contact-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Como podemos ajudá-la?"
                          className="min-h-32 resize-none"
                          {...field}
                          data-testid="input-contact-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
