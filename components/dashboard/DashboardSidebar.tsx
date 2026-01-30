'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Settings, Menu } from 'lucide-react';
import { LogoutButton } from '@/components/dashboard/LogoutButton';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
    user: User;
    profileName: string | null;
}

const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/leads', label: 'Leads', icon: Users, exact: false },
    { href: '/dashboard/posts', label: 'Social Scheduler', icon: Calendar, exact: false },
    { href: '/dashboard/settings', label: 'Configurações', icon: Settings, exact: false },
];

export function DashboardSidebar({ user, profileName }: DashboardSidebarProps) {
    return (
        <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hidden md:flex flex-col h-full">
            <SidebarContent user={user} profileName={profileName} />
        </aside>
    );
}

export function MobileSidebar({ user, profileName }: DashboardSidebarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="size-6" />
                    <span className="sr-only">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                <SheetHeader className="sr-only">
                    <SheetTitle>Menu de Navegação</SheetTitle>
                </SheetHeader>
                <SidebarContent user={user} profileName={profileName} onNavigate={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    );
}

function SidebarContent({ user, profileName, onNavigate }: { user: User, profileName: string | null, onNavigate?: () => void }) {
    const pathname = usePathname();

    const isActive = (path: string, exact: boolean) => {
        if (exact) return pathname === path;
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex h-16 items-center border-b border-neutral-200 dark:border-neutral-800 px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="App Mídia"
                        width={140}
                        height={40}
                        className="h-8 w-auto object-contain"
                    />
                </Link>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <nav className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive(item.href, item.exact)
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
                            )}
                        >
                            <item.icon className="size-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
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
        </div>
    );
}
