import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
            <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hidden md:block">
                <div className="flex items-center gap-2 mb-8 text-indigo-600 dark:text-indigo-400">
                    <div className="size-8 rounded-lg bg-current" />
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-white">AppNodus</h1>
                </div>

                <nav className="space-y-1">
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <NavLink href="/dashboard/leads" active>Leads (Kanban)</NavLink>
                    <NavLink href="/dashboard/posts">Social Scheduler</NavLink>
                    <NavLink href="/dashboard/settings">Configurações</NavLink>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${active
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:hover:text-neutral-300'
                }`}
        >
            {children}
        </Link>
    )
}
