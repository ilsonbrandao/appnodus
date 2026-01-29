import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md border-b border-transparent dark:border-neutral-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                            N
                        </div>
                        <span className="text-xl font-bold text-neutral-900 dark:text-white">AppNodus</span>
                    </div>

                    <nav className="hidden md:flex gap-8">
                        <Link href="#features" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                            Funcionalidades
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                            Planos
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-neutral-600 dark:text-neutral-400">
                                Entrar
                            </Button>
                        </Link>
                        <Link href="/login?tab=register">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Começar Grátis
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
