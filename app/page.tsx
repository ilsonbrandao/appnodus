import Link from 'next/link';
import { QuizForm } from '@/components/home/QuizForm';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/home/Header';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { Footer } from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-50 selection:bg-neutral-900 selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-neutral-100 dark:border-neutral-900">

        {/* Background Grid Pattern - Subtle & Technical */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-white/80 dark:to-neutral-950/80"></div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">

              {/* Badge - Minimalist */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-600 dark:text-neutral-400 text-xs font-medium transition-colors hover:border-neutral-300 dark:hover:border-neutral-700 cursor-default">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>Integração Gemini 1.5 Pro disponível</span>
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tighter text-neutral-900 dark:text-white leading-[1.1]">
                Transforme leads em <br className="hidden md:block" />
                <span className="text-neutral-400 dark:text-neutral-600">clientes reais.</span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
                A plataforma tudo-em-um para qualificar leads, agendar posts e fechar vendas. Sem complexidade.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 px-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium shadow-sm transition-transform active:scale-95 w-full sm:w-auto">
                    Acessar Dashboard
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-12 px-8 rounded-lg border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 font-medium w-full sm:w-auto">
                    Como funciona
                  </Button>
                </Link>
              </div>

              <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600 dark:text-emerald-500" />
                  <span>Setup instantâneo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600 dark:text-emerald-500" />
                  <span>Teste grátis de 14 dias</span>
                </div>
              </div>
            </div>

            {/* Right Content: Clean Quiz Card */}
            <div className="flex-1 w-full max-w-md lg:max-w-full">
              <div className="relative group">
                {/* Shadow refinado */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-neutral-950 ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-neutral-50/50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800 p-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="size-3 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                      <div className="size-3 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                      <div className="size-3 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                    </div>
                    <div className="mx-auto text-[10px] font-mono text-neutral-400 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-800">
                      appnodus.com/quiz
                    </div>
                  </div>
                  <div className="p-1">
                    <QuizForm />
                  </div>
                </div>
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
