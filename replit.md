# ReiBurguer - Hamburgueria Online

## Overview
Hamburgueria completa com sistema de pedidos online. Clientes montam seu pedido com hambúrgueres, bebidas, acompanhamentos e combos, finalizando a compra via WhatsApp e escolhendo a forma de pagamento com a loja.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Authentication**: Express Session com senha SHA256

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Header.tsx (com botões de auth)
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── ProductFilters.tsx
│   │   ├── lib/
│   │   │   └── authContext.tsx (Context de autenticação)
│   │   ├── pages/        # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Collection.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx       # Main app com rotas auth
│   │   └── index.css     # Global styles
├── server/               # Backend Express application
│   ├── routes.ts         # API endpoints (com auth)
│   ├── storage.ts        # In-memory data storage
│   └── index.ts          # Express com session middleware
├── shared/               # Shared types and schemas
│   └── schema.ts         # Data models e Zod schemas
└── attached_assets/      # Generated images
    └── generated_images/ # Product images
```

## Features
- **Homepage**: Hero section, categorias em grid, produtos em destaque
- **Collection Page**: Catálogo completo com filtros e ordenação
- **Category Pages**: Produtos filtrados por categoria (Hambúrgueres, Bebidas, Acompanhamentos, Sobremesas, Combos)
- **Product Detail**: Galeria de imagens, ingredientes, descrição, adicionar ao carrinho
- **Shopping Cart**: Carrinho slide-out com controle de quantidade
- **Authentication**: ✅ Sistema de registro e login para clientes
- **WhatsApp Checkout**: Finalizar pedido via WhatsApp com items, valor final e opções de pagamento
- **Contact**: Formulário de contato para atendimento
- **WhatsApp**: Botão flutuante para contato rápido
- **Email**: Boas-vindas automática com PDF ao registrar
- **Frete**: Cálculo de frete dos Correios

## Categorias de Produtos
1. **Hambúrgueres** - Clássico, Bacon Premium, Frango, Vegetariano
2. **Bebidas** - Refrigerantes, Milk Shakes, Bebidas diversas
3. **Acompanhamentos** - Batata Frita, Anéis de Cebola, etc
4. **Sobremesas** - Sorvetes, Sundaes, Doces
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

### Contato
- `POST /api/contact` - Enviar mensagem de contato

### Autenticação
- `POST /api/auth/register` - Registrar novo cliente
- `POST /api/auth/login` - Login de cliente
- `POST /api/auth/logout` - Logout de cliente
- `GET /api/auth/me` - Verificar se está autenticado

## Fluxo de Compra
1. Cliente se registra ou faz login
2. Navega pelos hambúrgueres e categorias
3. Adiciona itens ao carrinho
4. Abre o carrinho via ícone ou botão
5. Clica em "Finalizar via WhatsApp"
6. É direcionado para conversa com a loja no WhatsApp
7. Mensagem inclui: items, quantidades, valor total
8. Loja confirma o pedido e propõe formas de pagamento

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
- ✅ Categorias alteradas para Hambúrgueres, Bebidas, Acompanhamentos, Sobremesas, Combos
- ✅ Produtos atualizados para menu de hamburgueria
- ✅ Cores alteradas para vermelho/amarelo/marrom (identidade ReiBurguer)
- ✅ Sistema de autenticação completo
- ✅ Email de boas-vindas com PDF
- ✅ Frete dos Correios integrado

## Configurações da Loja
- **Nome**: ReiBurguer
- **Endereço**: Rua Décima Segunda, 200 - Governador Valadares, MG
- **CEP**: 35052090
- **WhatsApp**: (33) 98706-2406
- **Instagram**: @reiBurguer

## Próximos Passos (Sugestões)
- Adicionar mais hambúrgueres e bebidas
- Configurar horário de funcionamento
- Enviar email após pedido
- Histórico de pedidos para clientes
- Painel de admin para gerenciar pedidos
