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
import { Loader2 } from 'lucide-react';

const quizSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    company: z.string().min(2, 'Empresa é obrigatória'),
    role: z.string().min(2, 'Cargo é obrigatório'),
    challenge: z.string().min(10, 'Descreva seu desafio com mais detalhes'),
    budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export function QuizForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<QuizFormValues>({
        resolver: zodResolver(quizSchema),
    });

    const onSubmit = async (data: QuizFormValues) => {
        setIsSubmitting(true);
        try {
            // Envio para Server Action
            const result = await submitQuiz({
                name: data.name,
                email: data.email,
                company: data.company,
                role: data.role,
                answers: {
                    challenge: data.challenge,
                    budget: data.budget
                }
            });

            if (result.success) {
                setIsSuccess(true);
                toast.success("Quiz enviado com sucesso! Nossa IA está analisando seu perfil.");
                reset();
            } else {
                toast.error(`Erro: ${result.error}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro inesperado.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Card className="w-full max-w-lg mx-auto border-green-200 bg-green-50 dark:bg-green-900/10">
                <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-300">Recebemos suas respostas!</CardTitle>
                    <CardDescription className="text-green-700 dark:text-green-400">
                        Nossa inteligência artificial já categorizou seu perfil. Entraremos em contato em breve com uma estratégia personalizada.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full">
                        Enviar outro
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader>
                <CardTitle>Diagnóstico Gratuito de Vendas</CardTitle>
                <CardDescription>
                    Preencha o formulário abaixo para receber uma análise personalizada da nossa IA.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" placeholder="Seu nome" {...register('name')} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Cargo</Label>
                            <Input id="role" placeholder="Ex: CEO, Gerente" {...register('role')} />
                            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Corporativo</Label>
                        <Input id="email" type="email" placeholder="voce@empresa.com" {...register('email')} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input id="company" placeholder="Nome da sua empresa" {...register('company')} />
                        {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="budget">Orçamento Mensal para Marketing</Label>
                        <select
                            id="budget"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register('budget')}
                        >
                            <option value="">Selecione...</option>
                            <option value="< 5k">Menos de R$ 5k</option>
                            <option value="5k - 15k">R$ 5k - R$ 15k</option>
                            <option value="15k - 50k">R$ 15k - R$ 50k</option>
                            <option value="> 50k">Mais de R$ 50k</option>
                        </select>
                        {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="challenge">Principal Desafio Atual</Label>
                        <Textarea
                            id="challenge"
                            placeholder="Ex: Tenho muitos leads desqualificados..."
                            {...register('challenge')}
                        />
                        {errors.challenge && <p className="text-sm text-red-500">{errors.challenge.message}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando com IA...
                            </>
                        ) : (
                            'Solicitar Análise Gratuita'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
