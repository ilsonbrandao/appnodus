import Link from 'next/link';
import { QuizForm } from '@/components/home/QuizForm';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/home/Header';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { Footer } from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-medium uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Novo: Integração com Gemini 1.5 Pro
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl xl:text-7xl">
                Vendas Inteligentes <br />
                <span className="text-indigo-600 dark:text-indigo-500">Impulsionadas por IA</span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Qualifique leads automaticamente, agende conteúdos sociais e feche mais negócios com a plataforma #1 para agências e consultores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white shadow-xl hover:shadow-2xl transition-all">
                    Acessar Dashboard
                    <LayoutDashboard className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                    Conhecer Soluções
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  <span>Setup Grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  <span>Sem Cartão de Crédito</span>
                </div>
              </div>
            </div>

            {/* Right Content: Quiz Card */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 transform rotate-2 rounded-2xl opacity-10 blur-lg -z-10" />
              <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-1">
                <QuizForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <FeaturesSection />

      <Footer />
      <Toaster />
    </div>
  )
}
