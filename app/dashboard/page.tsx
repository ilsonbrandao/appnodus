import { db } from '@/lib/db';
import { leads, posts, profiles } from '@/lib/db/schema';
import { createClient } from '@/utils/supabase/server';
import { desc, count, eq } from 'drizzle-orm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Share2, BarChart, TrendingUp, Calendar, Zap } from 'lucide-react';
import { SimpleBarChart } from '@/components/dashboard/SimpleBarChart';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch User Profile Name
    let userName = user?.email?.split('@')[0] || 'Usuário';
    if (user) {
        const profile = await db.query.profiles.findFirst({
            where: eq(profiles.id, user.id)
        });
        if (profile?.fullName) userName = profile.fullName.split(' ')[0];
    }

    // Fetch stats
    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

    const leadsCount = allLeads.length;
    const postsCount = allPosts.length;

    // Calculate hot leads
    const hotLeadsCount = allLeads.filter(l =>
        (l.category === 'Quente' || l.category === 'Ultra Quente')
    ).length;

    // Generate Chart Data (Last 7 days)
    const chartData = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dayLabel = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        // Contar leads criados neste dia
        const count = allLeads.filter(l => {
            const leadDate = new Date(l.createdAt);
            return leadDate.toDateString() === d.toDateString();
        }).length;

        // Gradient Colors logic if needed, but passing solid for simple chart
        chartData.push({ label: dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1), value: count, color: "bg-indigo-500" });
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header com Saudação */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Olá, {userName} 👋
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                        Aqui está o resumo da sua performance hoje.
                    </p>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Total Leads Card */}
                <Card className="relative overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Users className="size-24 text-indigo-600" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-900 dark:text-indigo-300">Total de Leads</CardTitle>
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                            <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">{leadsCount}</div>
                        <p className="text-xs text-indigo-600/80 mt-1 flex items-center gap-1">
                            <TrendingUp className="size-3" />
                            <span className="font-medium">+20.1%</span> no último mês
                        </p>
                    </CardContent>
                </Card>

                {/* Hot Leads Card */}
                <Card className="relative overflow-hidden border-orange-100 dark:border-orange-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap className="size-24 text-orange-600" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-300">Leads Quentes</CardTitle>
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-full">
                            <Zap className="h-4 w-4 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{hotLeadsCount}</div>
                        <p className="text-xs text-orange-600/80 mt-1">
                            Oportunidades de alto potencial
                        </p>
                    </CardContent>
                </Card>

                {/* Posts Card */}
                <Card className="relative overflow-hidden border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Share2 className="size-24 text-blue-600" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-300">Agendados</CardTitle>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{postsCount}</div>
                        <p className="text-xs text-blue-600/80 mt-1">
                            Posts prontos para publicação
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts & Activity */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-1 md:col-span-4 shadow-sm border-neutral-200 dark:border-neutral-800">
                    <CardHeader>
                        <CardTitle>Crescimento de Leads</CardTitle>
                        <CardDescription>Novos contatos nos últimos 7 dias.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[250px] w-full p-4">
                            <SimpleBarChart data={chartData} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-3 shadow-sm border-neutral-200 dark:border-neutral-800">
                    <CardHeader>
                        <CardTitle>Atividade Recente</CardTitle>
                        <CardDescription>Últimas interações registradas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {allLeads.slice(0, 5).map((lead, i) => (
                                <div key={i} className="flex items-center group">
                                    <div className="size-9 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs ring-2 ring-white dark:ring-neutral-900">
                                        {lead.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none group-hover:text-indigo-600 transition-colors">
                                            {lead.name}
                                        </p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            Novo lead cadastrado via Quiz
                                        </p>
                                    </div>
                                    <div className={`ml-auto font-medium text-[10px] px-2 py-1 rounded-full border ${lead.category === 'Ultra Quente' ? 'bg-red-50 text-red-700 border-red-100' :
                                        lead.category === 'Quente' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                            'bg-neutral-50 text-neutral-600 border-neutral-100'
                                        }`}>
                                        {lead.category || 'Novo'}
                                    </div>
                                </div>
                            ))}
                            {allLeads.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-sm text-neutral-500">Nenhuma atividade recente.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
