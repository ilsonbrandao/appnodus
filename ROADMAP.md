# Roadmap AppNodus

## Fase 1: Fundação e Configuração (Done)
- [x] Inicializar Next.js 16 + React 19 + TypeScript.
- [x] Configurar TailwindCSS 4.
- [ ] Instalar dependências da Stack (Supabase, Drizzle, Gemini, Shadcn, etc).
- [ ] Configurar variáveis de ambiente (.env).

## Fase 2: Banco de Dados e Auth
- [ ] Configurar esquema do Drizzle (`/lib/db/schema.ts`).
- [ ] Criar tabelas: leads, posts, social_accounts, profiles.
- [ ] Configurar cliente Supabase (`/lib/supabase`).
- [ ] Rodar migrações iniciais.

## Fase 3: Inteligência Artificial (Gemini)
- [ ] Configurar SDK Google Generative AI (`/lib/ai`).
- [ ] Implementar Server Action `submitQuiz`.
- [ ] Criar prompt de qualificação de leads.

## Fase 4: Frontend Core e Design
- [ ] Configurar Shadcn/ui (New York / Neutral).
- [ ] Criar componentes base (Button, Card, Input, etc).
- [ ] Implementar Landing Page com Quiz.
- [ ] Implementar Dashboard Admin (Layout, Sidebar).

## Fase 5: Funcionalidades Específicas
- [ ] Kanban de Leads (@dnd-kit).
- [ ] Agendamento de Posts (Social Media).
- [ ] Autenticação e Proteção de Rotas.

## Fase 6: Polimento e Deploy
- [ ] Otimização de SEO e Metadata.
- [ ] Testes E2E básicos.
- [ ] Deploy na Vercel (ou similar).
