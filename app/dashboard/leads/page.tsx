import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { LeadsKanban } from '@/components/dashboard/LeadsKanban';
import { desc } from 'drizzle-orm';

export default async function LeadsPage() {
    let allLeads = [];
    try {
        allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
    } catch (e) {
        console.error("Database not ready or empty", e);
        // Return empty array if DB fails (e.g. no tables yet)
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Gestão de Leads</h2>
                <button className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800">
                    Novo Lead
                </button>
            </div>
            <LeadsKanban initialLeads={allLeads as any} />
        </div>
    );
}
