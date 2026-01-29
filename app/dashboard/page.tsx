import { db } from '@/lib/db';
import { leads, posts } from '@/lib/db/schema';
import { createClient } from '@/utils/supabase/server';
import { desc, count } from 'drizzle-orm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Share2, BarChart } from 'lucide-react';

export default async function DashboardPage() {
    const supabase = await createClient(); // Await the createClient call
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch basic stats
    // Note: In a real app we would filter by user_id if data is private
    const allLeads = await db.select().from(leads);
    const allPosts = await db.select().from(posts);

    const leadsCount = allLeads.length;
    const postsCount = allPosts.length;
    // Calculate hot leads (Quente + Ultra Quente)
    const hotLeadsCount = allLeads.filter(l =>
        (l.category === 'Quente' || l.category === 'Ultra Quente')
    ).length;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Dashboard</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Visão geral do seu negócio e performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                        <Users className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leadsCount}</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            +20.1% em relação ao mês anterior
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Quentes</CardTitle>
                        <BarChart className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{hotLeadsCount}</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Oportunidades de alto potencial
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Posts Agendados</CardTitle>
                        <Share2 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{postsCount}</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Conteúdos prontos para sair
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Visão Geral</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
                            Gráfico de Leads (Em Breve)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Atividade Recente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {allLeads.slice(0, 5).map((lead, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{lead.name}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            {lead.email}
                                        </p>
                                    </div>
                                    <div className={`ml-auto font-medium text-xs px-2 py-1 rounded-full ${lead.category === 'Ultra Quente' ? 'bg-red-100 text-red-700' :
                                        lead.category === 'Quente' ? 'bg-orange-100 text-orange-700' :
                                            'bg-neutral-100 text-neutral-700'
                                        }`}>
                                        {lead.category || 'Novo'}
                                    </div>
                                </div>
                            ))}
                            {allLeads.length === 0 && (
                                <p className="text-sm text-neutral-500">Nenhuma atividade recente.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
