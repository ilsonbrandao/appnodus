
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950 font-sans">
            <Header />
            <main className="flex-1 container max-w-3xl mx-auto px-4 py-24 md:py-32">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Política de Privacidade</h1>
                <div className="prose dark:prose-invert">
                    <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                    <p>
                        A sua privacidade é importante para nós. É política do AppNodus respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site AppNodus, e outros sites que possuímos e operamos.
                    </p>
                    <h3>1. Coleta de Dados</h3>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>
                    <h3>2. Uso de Dados</h3>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>
                    <h3>3. Compartilhamento</h3>
                    <p>
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
