import Link from 'next/link';
import { FileText, LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-400 dark:to-white bg-clip-text text-transparent pb-2">
            AppNodus
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Plataforma de Inteligência em Vendas e Automação de Social Media alimentada pelo Gemini 3.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
          <Link
            href="/dashboard"
            className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md"
          >
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <LayoutDashboard className="size-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold">Dashboard Admin</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Gerencie leads e posts</p>
          </Link>

          <Link
            href="/dashboard/leads"
            className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-sm hover:shadow-md"
          >
            <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <FileText className="size-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold">Quiz Leads</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Ver pipeline de qualificação</p>
          </Link>
        </div>
      </div>

      <footer className="fixed bottom-8 text-sm text-neutral-400">
        AppNodus System v0.1.0 • Next.js 16 • Gemini AI
      </footer>
    </div>
  )
}
