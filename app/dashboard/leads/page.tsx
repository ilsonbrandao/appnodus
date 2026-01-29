import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { LeadsKanban } from '@/components/dashboard/LeadsKanban';
import { ExportLeadsButton } from '@/components/dashboard/ExportLeadsButton';
import { desc, type InferSelectModel } from 'drizzle-orm';

type Lead = InferSelectModel<typeof leads>;

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    let allLeads: Lead[] = [];
    try {
        allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
    } catch (e) {
        console.error("Database not ready or empty", e);
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Gestão de Leads</h2>
                <div className="flex gap-2">
                    <ExportLeadsButton leads={allLeads as any} />
                </div>
            </div>
            <LeadsKanban initialLeads={allLeads as unknown as any} />
        </div>
    );
}
