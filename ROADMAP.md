# Roadmap AppNodus

## Fase 1: Fundação e Configuração (Done)
- [x] Inicializar Next.js 16 + React 19 + TypeScript.
- [x] Configurar TailwindCSS 4.
- [x] Instalar dependências da Stack (Supabase, Drizzle, Gemini, Shadcn, etc).
- [x] Configurar variáveis de ambiente (.env).
- [x] Configurar repositório Git/GitHub.

## Fase 2: Banco de Dados e Auth (Done)
- [x] Configurar esquema do Drizzle (`/lib/db/schema.ts`).
- [x] Criar tabelas: leads, posts, social_accounts, profiles.
- [x] Configurar cliente Supabase Auth Client (Frontend).
- [x] Rodar migrações iniciais.

## Fase 3: Inteligência Artificial (Gemini) (Done)
- [x] Configurar SDK Google Generative AI (`/lib/ai`).
- [x] Implementar Conexão Direta REST API (Bypass de SDK).
- [x] Implementar Server Action `submitQuiz`.
- [x] Criar prompt de qualificação de leads.
- [x] Criar prompt de geração de posts (Social Media).

## Fase 4: Frontend Core e Design (Done)
- [x] Configurar Shadcn/ui (New York / Neutral).
- [x] Criar componentes base (Button, Card, Input, Label, Textarea).
- [x] Implementar Formulário de Quiz Interativo (Landing Page).
- [x] Melhorar Design da Landing Page (Glassmorphism e Typography).

## Fase 5: Funcionalidades Específicas (Done)
- [x] Dashboard Analítico (Gráficos e Stats).
- [x] Kanban de Leads com Drag & Drop (Persistência no DB).
- [x] Agendamento de Posts com Geração por IA.
- [x] Exportação de CSV.
- [x] Botão WhatsApp integrado.
- [x] Autenticação e Proteção de Rotas (Base implementada, modo Demo ativo).

## Fase 6: Polimento e Deploy (Próximo Passo)
- [ ] Otimização de SEO e Metadata (Título, Descrição, OpenGraph).
- [ ] Testes E2E básicos.
- [ ] Deploy na Vercel (Publicar o projeto).
