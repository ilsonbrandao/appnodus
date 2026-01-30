import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="md:w-1/3 mb-8 md:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm4 3h8v2H8V9zm0 4h8v2H8v-2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                                App Mídia
                            </span>
                        </div>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
                            A plataforma completa para gerenciar suas redes sociais e converter mais leads.
                        </p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        &copy; {new Date().getFullYear()} App Mídia Inc. Todos os direitos reservados.
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
