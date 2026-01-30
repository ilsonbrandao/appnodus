import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
    {
        name: "Starter",
        price: "Grátis",
        description: "Perfeito para começar a organizar seus leads.",
        features: [
            "Até 50 Leads/mês",
            "Quiz de Qualificação Básico",
            "1 Usuário",
            "Kanban Simples"
        ],
        cta: "Começar Grátis",
        href: "/login?tab=register",
        featured: false
    },
    {
        name: "Pro",
        price: "R$ 97",
        period: "/ mês",
        description: "Para profissionais que precisam escalar.",
        features: [
            "Leads Ilimitados",
            "IA Avançada (Gemini 1.5)",
            "Agendamento de Posts",
            "Analytics Completo",
            "Prioridade no Suporte"
        ],
        cta: "Assinar Pro",
        href: "/login?tab=register&plan=pro",
        featured: true
    },
    {
        name: "Agency",
        price: "Sob Consulta",
        description: "Para agências com múltiplos clientes.",
        features: [
            "Múltiplos Workspaces",
            "Whitelabel (Sua Marca)",
            "API de Integração",
            "Gerente de Contas Dedicado"
        ],
        cta: "Falar com Vendas",
        href: "https://wa.me/5511999999999", // Placeholder
        featured: false
    }
];

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200/50 dark:border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-4">
                        Preços simples. <span className="text-neutral-400">Sem surpresas.</span>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Comece gratuitamente e faça upgrade conforme seu negócio cresce.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${tier.featured
                                    ? "bg-white dark:bg-neutral-900 shadow-2xl ring-1 ring-indigo-500/20 scale-105 z-10"
                                    : "bg-white dark:bg-neutral-900/50 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                                }`}
                        >
                            {tier.featured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-lg">
                                    Mais Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                        {tier.price}
                                    </span>
                                    {tier.period && (
                                        <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                                            {tier.period}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{tier.description}</p>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className={`size-5 shrink-0 ${tier.featured ? 'text-indigo-600' : 'text-neutral-500'}`} />
                                        <span className="text-sm text-neutral-600 dark:text-neutral-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={tier.href} className="mt-auto">
                                <Button
                                    className={`w-full h-11 rounded-lg font-medium ${tier.featured
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                                            : 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200'
                                        }`}
                                >
                                    {tier.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
