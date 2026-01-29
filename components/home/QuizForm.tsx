'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { submitQuiz } from '@/actions/leads';
import { Loader2, ArrowRight, Check, Briefcase, User, TrendingUp, Instagram, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Esquema de Validação (Zod) ---
const quizSchema = z.object({
    // Passo 1: Identificação
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    instagram: z.string().min(2, 'Instagram é obrigatório (@usuario)'),
    website: z.string().optional(),

    // Passo 2: Contexto de Negócio
    company: z.string().min(2, 'Empresa é obrigatória'),
    role: z.string().min(2, 'Cargo é obrigatório'),
    segment: z.string().min(1, 'Selecione um segmento'),

    // Passo 3: Desafio e Orçamento
    budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
    challenge: z.string().min(10, 'Descreva seu desafio com mais detalhes (mín. 10 caracteres)'),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export function QuizForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset
    } = useForm<QuizFormValues>({
        resolver: zodResolver(quizSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: QuizFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await submitQuiz({
                name: data.name,
                email: data.email,
                company: data.company,
                role: data.role,
                instagram: data.instagram,
                website: data.website || '',
                segment: data.segment,
                answers: {
                    challenge: data.challenge,
                    budget: data.budget
                }
            });

            if (result.success) {
                setIsSuccess(true);
                toast.success("Análise solicitada com sucesso!");
                reset();
            } else {
                toast.error(`Erro: ${result.error}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro inesperado ao enviar.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Função para validar campos antes de avançar
    const nextStep = async () => {
        let fieldsToValidate: (keyof QuizFormValues)[] = [];

        if (step === 1) {
            fieldsToValidate = ['name', 'email', 'instagram'];
        } else if (step === 2) {
            fieldsToValidate = ['company', 'role', 'segment'];
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setStep((prev) => prev + 1);
        }
    };

    if (isSuccess) {
        return (
            <Card className="w-full max-w-lg mx-auto border-green-200 bg-green-50 dark:bg-green-900/10 animate-in fade-in zoom-in duration-300">
                <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-center text-green-800 dark:text-green-300">Sucesso!</CardTitle>
                    <CardDescription className="text-center text-green-700 dark:text-green-400">
                        Nossa IA está analisando seu perfil no Instagram e seus dados.
                        <br />
                        Você receberá um relatório completo em breve.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="outline" onClick={() => { setIsSuccess(false); setStep(1); }} className="w-full">
                        Nova Análise
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-lg mx-auto shadow-xl border-t-4 border-t-indigo-500">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                        Diagnóstico Gratuito com IA
                    </span>
                    <span className="text-xs text-neutral-400">
                        Passo {step} de 3
                    </span>
                </div>

                {/* Barra de Progresso Simples */}
                <div className="w-full bg-neutral-100 h-2 rounded-full mb-4 overflow-hidden">
                    <div
                        className="bg-indigo-600 h-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <CardTitle className="text-2xl">
                    {step === 1 && "Vamos nos conhecer"}
                    {step === 2 && "Sobre seu Negócio"}
                    {step === 3 && "Seu Desafio e Metas"}
                </CardTitle>
                <CardDescription>
                    {step === 1 && "Preencha seus dados de contato para receber o relatório."}
                    {step === 2 && "Para entender melhor seu contexto de mercado."}
                    {step === 3 && "Conte o que está te impedindo de crescer hoje."}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* PASSO 1 - IDENTIFICAÇÃO */}
                    {step === 1 && (
                        <div className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                        <Input id="name" placeholder="Seu nome" className="pl-9" {...register('name')} />
                                    </div>
                                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Corporativo</Label>
                                    <Input id="email" type="email" placeholder="voce@empresa.com" {...register('email')} />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram Comercial</Label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                        <Input id="instagram" placeholder="@sua__empresa" className="pl-9" {...register('instagram')} />
                                    </div>
                                    <p className="text-xs text-neutral-500">Necessário para análise de presença digital.</p>
                                    {errors.instagram && <p className="text-sm text-red-500">{errors.instagram.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Site ou LinkedIn (Opcional)</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                        <Input id="website" placeholder="www.suaempresa.com" className="pl-9" {...register('website')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASSO 2 - CONTEXTO */}
                    {step === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="company">Nome da Empresa</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                    <Input id="company" placeholder="Empresa Ltda" className="pl-9" {...register('company')} />
                                </div>
                                {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Seu Cargo</Label>
                                <Input id="role" placeholder="Ex: CEO, Head de Vendas" {...register('role')} />
                                {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="segment">Segmento / Nicho</Label>
                                <select
                                    id="segment"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register('segment')}
                                >
                                    <option value="">Selecione o segmento...</option>
                                    <option value="Tecnologia / SaaS">Tecnologia / SaaS</option>
                                    <option value="Serviços B2B">Serviços B2B (Consultoria, Agência)</option>
                                    <option value="Varejo / E-commerce">Varejo / E-commerce</option>
                                    <option value="Infoproduto / Educação">Infoproduto / Educação</option>
                                    <option value="Imobiliário / Construção">Imobiliário / Construção</option>
                                    <option value="Saúde / Estética">Saúde / Estética</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                {errors.segment && <p className="text-sm text-red-500">{errors.segment.message}</p>}
                            </div>
                        </div>
                    )}

                    {/* PASSO 3 - DESAFIO */}
                    {step === 3 && (
                        <div className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="budget">Orçamento Mensal de Marketing</Label>
                                <select
                                    id="budget"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register('budget')}
                                >
                                    <option value="">Selecione a faixa...</option>
                                    <option value="Ainda não invisto">Ainda não invisto</option>
                                    <option value="< 5k / mês">Até R$ 5k / mês</option>
                                    <option value="5k - 15k / mês">R$ 5k - R$ 15k / mês</option>
                                    <option value="15k - 50k / mês">R$ 15k - R$ 50k / mês</option>
                                    <option value="> 50k / mês">Mais de R$ 50k / mês</option>
                                </select>
                                {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="challenge">Qual seu maior obstáculo para vender mais hoje?</Label>
                                <div className="relative">
                                    <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                    <Textarea
                                        id="challenge"
                                        placeholder="Ex: Tenho leads chegando, mas eles não compram. Ou não consigo escalar meus anúncios..."
                                        className="pl-9 min-h-[100px]"
                                        {...register('challenge')}
                                    />
                                </div>
                                {errors.challenge && <p className="text-sm text-red-500">{errors.challenge.message}</p>}
                            </div>
                        </div>
                    )}

                    {/* BOTÕES DE NAVEGAÇÃO */}
                    <div className="pt-4 flex justify-between gap-4">
                        {step > 1 && (
                            <Button type="button" variant="ghost" onClick={() => setStep(prev => prev - 1)}>
                                Voltar
                            </Button>
                        )}

                        {step < 3 ? (
                            <Button
                                type="button"
                                className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={nextStep}
                            >
                                Próximo <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className={cn("ml-auto bg-indigo-600 hover:bg-indigo-700 text-white w-full", step === 1 && "w-auto")}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analisando Perfil...
                                    </>
                                ) : (
                                    'Gerar Diagnóstico Gratuito'
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
