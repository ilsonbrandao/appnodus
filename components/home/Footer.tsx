import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="md:w-1/3 mb-8 md:mb-0">
                        <Link href="/" className="mb-4 block">
                            <Image
                                src="/logo.png"
                                alt="App Mídia"
                                width={180}
                                height={60}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
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
