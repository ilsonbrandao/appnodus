import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function UpgradePage() {
    return (
        <div className="flex flex-col items-center py-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-4 max-w-2xl px-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
                    Escale seus resultados
                </h1>
                <p className="text-lg text-neutral-500 dark:text-neutral-400">
                    Escolha o plano perfeito para o tamanho do seu negócio. Cancele a qualquer momento.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 md:gap-4 lg:gap-8 max-w-7xl w-full px-4">
                {/* Free Plan */}
                <Card className="flex flex-col border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl">Gratuito</CardTitle>
                        <CardDescription>Para testar e começar.</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">R$ 0</span>
                            <span className="text-neutral-500">/mês</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                        <FeatureItem text="5 Leads por mês" />
                        <FeatureItem text="Quiz Básico" />
                        <FeatureItem text="Dashboard Limitado" />
                        <FeatureItem text="Sem IA Social Media" negative />
                        <FeatureItem text="Suporte Comunitário" />
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" disabled>Plano Atual</Button>
                        {/* Na lógica real, se ele fosse Starter, aqui seria um botão Downgrade */}
                    </CardFooter>
                </Card>

                {/* Starter Plan - Highlighted */}
                <Card className="flex flex-col border-indigo-600 shadow-xl relative scale-105 border-2 z-10">
                    <div className="absolute top-0 right-0 p-2">
                        <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            Mais Popular
                        </span>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-indigo-600">Starter</CardTitle>
                        <CardDescription>Para profissionais liberais.</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">R$ 49</span>
                            <span className="text-neutral-500">/mês</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                        <FeatureItem text="Leads Ilimitados" />
                        <FeatureItem text="Quiz Personalizável" />
                        <FeatureItem text="Dashboard Completo" />
                        <FeatureItem text="50 Posts IA / mês" />
                        <FeatureItem text="Suporte por Email" />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                            Selecionar Plano
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="flex flex-col border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl">Agency</CardTitle>
                        <CardDescription>Para agências e times.</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">R$ 199</span>
                            <span className="text-neutral-500">/mês</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                        <FeatureItem text="Tudo do Starter" />
                        <FeatureItem text="Múltiplos Usuários" />
                        <FeatureItem text="Posts IA Ilimitados" />
                        <FeatureItem text="Integração WhatsApp API" />
                        <FeatureItem text="Gerente de Conta" />
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Falar com Vendas</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="pt-8">
                <Link href="/dashboard/settings" className="text-sm text-neutral-500 hover:text-neutral-900 underline">
                    Voltar para Configurações
                </Link>
            </div>
        </div>
    );
}

function FeatureItem({ text, negative = false }: { text: string, negative?: boolean }) {
    return (
        <div className="flex items-center gap-2">
            {negative ? (
                <X className="size-4 text-neutral-300" />
            ) : (
                <Check className="size-4 text-green-500" />
            )}
            <span className={negative ? "text-neutral-400 line-through" : "text-neutral-600 dark:text-neutral-300"}>
                {text}
            </span>
        </div>
    );
}
