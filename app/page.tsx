import Link from 'next/link';
import { FileText, LayoutDashboard } from 'lucide-react';
import { QuizForm } from '@/components/home/QuizForm';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left Column: Hero Text */}
        <div className="space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-400 dark:to-white bg-clip-text text-transparent pb-2">
              AppNodus
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Plataforma de Inteligência em Vendas e Automação de Social Media alimentada pelo Gemini 3.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg"
            >
              <LayoutDashboard className="size-5" />
              <span>Acessar Dashboard</span>
            </Link>
            <Link
              href="/dashboard/leads"
              className="flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
            >
              <FileText className="size-5" />
              <span>Ver Leads</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Quiz Form */}
        <div className="w-full">
          <QuizForm />
        </div>
      </div>

      <footer className="fixed bottom-4 text-xs text-neutral-400 text-center w-full">
        AppNodus System v0.1.0 • Next.js 16 • Gemini AI
      </footer>
      <Toaster />
    </div>
  )
}
