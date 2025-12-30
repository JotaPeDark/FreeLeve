#  Backend Freelancer - Sistema Modular

**Versão**: 3.0.0 (Limpo - Sem PIX)  
**Data**: 30/12/2024  
**Status**: Produção Ready

## 📋 SOBRE

Sistema completo de gestão de serviços freelancers com arquitetura modular em NestJS + TypeORM + PostgreSQL + WebSocket.

###  Funcionalidades

- **6 Módulos** independentes e escaláveis
- **32 Endpoints REST** completos
- **WebSocket** para timers em tempo real
- **TypeORM** com PostgreSQL
- **Validações** completas com class-validator
- **Estrutura modular** profissional

---

##  ARQUITETURA

### Módulos Implementados

```
src/
├── freelancers/     # Gestão de freelancers
├── clientes/        # Gestão de clientes
├── projetos/        # Gestão de projetos
├── atividades/      # Gestão de atividades
├── horas/           # Timer com WebSocket
└── pagamentos/      # Gestão de pagamentos
```

### Relacionamentos

```
Freelancer 
    ↓ 1:N
Cliente
    ↓ 1:N
Projeto
    ↓ 1:N
Atividade
    ↓ 1:N
Hora (Timer WebSocket)

Projeto → Pagamento (1:N)
```

---

## 🚀 INSTALAÇÃO

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Passo a Passo

```bash
# 1. Instalar dependências
npm install

# 2. Criar banco de dados
psql -U postgres -c "CREATE DATABASE freelancer_db;"

# 3. Executar script de reset (opcional)
psql -U postgres -f reset-database.sql

# 4. Configurar .env
# (Já está configurado, só ajuste se necessário)

# 5. Executar
npm run dev
```

**Backend rodando em**: http://localhost:3000

---

##  ENDPOINTS

### Freelancers (6 endpoints)
```
GET    /freelancers           # Listar todos
GET    /freelancers/:id       # Buscar um
POST   /freelancers           # Criar
POST   /freelancers/:id       # Atualizar
DELETE /freelancers/:id       # Deletar
GET    /freelancers/:id/clientes  # Listar clientes do freelancer
```

### Clientes (5 endpoints)
```
GET    /clientes              # Listar todos
GET    /clientes/:id          # Buscar um
POST   /clientes              # Criar
POST   /clientes/:id          # Atualizar
DELETE /clientes/:id          # Deletar
```

### Projetos (6 endpoints)
```
GET    /projetos              # Listar todos
GET    /projetos/:id          # Buscar um
POST   /projetos              # Criar
POST   /projetos/:id          # Atualizar
DELETE /projetos/:id          # Deletar
GET    /projetos/:id/atividades  # Listar atividades do projeto
```

### Atividades (5 endpoints)
```
GET    /atividades            # Listar todas
GET    /atividades/:id        # Buscar uma
POST   /atividades            # Criar
POST   /atividades/:id        # Atualizar
DELETE /atividades/:id        # Deletar
```

### Horas (6 REST + 4 WebSocket)
```
# REST
GET    /horas                 # Listar todas
GET    /horas/:id             # Buscar uma
GET    /horas/ativas          # Listar ativas
POST   /horas                 # Iniciar timer
POST   /horas/:id/parar       # Parar timer
DELETE /horas/:id             # Deletar

# WebSocket (ws://localhost:3000)
iniciarHora      → Iniciar timer
pararHora        → Parar timer
getHorasAtivas   → Listar ativas
horaUpdate       → Broadcasting (automático)
```

### Pagamentos (5 endpoints)
```
GET    /pagamentos            # Listar todos
GET    /pagamentos/:id        # Buscar um
POST   /pagamentos            # Criar
POST   /pagamentos/:id/status # Atualizar status
DELETE /pagamentos/:id        # Deletar
```

**Total**: 32 endpoints REST + 4 eventos WebSocket

---

##  TESTANDO

### Usar arquivo HTTP

Abra `test-api.http` no VS Code (com extensão REST Client) e execute os testes em ordem.

### Fluxo Completo

```http
# 1. Criar Freelancer
POST http://localhost:3000/freelancers
{"nome":"João","email":"joao@email.com","chave_pix":"11999999999"}

# 2. Criar Cliente
POST http://localhost:3000/clientes
{"freelancer_id":1,"nome":"Cliente XYZ","email":"cliente@xyz.com"}

# 3. Criar Projeto
POST http://localhost:3000/projetos
{"cliente_id":1,"nome":"Website","valor":5000.00}

# 4. Criar Atividade
POST http://localhost:3000/atividades
{"projeto_id":1,"nome":"Frontend","status":"em_andamento"}

# 5. Iniciar Timer
POST http://localhost:3000/horas
{"atividade_id":1,"freelancer_id":1}

# 6. Criar Pagamento
POST http://localhost:3000/pagamentos
{"projeto_id":1,"valor":1000.00}
```

