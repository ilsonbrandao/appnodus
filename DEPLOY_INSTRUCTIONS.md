# 🚀 AppNodus - Deploy via Vercel CLI

Como não tenho acesso às suas credenciais de conta Vercel, preparei tudo para você rodar o comando final.

O código já foi validado e compilado com sucesso (`npm run build` ✅).

## Opção 1: Deploy Automático via CLI (Recomendado)

Abra seu terminal na pasta do projeto e rode:

```powershell
npx vercel login
# Siga as instruções no navegador para logar

npx vercel
# Responda 'y' para Setup and Deploy
# Aceite os defaults (Enter, Enter, Enter...)
```

**Para publicar em Produção (Domínio final):**
```powershell
npx vercel --prod
```

## Opção 2: Deploy via GitHub (CI/CD)

1. Faça push do código para seu repositório GitHub:
   ```bash
   git add .
   git commit -m "feat: IA activation and UI polish"
   git push origin main
   ```
2. Vá no [Vercel Dashboard](https://vercel.com/new).
3. Importe o repositório `appnodus`.
4. Configure as variáveis de ambiente (`GEMINI_API_KEY`, etc).
5. Clique em Deploy.

## ⚠️ Variáveis de Ambiente Necessárias

Não esqueça de configurar estas variáveis no painel da Vercel (aba Settings > Environment Variables):

- `GEMINI_API_KEY`: (Sua chave do Google AI Studio)
- `NEXT_PUBLIC_SUPABASE_URL`: (URL do seu projeto Supabase)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Chave pública do Supabase)
- `DATABASE_URL`: (URL de conexão Pooler/Session do Supabase, porta 6543 ou 5432)

---
*Pronto! Seu SaaS estará no ar em minutos.*
