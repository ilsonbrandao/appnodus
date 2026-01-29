'use server';

import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { generateAIAnalysis } from '@/lib/ai/client';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function generatePostContent(topic: string, platform: string = 'linkedin') {
    const prompt = `
        Atue como um especialista em Marketing Digital.
        Crie um conteúdo de post para a rede social ${platform}.
        
        Tema: ${topic}
        
        Regras:
        - Use tom profissional mas engajador.
        - Use formatação (quebras de linha) para facilitar leitura.
        - Inclua 3-5 hashtags relevantes no final.
        - Sugira um Call to Action (CTA) no final.
        - Não inclua explicações, apenas o conteúdo do post.
    `;

    try {
        const content = await generateAIAnalysis(prompt);
        return { content };
    } catch (error) {
        console.error("Erro ao gerar post:", error);
        return { error: "Falha ao gerar conteúdo com IA." };
    }
}

export async function savePost(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Você precisa estar logado." };
    }

    const userId = user.id;

    const content = formData.get('content') as string;
    const scheduledDate = formData.get('date') as string; // YYYY-MM-DDTHH:mm
    const status = formData.get('status') as 'Draft' | 'Scheduled';

    try {
        await db.insert(posts).values({
            profileId: userId,
            content: content,
            scheduledFor: scheduledDate ? new Date(scheduledDate) : null,
            status: status || 'Draft',
        });

        revalidatePath('/dashboard/posts');
        return { success: true };
    } catch (error) {
        console.error("Erro ao salvar post:", error);
        return { error: "Erro ao salvar no banco de dados." };
    }
}
