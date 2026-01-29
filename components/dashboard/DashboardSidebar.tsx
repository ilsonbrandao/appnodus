'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Settings } from 'lucide-react';
import { LogoutButton } from '@/components/dashboard/LogoutButton';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';

interface DashboardSidebarProps {
    user: User;
    profileName: string | null;
}

export function DashboardSidebar({ user, profileName }: DashboardSidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hidden md:flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center gap-2 mb-8 text-indigo-600 dark:text-indigo-400">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600">
                        <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-white">AppNodus</h1>
                </div>

                <nav className="space-y-1">
                    <NavLink
                        href="/dashboard"
                        icon={<LayoutDashboard className="size-4" />}
                        active={pathname === '/dashboard'} // Exact match for root dashboard
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href="/dashboard/leads"
                        icon={<Users className="size-4" />}
                        active={isActive('/dashboard/leads')}
                    >
                        Leads
                    </NavLink>
                    <NavLink
                        href="/dashboard/posts"
                        icon={<Calendar className="size-4" />}
                        active={isActive('/dashboard/posts')}
                    >
                        Social Scheduler
                    </NavLink>
                    <NavLink
                        href="/dashboard/settings"
                        icon={<Settings className="size-4" />}
                        active={isActive('/dashboard/settings')}
                    >
                        Configurações
                    </NavLink>
                </nav>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {(profileName || user.email)?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate text-neutral-900 dark:text-neutral-100">
                            {profileName || 'Usuário'}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                    </div>
                </div>
                <LogoutButton />
            </div>
        </aside>
    );
}

function NavLink({ href, children, icon, active }: { href: string, children: React.ReactNode, icon: React.ReactNode, active?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
            )}
        >
            {icon}
            {children}
        </Link>
    )
}
