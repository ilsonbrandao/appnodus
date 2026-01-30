
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950 font-sans">
            <Header />
            <main className="flex-1 container max-w-3xl mx-auto px-4 py-24 md:py-32">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Termos de Uso</h1>
                <div className="prose dark:prose-invert">
                    <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                    <p>
                        Bem-vindo ao AppNodus. Ao acessar nosso site ou utilizar nossos serviços, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.
                    </p>
                    <h3>1. Uso da Licença</h3>
                    <p>
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site AppNodus, apenas para visualização transitória pessoal e não comercial.
                    </p>
                    <h3>2. Isenção de responsabilidade</h3>
                    <p>
                        Os materiais no site da AppNodus são fornecidos 'como estão'. AppNodus não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual.
                    </p>
                    <h3>3. Limitações</h3>
                    <p>
                        Em nenhum caso o AppNodus ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em AppNodus.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
