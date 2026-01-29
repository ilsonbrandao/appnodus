'use server';

import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { aiModel } from '@/lib/ai/client';
import { revalidatePath } from 'next/cache';

// Interface genérica para o Quiz
interface QuizSubmission {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    answers: Record<string, string>;
}

export async function submitQuiz(data: QuizSubmission) {
    try {
        console.log("Submitting quiz for:", data.email);

        // 1. Prepare Prompt for Gemini
        const prompt = `
      Atue como um Especialista em Vendas e Qualificação de Leads.
      Analise as respostas deste lead para um serviço/produto High Ticket.

      Dados do Lead:
      Nome: ${data.name}
      Cargo: ${data.role || 'N/A'}
      Empresa: ${data.company || 'N/A'}
      
      Respostas do Quiz:
      ${JSON.stringify(data.answers, null, 2)}

      Tarefa:
      1. Calcule um Score de 0 a 100 para este lead (Potencial de compra).
      2. Classifique em uma das categorias: 'Cold', 'Morno', 'Quente', 'Ultra Quente'.
      3. Forneça uma breve análise justificando a classificação (máx 2 frases).

      Retorne APENAS um JSON no seguinte formato, sem markdown:
      {
        "score": number,
        "category": "Cold" | "Morno" | "Quente" | "Ultra Quente",
        "analysis": "string"
      }
    `;

        // 2. Call Gemini
        const result = await aiModel.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up markdown code blocks if present
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        let analysis;
        try {
            analysis = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse AI response", responseText);
            // Fallback
            analysis = {
                score: 0,
                category: "Cold",
                analysis: "Erro na análise de IA. Revisão manual necessária."
            };
        }

        // 3. Save to Database
        const [newLead] = await db.insert(leads).values({
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company,
            role: data.role,
            quizData: data.answers,
            score: analysis.score,
            category: analysis.category,
            aiAnalysis: analysis.analysis,
            status: 'New'
        }).returning();

        revalidatePath('/dashboard/leads');

        return { success: true, lead: newLead };

    } catch (error) {
        console.error("Error in submitQuiz:", error);
        return { success: false, error: "Failed to process submission" };
    }
}
