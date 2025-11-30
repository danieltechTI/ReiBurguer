# 🔒 Relatório de Segurança e Bugs - ReiBurguer

**Data**: 30 de Novembro de 2025  
**Status**: ⚠️ 10 Problemas Encontrados

---

## 🔴 CRÍTICOS (Risco Alto)

### 1. **Senhas com SHA256 sem Salt (CRÍTICO)**
**Arquivo**: `server/routes.ts` linha 271  
**Problema**: Usando SHA256 para hash de senhas, que é MUITO fraco e vulnerável a força bruta
```typescript
// ❌ ERRADO
const passwordHash = crypto.createHash("sha256").update(parsed.data.password).digest("hex");
```
**Risco**: Qualquer atacante pode quebrar as senhas rapidamente  
**Solução**: Usar bcrypt ou argon2 com salt automático

---

### 2. **Número de Telefone Hardcoded (CRÍTICO)**
**Arquivo**: `server/routes.ts` linha 32  
**Problema**: Telefone da loja exposto no código-fonte como fallback
```typescript
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+5531993471856";
```
**Risco**: Expõe informação confidencial  
**Solução**: Remover fallback hardcoded, sempre usar env var

---

### 3. **Falta de Rate Limiting em Login (CRÍTICO)**
**Arquivo**: `server/routes.ts` linha 329  
**Problema**: Sem proteção contra brute force
```typescript
app.post("/api/auth/login", async (req, res) => {
  // Pode fazer infinitas tentativas de senha
});
```
**Risco**: Atacante pode testar milhões de combinações  
**Solução**: Implementar rate limiting com library como `express-rate-limit`

---

### 4. **Admin Panel sem Autenticação (CRÍTICO)**
**Arquivo**: `client/src/pages/Admin.tsx`  
**Problema**: Não valida se é admin, apenas checa senha simples no prompt
```typescript
const senha = prompt('Digite a senha do admin:');
if (senha === 'admin123') { // Senha hardcoded!
```
**Risco**: Qualquer usuário autenticado pode ser admin  
**Solução**: Verificar role de admin no backend antes de retornar dados

---

## 🟠 ALTOS (Risco Médio-Alto)

### 5. **Dados Personalizados Desatualizados no Email (ALTO)**
**Arquivo**: `server/routes.ts` linhas 90, 291-301  
**Problema**: PDF e email ainda falam "Glam Gear", não "ReiBurguer"
```typescript
doc.fontSize(14).text("à Glam Gear", { align: "center" }); // ❌ Errado!
from: "Glam Gear <noreply@glamgear.com.br>", // ❌ Errado!
```
**Risco**: Confunde cliente, pareça desatualizado  
**Solução**: Atualizar todos os textos para "ReiBurguer"

---

### 6. **Storage em Memória (não persistent) (ALTO)**
**Arquivo**: `server/storage.ts` linha 417  
**Problema**: Usando `MemStorage`, todos os pedidos desaparecem ao reiniciar
```typescript
export const storage = new MemStorage();
```
**Risco**: Perda de todos os dados quando o servidor reinicia  
**Solução**: Deveria estar usando PostgreSQL com Drizzle ORM

---

### 7. **Sem Validação Adequada de CEP (ALTO)**
**Arquivo**: `server/routes.ts` linha 489  
**Problema**: CEP vem do cliente, pode ter SQL injection
```typescript
const cleanCep = cep.replace(/\D/g, "");
if (cleanCep.length !== 8) { // Validação fraca
```
**Risco**: Potencial SQL injection na API de correios  
**Solução**: Usar regex mais rigoroso: `/^\d{5}-?\d{3}$/`

---

### 8. **Session Não Segura em Produção (ALTO)**
**Arquivo**: `server/index.ts` linha 22  
**Problema**: Cookie de sessão não forçado HTTPS em produção
```typescript
secure: process.env.NODE_ENV === "production", // Deveria ser sempre true
```
**Risco**: Sessão pode ser interceptada via HTTPS man-in-the-middle  
**Solução**: Sempre forçar `secure: true` para produção

---

## 🟡 MÉDIOS (Risco Médio)

### 9. **Sem CORS Configurado (MÉDIO)**
**Arquivo**: `server/index.ts`  
**Problema**: Sem configuração de CORS
```typescript
// Nenhuma configuração de CORS!
```
**Risco**: Requisições cross-origin podem ser bloqueadas  
**Solução**: Adicionar `express-cors` com whitelist de domínios

---

### 10. **LSP Error em Admin.tsx (MÉDIO)**
**Arquivo**: `client/src/pages/Admin.tsx`  
**Problema**: Erro de compilação TypeScript detectado
**Risco**: Código pode não compilar corretamente  
**Solução**: Verificar o arquivo para corrigir tipos

---

## 📊 Resumo

| Severidade | Quantidade | Status |
|-----------|-----------|--------|
| 🔴 Crítico | 4 | ⚠️ Precisa Arrumar |
| 🟠 Alto | 4 | ⚠️ Precisa Arrumar |
| 🟡 Médio | 2 | ⚠️ Precisa Arrumar |
| **TOTAL** | **10** | **❌ Falhou** |

---

## ✅ O que Está Bom

✅ Validação de dados com Zod  
✅ Express Session configurado  
✅ PostgreSQL com Drizzle ORM  
✅ Autenticação de cliente funcionando  
✅ WhatsApp Twilio integrado  

---

## 🚨 Recomendação

**ANTES DE PUBLICAR**: Arrumar todos os problemas **críticos** e **altos**.  
Os problemas de nível **médio** devem ser tratados no próximo release.

---

*Relatório gerado pelo Sistema de Auditoria de Segurança*
