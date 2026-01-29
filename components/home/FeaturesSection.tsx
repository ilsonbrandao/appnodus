import { Zap, Bot, BarChart3, Share2 } from 'lucide-react';

const features = [
    {
        name: 'Qualificação via IA',
        description: 'Nossa IA analisa cada resposta do lead, atribui um score e sugere a melhor abordagem de venda.',
        icon: <Bot className="size-6 text-white" />,
        color: 'bg-blue-500'
    },
    {
        name: 'Pipeline Kanban',
        description: 'Visualize seu funil de vendas com clareza. Arraste e solte leads entre etapas com facilidade.',
        icon: <BarChart3 className="size-6 text-white" />,
        color: 'bg-indigo-500'
    },
    {
        name: 'Social Scheduler',
        description: 'Agende posts para Instagram e LinkedIn. Mantenha sua presença digital ativa sem esforço.',
        icon: <Share2 className="size-6 text-white" />,
        color: 'bg-pink-500'
    },
    {
        name: 'Automação Rápida',
        description: 'Conecte formulários e receba notificações instantâneas sobre oportunidades quentes.',
        icon: <Zap className="size-6 text-white" />,
        color: 'bg-orange-500'
    },
];

export function FeaturesSection() {
    return (
        <div id="features" className="py-24 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Tudo que você precisa para escalar
                    </h2>
                    <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
                        O AppNodus combina inteligência artificial com ferramentas de gestão essenciais para transformar leads em clientes fiéis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl transition-all hover:shadow-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800">
                            <div className={`size-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-md`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                {feature.name}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
