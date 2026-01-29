'use client';

import React, { useState, useMemo } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useDraggable, useDroppable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { LeadDetailsDialog } from './LeadDetailsDialog';
import { Phone, Clock, TrendingUp, Users, DollarSign, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent as ShadcnCardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    createdAt?: string; // Optional if not in initial type but in DB
};

const COLUMNS = [
    { id: 'Cold', title: 'Frio', color: 'bg-blue-500', barColor: 'bg-blue-400' },
    { id: 'Morno', title: 'Morno', color: 'bg-yellow-500', barColor: 'bg-yellow-400' },
    { id: 'Quente', title: 'Quente', color: 'bg-orange-500', barColor: 'bg-orange-400' },
    { id: 'Ultra Quente', title: 'Fechamento', color: 'bg-red-500', barColor: 'bg-red-500' },
];

export function LeadsKanban({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const filteredLeads = useMemo(() => {
        return leads.filter(l =>
            l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [leads, searchTerm]);

    const stats = useMemo(() => {
        const total = leads.length;
        const hot = leads.filter(l => l.category === 'Quente' || l.category === 'Ultra Quente').length;
        const value = total * 1500; // Mock LTV
        return { total, hot, value };
    }, [leads]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as number);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            const leadId = active.id as number;
            const newCategory = over.id as string;

            setLeads((prev) =>
                prev.map((lead) =>
                    lead.id === leadId ? { ...lead, category: newCategory } : lead
                )
            );

            import('@/actions/leads-management').then(({ updateLeadCategory }) => {
                updateLeadCategory(leadId, newCategory).then((result) => {
                    if (result.error) console.error(result.error);
                });
            });
        }
    };

    const handleCardClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsDialogOpen(true);
    };

    const activeLead = leads.find((lead) => lead.id === activeId);

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Header Stats & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-sm border-l-4 border-l-indigo-500">
                    <ShadcnCardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-semibold">Total Leads</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                        <Users className="text-indigo-500 opacity-50" />
                    </ShadcnCardContent>
                </Card>
                <Card className="shadow-sm border-l-4 border-l-green-500">
                    <ShadcnCardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-semibold">Oportunidades</p>
                            <p className="text-2xl font-bold">{stats.hot}</p>
                        </div>
                        <TrendingUp className="text-green-500 opacity-50" />
                    </ShadcnCardContent>
                </Card>
                <Card className="shadow-sm border-l-4 border-l-amber-500 col-span-1 md:col-span-2">
                    <ShadcnCardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-semibold">Pipeline Estimado</p>
                            <p className="text-2xl font-bold">R$ {stats.value.toLocaleString('pt-BR')}</p>
                        </div>
                        <DollarSign className="text-amber-500 opacity-50" />
                    </ShadcnCardContent>
                </Card>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 p-2 rounded-lg border shadow-sm">
                <Search className="text-neutral-400 size-4 ml-2" />
                <Input
                    placeholder="Buscar leads por nome ou empresa..."
                    className="border-0 focus-visible:ring-0 shadow-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Kanban Board */}
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex-1 overflow-x-auto pb-4 touch-pan-x snap-x">
                    <div className="flex h-full gap-4 min-w-full">
                        {COLUMNS.map((col) => (
                            <KanbanColumn
                                key={col.id}
                                id={col.id}
                                title={col.title}
                                barColor={col.barColor}
                                leads={filteredLeads.filter(l => (l.category || 'Cold') === col.id)}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                </div>

                <DragOverlay>
                    {activeLead ? (
                        <div className="rotate-3 opacity-90 scale-105 cursor-grabbing w-72">
                            <KanbanCard lead={activeLead} isOverlay />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            <LeadDetailsDialog
                lead={selectedLead}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </div>
    );
}

function KanbanColumn({ id, title, leads, barColor, onCardClick }: { id: string, title: string, leads: Lead[], barColor: string, onCardClick: (lead: Lead) => void }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="snap-center flex h-full w-80 min-w-[320px] flex-col rounded-xl bg-neutral-50/50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            {/* Header Column */}
            <div className="p-3 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-t-xl sticky top-0 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", barColor)}></div>
                    <h3 className="font-semibold text-sm text-neutral-700 dark:text-neutral-200">{title}</h3>
                </div>
                <span className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-500">
                    {leads.length}
                </span>
            </div>

            <div className="h-[2px] w-full bg-neutral-100 dark:bg-neutral-800">
                <div className={cn("h-full w-full opacity-50", barColor)}></div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2.5 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
                {leads.map((lead) => (
                    <KanbanCard key={lead.id} lead={lead} onClick={() => onCardClick(lead)} />
                ))}
            </div>
        </div>
    );
}

function KanbanCard({ lead, onClick, isOverlay }: { lead: Lead, onClick?: () => void, isOverlay?: boolean }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: lead.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const content = <CardContent lead={lead} />;

    if (isOverlay) {
        return (
            <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-2xl border-2 border-indigo-500 dark:border-indigo-400 cursor-grabbing">
                {content}
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={onClick}
            className={cn(
                "bg-white dark:bg-neutral-800 p-3.5 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-grab hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all select-none relative group",
                isDragging && "opacity-0"
            )}
        >
            {content}
        </div>
    );
}

function CardContent({ lead }: { lead: Lead }) {
    return (
        <>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-bold shadow-sm border border-white dark:border-neutral-700">
                        {lead.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-neutral-900 dark:text-white truncate max-w-[140px] leading-tight">{lead.name}</p>
                        <p className="text-[10px] text-neutral-400 truncate max-w-[140px]">{lead.company || 'Sem empresa'}</p>
                    </div>
                </div>
                {lead.score !== null && (
                    <div className={cn(
                        "flex flex-col items-center justify-center min-w-[24px]",
                    )}>
                        <span className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                            lead.score > 80
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-neutral-50 text-neutral-600 border-neutral-200"
                        )}>
                            {lead.score}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap mb-3">
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded">
                    {lead.status || 'Novo'}
                </span>
                {lead.segment && (
                    <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                        {lead.segment}
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-neutral-50 dark:border-neutral-800">
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <Clock className="size-3" />
                    <span>2d</span>
                </div>
                {lead.phone && (
                    <button
                        className="text-green-600 hover:text-green-700 p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${lead.phone!.replace(/\D/g, '')}`, '_blank');
                        }}
                    >
                        <Phone className="size-3.5" />
                    </button>
                )}
            </div>
        </>
    );
}
