'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
    fullName: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    companyName: z.string().optional(),
    role: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This would normally be fetched from the DB
const defaultValues: Partial<ProfileFormValues> = {
    fullName: "",
    email: "",
    companyName: "",
    role: "",
};

export default function SettingsPage() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    function onSubmit(data: ProfileFormValues) {
        toast.success("Perfil atualizado com sucesso!");
        console.log(data);
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Configurações</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Gerencie suas preferências de conta e notificações.
                </p>
            </div>
            <Separator className="my-6" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        <Button variant="secondary" className="justify-start">Perfil</Button>
                        <Button variant="ghost" className="justify-start text-neutral-500">Integrações</Button>
                        <Button variant="ghost" className="justify-start text-neutral-500">Cobrança</Button>
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Perfil do Usuário</CardTitle>
                            <CardDescription>
                                Atualize suas informações pessoais visíveis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nome Completo</Label>
                                    <Input id="fullName" placeholder="Seu nome" {...form.register("fullName")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" disabled placeholder="seu@email.com" {...form.register("email")} />
                                    <p className="text-[0.8rem] text-neutral-500">O email não pode ser alterado.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Empresa</Label>
                                        <Input id="company" placeholder="Sua empresa" {...form.register("companyName")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Cargo</Label>
                                        <Input id="role" placeholder="Seu cargo" {...form.register("role")} />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" form="profile-form">Salvar Alterações</Button>
                        </CardFooter>
                    </Card>

                    <Card className="mt-6 border-red-200 dark:border-red-900/20">
                        <CardHeader>
                            <CardTitle className="text-red-600 dark:text-red-500">Zona de Perigo</CardTitle>
                            <CardDescription>
                                Ações irreversíveis para sua conta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" className="w-full sm:w-auto">Excluir Conta</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
