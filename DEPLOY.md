# Guia de Deploy - AppNodus na Vercel

Este guia te ajudará a colocar o AppNodus no ar usando a Vercel, a melhor plataforma para Next.js.

## Pré-requisitos
1.  Ter uma conta na [Vercel](https://vercel.com).
2.  Ter o código atualizado no GitHub (Já fizemos isso!).

## Passo a Passo

### 1. Importar Projeto
1.  Acesse o [Dashboard da Vercel](https://vercel.com/dashboard).
2.  Clique em **"Add New..."** e selecione **"Project"**.
3.  Na lista "Import Git Repository", procure por `appnodus` e clique em **"Import"**.

### 2. Configurar Variáveis de Ambiente
Na tela de configuração do projeto ("Configure Project"), localize a seção **"Environment Variables"**.
Você precisa adicionar as seguintes variáveis (copie os valores do seu arquivo local `.env`):

| Key | Value (Exemplo/Descrição) |
| :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.[sua-ref]:[senha]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true` (Use a versão Transaction Pooler da Supabase) |
| `GEMINI_API_KEY` | `AIzaSy...` (Sua chave da API do Google AI) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[sua-ref].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5c...` |

> **Importante:** certifique-se de usar a `DATABASE_URL` correta do Supabase (Transaction Pooler - Porta 6543) para evitar problemas de conexão em ambiente Serverless.

### 3. Deploy
1.  Após adicionar as variáveis, clique no botão azul **"Deploy"**.
2.  Aguarde alguns minutos. A Vercel vai instalar as dependências, rodar o build e publicar seu site.
3.  Se tudo der certo, você verá uma tela de confetes e o link do seu projeto (ex: `appnodus.vercel.app`).

## Solução de Problemas Comuns

*   **Erro de Build:** Se o build falhar, verifique os "Logs". Geralmente é alguma variável de ambiente faltando ou erro de tipo (mas já validamos os tipos localmente!).
*   **Erro 500 no Site:** Se o site abrir mas der erro ao enviar o Quiz ou fazer Login, verifique se a `DATABASE_URL` está correta e se o IP da Vercel não está bloqueado no Supabase (no Supabase, vá em Network Restrictions e garanta que "Allow all" esteja ativo ou configurado para a Vercel).

---
**Parabéns! Seu SaaS está online! 🚀**
