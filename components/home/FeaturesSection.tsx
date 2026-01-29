import { Zap, Bot, BarChart3, Share2, Layers, LineChart } from 'lucide-react';

const features = [
    {
        name: 'Qualificação via IA',
        description: 'Análise automática de respostas com atribuição de score inteligente.',
        icon: <Bot className="size-5" />,
        span: 'md:col-span-2'
    },
    {
        name: 'Pipeline Visual',
        description: 'Gestão visual do funil.',
        icon: <BarChart3 className="size-5" />,
        span: 'md:col-span-1'
    },
    {
        name: 'Agendamento Social',
        description: 'Poste em múltiplas redes.',
        icon: <Share2 className="size-5" />,
        span: 'md:col-span-1'
    },
    {
        name: 'Notificações',
        description: 'Alertas em tempo real.',
        icon: <Zap className="size-5" />,
        span: 'md:col-span-1'
    },
    {
        name: 'Multi-Contas',
        description: 'Centralize sua gestão.',
        icon: <Layers className="size-5" />,
        span: 'md:col-span-1'
    },
    {
        name: 'Analytics Pro',
        description: 'Métricas detalhadas de conversão e engajamento para tomada de decisão baseada em dados.',
        icon: <LineChart className="size-5" />,
        span: 'md:col-span-2'
    }
];

export function FeaturesSection() {
    return (
        <div id="features" className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-4">
                        Ferramentas poderosas.<br />
                        <span className="text-neutral-400">Design invisível.</span>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
                        Uma suíte completa construída para performance e simplicidade, sem distrações.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {features.map((feature, i) => (
                        <div
                            key={feature.name}
                            className={`group relative p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 ${feature.span}`}
                        >
                            <div className="size-10 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 text-neutral-900 dark:text-white shadow-sm">
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
