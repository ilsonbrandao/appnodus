import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProfileSettingsForm } from '@/components/dashboard/ProfileSettingsForm';
import { DeleteAccountSection } from '@/components/dashboard/DeleteAccountSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, ShieldAlert } from 'lucide-react';

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Obter dados do perfil
    let userProfile = null;
    if (user) {
        userProfile = await db.query.profiles.findFirst({
            where: eq(profiles.id, user.id)
        });
    }

    const email = user?.email || '';
    const name = userProfile?.fullName || '';

    return (
        <div className="space-y-6 max-w-5xl mx-auto w-full pb-10">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Configurações</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">Gerencie sua conta e preferências.</p>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="general" className="w-full space-y-6">
                <div className="overflow-x-auto pb-2">
                    <TabsList className="bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg inline-flex min-w-full sm:min-w-fit">
                        <TabsTrigger value="general" className="gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm">
                            <User className="size-4" />
                            <span>Geral</span>
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm">
                            <CreditCard className="size-4" />
                            <span>Planos e Cobrança</span>
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="gap-2 px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm">
                            <ShieldAlert className="size-4" />
                            <span>Avançado</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-300 slide-in-from-left-2">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium">Informações Pessoais</h3>
                            <p className="text-sm text-neutral-500">Atualize seus dados de identificação.</p>
                        </div>
                        <div className="md:col-span-2 lg:col-span-1">
                            <ProfileSettingsForm initialName={name} email={email} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6 animate-in fade-in-50 duration-300 slide-in-from-left-2">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium">Assinatura</h3>
                            <p className="text-sm text-neutral-500">Gerencie seu plano e método de pagamento.</p>
                        </div>
                        <div className="md:col-span-2 lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Plano Atual</CardTitle>
                                    <CardDescription>Detalhes da sua subscrição ativa.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-indigo-700 dark:text-indigo-300 text-lg">Plano Starter</p>
                                                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Ativo</span>
                                            </div>
                                            <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80 max-w-[260px]">
                                                Acesso ilimitado ao Quiz e 50 posts/mês gerados por IA.
                                            </p>
                                        </div>
                                        <Link href="/dashboard/settings/upgrade">
                                            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:scale-[1.02]">
                                                Fazer Upgrade
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="mt-6 text-xs text-neutral-400 flex items-center gap-2">
                                        <CreditCard className="size-3" />
                                        <span>Próxima cobrança em: 28/02/2026</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6 animate-in fade-in-50 duration-300 slide-in-from-left-2">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Zona de Perigo</h3>
                            <p className="text-sm text-neutral-500">Ações que afetam permanentemente sua conta.</p>
                        </div>
                        <div className="md:col-span-2 lg:col-span-1">
                            <DeleteAccountSection />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
