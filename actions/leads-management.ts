'use server';

import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateLeadCategory(leadId: number, newCategory: string) {
    try {
        await db.update(leads)
            .set({ category: newCategory })
            .where(eq(leads.id, leadId));

        revalidatePath('/dashboard/leads');
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar categoria do lead:", error);
        return { error: "Falha ao salvar alteração." };
    }
}