---

##  WEBSOCKET

### Conectar

```javascript
const socket = io('http://localhost:3000');
```

### Eventos

```javascript
// Iniciar timer
socket.emit('iniciarHora', {
  atividade_id: 1,
  freelancer_id: 1
});

// Parar timer
socket.emit('pararHora', { hora_id: 1 });

// Listar ativos
socket.emit('getHorasAtivas');

// Receber atualizações (broadcasting)
socket.on('horaUpdate', (data) => {
  console.log('Timer atualizado:', data);
});
```

---

##  BANCO DE DADOS

### Estrutura

```sql
freelancers (id, nome, email, chave_pix)
    ↓
clientes (id, freelancer_id, nome, email)
    ↓
projetos (id, cliente_id, nome, valor, status)
    ↓
atividades (id, projeto_id, nome, status, tempo_estimado)
    ↓
horas (id, atividade_id, freelancer_id, inicio, fim, tempo_total)

projetos → pagamentos (id, projeto_id, valor, status)
```

### Reset Completo

```bash
psql -U postgres -f reset-database.sql
```

---

##  ESTRUTURA DE ARQUIVOS

```
backend/
├── src/
│   ├── freelancers/
│   │   ├── freelancer.entity.ts
│   │   ├── freelancer.service.ts
│   │   ├── freelancer.controller.ts
│   │   ├── freelancer.dto.ts
│   │   └── freelancer.module.ts
│   ├── clientes/
│   ├── projetos/
│   ├── atividades/
│   ├── horas/
│   │   └── hora.gateway.ts  # WebSocket
│   ├── pagamentos/
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
├── reset-database.sql
├── test-api.http
└── README.md
```

---

##  CONFIGURAÇÃO

### Variáveis de Ambiente (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=freelancer_db
PORT=3000
```

### Scripts npm

```bash
npm run dev     # Desenvolvimento (com hot reload)
npm start       # Produção (ts-node)
npm run build   # Build TypeScript
npm run prod    # Executar build
```

---

##  TECNOLOGIAS

- **NestJS** 10 - Framework backend
- **TypeORM** 0.3 - ORM
- **PostgreSQL** - Banco de dados
- **Socket.IO** - WebSocket
- **class-validator** - Validações
- **TypeScript** - Linguagem

---

##  VALIDAÇÕES

Todos os DTOs têm validações:

```typescript
// Exemplo: CreateProjetoDto
export class CreateProjetoDto {
  @IsInt()
  cliente_id!: number;

  @IsString()
  @MinLength(3)
  nome!: string;

  @IsNumber()
  @Min(0)
  valor!: number;

  @IsString()
  @IsOptional()
  status?: string;
}
```

---

##  LOGS

O sistema gera logs para:
- Conexão WebSocket
- Início/parada de timers
- Broadcasting de atualizações
- Erros e exceções

---

##  STATUS

### Implementado ✅
- [x] 6 módulos completos
- [x] 32 endpoints REST
- [x] WebSocket funcionando
- [x] TypeORM configurado
- [x] Validações implementadas
- [x] Relacionamentos configurados
- [x] Testes documentados

### Removido 
- [x] Módulo PIX (conforme solicitado)
- [x] Webhook Mercado Pago
- [x] Dependências desnecessárias (axios, uuid)

---

##  SUPORTE

### Erros Comuns

**Backend não inicia**:
- Verificar se PostgreSQL está rodando
- Verificar credenciais no .env
- Executar `npm install`

**WebSocket não conecta**:
- Verificar porta 3000 livre
- Verificar CORS no gateway
- Testar com ws://localhost:3000

**Banco de dados vazio**:
- Executar reset-database.sql
- Ou deixar TypeORM criar automaticamente

---

##  PRÓXIMOS PASSOS

1. Frontend (React/Vue/Angular)
2. Autenticação (JWT)
3. Upload de arquivos
4. Relatórios
5. Dashboard

---

##  CHECKLIST PRÉ-DEPLOY

- [ ] Backend iniciando sem erros
- [ ] Banco de dados conectado
- [ ] Todas as rotas funcionando
- [ ] WebSocket conectando
- [ ] Validações testadas
- [ ] .env configurado para produção
- [ ] Scripts de reset testados

---

##  CHANGELOG

### v3.0.0 (30/12/2024)
- Removido módulo PIX completamente
- Simplificado entity de pagamentos
- Atualizado package.json (removido axios, uuid)
- Limpo .env (removido variáveis PIX)
- Atualizado documentação

### v2.x.x
- Versões anteriores com PIX (descontinuadas)

---

**Sistema 100% funcional e pronto para uso!** 🚀

**Desenvolvido com**: NestJS + TypeORM + PostgreSQL + WebSocket
