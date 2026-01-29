'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

type ChartData = {
    label: string;
    value: number;
    color?: string;
};

export function SimpleBarChart({ data, title }: { data: ChartData[], title?: string }) {
    if (!data.length) return <div className="text-center text-neutral-400 py-10">Sem dados</div>;

    const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 5), [data]); // Min scale of 5 for aesthetics

    return (
        <div className="w-full h-full flex flex-col justify-end">
            {title && <h4 className="text-sm font-medium mb-4 text-neutral-500">{title}</h4>}
            <div className="flex items-end justify-between gap-4 h-full w-full">
                {data.map((item, i) => {
                    const heightPercentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                    return (
                        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
                            <div className="relative w-full max-w-[40px] flex flex-col justify-end h-full">
                                {/* Invisible Hover Trigger Area */}
                                <div className="absolute inset-0 z-10" />

                                {/* Tooltip */}
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap z-20 scale-90 group-hover:scale-100 flex flex-col items-center">
                                    <span>{item.value} Leads</span>
                                    <div className="size-2 bg-neutral-900 rotate-45 absolute -bottom-1" />
                                </div>

                                {/* Bar Track (Background) */}
                                <div className="absolute bottom-0 w-full h-full bg-neutral-100 dark:bg-neutral-800 rounded-t-lg" />

                                {/* Progress Bar */}
                                <div
                                    className={cn(
                                        "w-full rounded-t-lg transition-all duration-700 ease-out relative z-0 group-hover:brightness-110",
                                        item.color || "bg-indigo-500 dark:bg-indigo-400"
                                    )}
                                    style={{ height: `${heightPercentage}%`, minHeight: '8px' }}
                                />
                            </div>

                            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-3 transition-colors">
                                {item.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
