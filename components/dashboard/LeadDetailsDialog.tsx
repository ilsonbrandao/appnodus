'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge'; // Note: Need to create/check if badge exists or use tailwind
import { ScrollArea } from '@/components/ui/scroll-area'; // Need to add scroll-area

type Lead = {
    id: number;
    name: string;
    category: string | null;
    score: number | null;
    company: string | null;
    status: string | null;
    email: string;
    role: string | null;
    phone: string | null;
    instagram: string | null;
    website: string | null;
    segment: string | null;
    aiAnalysis: string | null;
    quizData: Record<string, unknown> | null;
};

interface LeadDetailsDialogProps {
    lead: Lead | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LeadDetailsDialog({ lead, open, onOpenChange }: LeadDetailsDialogProps) {
    if (!lead) return null;

    const quiz = lead.quizData as Record<string, string>;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between mr-8">
                        <DialogTitle className="text-xl">{lead.name}</DialogTitle>
                        <span className={getScoreBadge(lead.score)}>{lead.score} / 100</span>
                    </div>
                    <DialogDescription>
                        {lead.role} na {lead.company}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* AI Analysis Section */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                        <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                            ✨ Análise da IA
                        </h4>
                        <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                            {lead.aiAnalysis || "Nenhuma análise disponível."}
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Email</span>
                            <span className="font-medium">{lead.email}</span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Telefone</span>
                            <span className="font-medium">{lead.phone || "Não informado"}</span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Instagram</span>
                            <span className="font-medium">
                                {lead.instagram ? (
                                    <a href={`https://instagram.com/${lead.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                        {lead.instagram}
                                    </a>
                                ) : "-"}
                            </span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Site</span>
                            <span className="font-medium">
                                {lead.website ? (
                                    <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                        Link
                                    </a>
                                ) : "-"}
                            </span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Segmento</span>
                            <span className="font-medium">{lead.segment || "Geral"}</span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Status</span>
                            <span className="font-medium">{lead.status}</span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">Categoria</span>
                            <span className="font-medium">{lead.category}</span>
                        </div>
                    </div>

                    {/* Quiz Responses */}
                    {quiz && (
                        <div className="space-y-4 border-t pt-4">
                            <h4 className="font-semibold text-neutral-900 dark:text-white">Respostas do Quiz</h4>
                            <div className="space-y-3">
                                {Object.entries(quiz).map(([question, answer]) => (
                                    <div key={question} className="bg-neutral-50 dark:bg-neutral-900 p-3 rounded-md">
                                        <p className="text-xs text-neutral-500 uppercase mb-1">{question}</p>
                                        <p className="text-sm text-neutral-800 dark:text-neutral-300">{answer as string}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function getScoreBadge(score: number | null) {
    if (!score) return "text-xs font-bold px-2 py-1 rounded bg-neutral-100 text-neutral-600";
    if (score >= 80) return "text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (score >= 50) return "text-xs font-bold px-2 py-1 rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
}
