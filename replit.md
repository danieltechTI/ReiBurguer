# ReiBurguer - Hamburgueria Online

## Overview
Hamburgueria completa com sistema de pedidos online para PICKUP. Clientes montam pedidos via carrinho, finalizam com WhatsApp, e retiram na loja.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Authentication**: Express Session com senha SHA256
- **Email**: Resend
- **PDF**: PDFKit

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utilities
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main app com rotas
│   │   └── index.css     # Global styles
├── server/               # Backend Express application
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # In-memory data storage
│   └── index.ts          # Express com session middleware
├── shared/               # Shared types and schemas
│   └── schema.ts         # Data models e Zod schemas
└── attached_assets/      # Generated images
    └── generated_images/ # Product images
```

## Features
- ✅ **Homepage**: Hero section, categorias em grid, produtos em destaque
- ✅ **Collection Page**: Catálogo completo com filtros
- ✅ **Category Pages**: Produtos filtrados por categoria
- ✅ **Product Detail**: Galeria de imagens, ingredientes, descrição
- ✅ **Shopping Cart**: Carrinho slide-out com controle de quantidade
- ✅ **Authentication**: Sistema de registro e login para clientes
- ✅ **Checkout (PICKUP)**: Finalizar pedido com nome, telefone, forma de pagamento
- ✅ **WhatsApp Checkout**: Gerar mensagem e link para confirmar pedido via WhatsApp
- ✅ **Order Management**: Contador sequencial (00001-99999), status tracking
- ✅ **Contact**: Formulário de contato
- ✅ **Email**: Boas-vindas com PDF ao registrar
- ✅ **Admin Panel**: Painel de gerenciamento de pedidos com notificação sonora em tempo real

## Categorias de Produtos
1. **Hambúrgueres** - Clássico, Bacon Premium, Frango, Vegetariano
2. **Bebidas** - Refrigerantes, Milk Shakes
3. **Acompanhamentos** - Batata Frita, Anéis de Cebola
4. **Sobremesas** - Sorvetes, Sundaes
5. **Combos** - Promoções com hambúrguer + bebida + acompanhamento

## API Endpoints

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Detalhes do produto
- `GET /api/products/category/:category` - Produtos por categoria

### Carrinho
- `GET /api/cart` - Itens do carrinho
- `POST /api/cart` - Adicionar item ao carrinho
- `PATCH /api/cart/:id` - Atualizar quantidade
- `DELETE /api/cart/:id` - Remover item
- `DELETE /api/cart` - Limpar carrinho

### Pedidos
- `POST /api/orders/checkout` - Criar pedido (aceita guest checkout)
  - Body: `{ customerName, customerPhone, paymentMethod?, notes? }`
  - Return: `{ id, orderNumber, total, status, whatsappLink, message }`
- `GET /api/orders/:orderNumber` - Buscar pedido por número

### Admin (NOVO)
- `GET /api/admin/orders` - Listar todos os pedidos
- `PATCH /api/admin/orders/:orderId` - Atualizar status do pedido
  - Body: `{ status }` (confirmado → preparando → pronto → finalizado)

### Autenticação
- `POST /api/auth/register` - Registrar novo cliente
- `POST /api/auth/login` - Login de cliente
- `POST /api/auth/logout` - Logout de cliente
- `GET /api/auth/me` - Verificar se está autenticado

### Contato
- `POST /api/contact` - Enviar mensagem de contato

## Fluxo de Compra
1. Cliente se registra ou faz login
2. Navega pelos hambúrgueres e categorias
3. Adiciona itens ao carrinho
4. Clica em "Finalizar Compra"
5. Preenche nome, telefone, forma de pagamento
6. Sistema gera número de pedido (00001-99999)
7. Recebe link WhatsApp com resumo do pedido
8. Confirma no WhatsApp
9. Loja recebe notificação e prepara pedido
10. Cliente recebe no WhatsApp: "Pedido Confirmado", "Preparando", "Pronto para Retirada"
11. Retira na loja: Rua Antonio Giarola, 30

## Modelo de Order
```typescript
interface Order {
  id: string;                    // UUID
  orderNumber: string;           // 00001-99999 (sequencial)
  customerId: string;            // ID do cliente
  customerName: string;
  customerPhone: string;
  items: CartItem[];             // Items do pedido
  subtotal: number;
  shippingCost: number;          // Sempre 0 (pickup)
  total: number;
  status: "confirmado" | "preparando" | "pronto" | "finalizado" | "recusado";
  paymentMethod?: string;        // "dinheiro", "cartao", "pix"
  notes?: string;                // Observações do cliente
  createdAt: string;
  updatedAt: string;
}
```

## Autenticação
- **Registro**: Página em `/registro` com formulário de criação de conta
- **Login**: Página em `/login` com formulário de autenticação
- **Header**: Botões "Entrar" e "Registrar" visíveis quando não autenticado
- **Header**: Nome do cliente e botão "Sair" quando autenticado
- **Session**: Mantém cliente logado por 7 dias
- **Segurança**: Senhas com hash SHA256

## Dados de Teste
Você pode se registrar com qualquer email e senha (mínimo 6 caracteres).

## Running the Project
A aplicação roda na porta 5000 com `npm run dev`.

## Recent Updates
- ✅ Transformado de Glam Gear para ReiBurguer
- ✅ Categorias alteradas para hamburgueria
- ✅ Cores: vermelho/amarelo/marrom
- ✅ Sistema de autenticação completo
- ✅ Email de boas-vindas com PDF
- ✅ Modelo de Order com contador sequencial (00001-99999)
- ✅ Endpoint /api/orders/checkout para criar pedidos
- ✅ Geração automática de link WhatsApp com mensagem do pedido
- ✅ Página de Checkout (PICKUP) com forma de pagamento
- ✅ **[NOVO]** Admin Panel em /admin com lista de pedidos em tempo real
- ✅ **[NOVO]** Notificação popup com som sonoro ao chegar novo pedido
- ✅ **[NOVO]** Botões para aceitar (→ preparando) ou rejeitar pedido
- ✅ **[NOVO]** Som toca repetidamente a cada 2 segundos até aceitar/rejeitar
- ✅ **[DATABASE]** Migrado para PostgreSQL com Drizzle ORM - dados persistem ao reiniciar!
- ✅ **[DATABASE]** Tabelas: orders, order_counter, contact_messages, order_status_updates
- ✅ **[DATABASE]** Contador sequencial (00001-99999) persistido no banco
- ✅ **[VISUAL]** Improved hero section with larger, bold fonts
- ✅ **[VISUAL]** Reorganized page layout with "Destaques do Dia" at the end
- ✅ **[NUMERO]** Corrigido número de WhatsApp: +55 31 99503-0612
- ✅ **[TWILIO]** Integração Twilio para mensagens automáticas WhatsApp
- ✅ **[TWILIO]** Mensagem automática de confirmação quando pedido é criado
- ✅ **[TWILIO]** Mensagens automáticas quando admin atualiza status: preparando → pronto → finalizado
- ✅ **[ADMIN]** Fluxo passo a passo: confirmado → preparando → pronto → finalizado
- ✅ **[ADMIN]** Botões mostram claramente próximo status: "→ Preparando", "→ Pronto", "→ Finalizado"

## Configurações da Loja
- **Nome**: ReiBurguer
- **Endereço Retirada**: Rua Antonio Giarola, 30 - Governador Valadares, MG
- **WhatsApp**: +55 31 99347-1856
- **Instagram**: @glamgear5
- **Horário**: Segunda a Domingo, 11h-22h (sugestão)

## Fluxo do Admin Panel
1. Loja abre /admin para gerenciar pedidos
2. Quando cliente cria pedido online, popup aparece automaticamente
3. Som sonoro toca repetidamente a cada 2 segundos
4. Admin clica "Aceitar Pedido" → status muda para "preparando"
5. Admin clica novamente para "pronto" quando pedido está pronto
6. Depois "finalizado" quando cliente retira

## Sistema de Automação WhatsApp

### Fluxo Automático de Mensagens
1. **Pedido Criado** (cliente finaliza checkout)
   - Cliente recebe: "Pedido #XXXXX recebido! ✅ Seu pedido foi confirmado! Começamos a preparar. Tempo estimado: 20-30 minutos."

2. **Admin clica → Preparando** (status muda)
   - Cliente recebe: "Pedido #XXXXX - 👨‍🍳 Seu pedido está sendo preparado com carinho. Fique ligado!"

3. **Admin clica → Pronto** (status muda)
   - Cliente recebe: "Pedido #XXXXX - 🎉 Seu pedido está PRONTO! Venha retirar em: R. Antônio Giarola, 30 - Céu Azul, Belo Horizonte - MG"

4. **Admin clica → Finalizado** (status muda)
   - Cliente recebe: "Pedido #XXXXX - 🙏 Obrigado por sua compra! Volte sempre ao ReiBurguer!"

### Modo Demo
- Se variáveis TWILIO não estão configuradas, mensagens aparecem no console (modo demo)
- Pronto para usar com credenciais Twilio reais quando fornecidas

## Próximos Passos Sugeridos
- Adicionar histórico de pedidos para clientes
- Implementar sistema de horário de funcionamento
- Enviar email após pedido confirmado
- Adicionar filtro de datas/horas no admin panel
- Gráficos de vendas em tempo real
