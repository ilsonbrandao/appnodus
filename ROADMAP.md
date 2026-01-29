# Roadmap AppNodus

## Fase 1: Fundação e Configuração (Done)
- [x] Inicializar Next.js 16 + React 19 + TypeScript.
- [x] Configurar TailwindCSS 4.
- [x] Instalar dependências da Stack (Supabase, Drizzle, Gemini, Shadcn, etc).
- [x] Configurar variáveis de ambiente (.env).
- [x] Configurar repositório Git/GitHub.

## Fase 2: Banco de Dados e Auth
- [x] Configurar esquema do Drizzle (`/lib/db/schema.ts`).
- [x] Criar tabelas: leads, posts, social_accounts, profiles.
- [ ] Configurar cliente Supabase Auth Client (Frontend).
- [x] Rodar migrações iniciais.

## Fase 3: Inteligência Artificial (Gemini)
- [x] Configurar SDK Google Generative AI (`/lib/ai`).
- [x] Implementar Server Action `submitQuiz`.
- [x] Criar prompt de qualificação de leads.

## Fase 4: Frontend Core e Design (EM ANDAMENTO)
- [x] Configurar Shadcn/ui (New York / Neutral).
- [ ] Criar componentes base (Button, Card, Input, Label, Textarea).
- [ ] Implementar Formulário de Quiz (Client Component).
- [ ] Melhorar Landing Page.


## Fase 5: Funcionalidades Específicas
- [ ] Kanban de Leads (@dnd-kit).
- [ ] Agendamento de Posts (Social Media).
- [ ] Autenticação e Proteção de Rotas.

## Fase 6: Polimento e Deploy
- [ ] Otimização de SEO e Metadata.
- [ ] Testes E2E básicos.
- [ ] Deploy na Vercel (ou similar).
