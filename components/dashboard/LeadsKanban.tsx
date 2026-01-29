'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable, useDroppable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { LeadDetailsDialog } from './LeadDetailsDialog';

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

const COLUMNS = [
    { id: 'Cold', title: 'Cold', color: 'bg-blue-500' },
    { id: 'Morno', title: 'Morno', color: 'bg-yellow-500' },
    { id: 'Quente', title: 'Quente', color: 'bg-orange-500' },
    { id: 'Ultra Quente', title: 'Ultra Quente', color: 'bg-red-500' },
];

export function LeadsKanban({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const leadId = active.id as number;
            const newCategory = over.id as string;

            // Optimistic update
            setLeads((prev) =>
                prev.map((lead) =>
                    lead.id === leadId ? { ...lead, category: newCategory } : lead
                )
            );

            // TODO: Call server action to persist change
            console.log(`Moved lead ${leadId} to ${newCategory}`);
        }
    };

    const handleCardClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsDialogOpen(true);
    };

    return (
        <>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="flex h-full gap-4 overflow-x-auto pb-4">
                    {COLUMNS.map((col) => (
                        <KanbanColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            color={col.color}
                            leads={leads.filter(l => (l.category || 'Cold') === col.id)}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </DndContext>

            <LeadDetailsDialog
                lead={selectedLead}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </>
    );
}

function KanbanColumn({ id, title, leads, color, onCardClick }: { id: string, title: string, leads: Lead[], color: string, onCardClick: (lead: Lead) => void }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="flex h-full w-80 min-w-80 flex-col rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-neutral-700 dark:text-neutral-200">{title}</h3>
                <span className="text-xs font-mono bg-white dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-500">
                    {leads.length}
                </span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {leads.map((lead) => (
                    <KanbanCard key={lead.id} lead={lead} onClick={() => onCardClick(lead)} />
                ))}
            </div>
        </div>
    );
}

function KanbanCard({ lead, onClick }: { lead: Lead, onClick: () => void }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: lead.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={onClick}
            className={cn(
                "bg-white dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-grab hover:shadow-md transition-shadow select-none relative",
                isDragging && "opacity-50 z-50 ring-2 ring-indigo-500"
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm text-neutral-900 dark:text-white truncate">{lead.name}</span>
                {lead.score !== null && (
                    <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded",
                        lead.score > 80 ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"
                    )}>
                        {lead.score}
                    </span>
                )}
            </div>
            <p className="text-xs text-neutral-500 truncate">{lead.email}</p>
            <p className="text-xs text-neutral-400 mt-1">{lead.company}</p>
        </div>
    );
}
