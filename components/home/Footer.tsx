import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <div className="flex size-6 items-center justify-center rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs">
                            N
                        </div>
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">AppNodus</span>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        &copy; {new Date().getFullYear()} AppNodus Inc. Todos os direitos reservados.
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/terms" className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Termos</Link>
                        <Link href="/privacy" className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Privacidade</Link>
                        <Link href="/contact" className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Contato</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
