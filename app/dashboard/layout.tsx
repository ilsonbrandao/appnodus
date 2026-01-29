import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DashboardSidebar, MobileSidebar } from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch user profile from DB to get name if available
    let profileName = user.email; // Default fallback
    try {
        const profile = await db.query.profiles.findFirst({
            where: eq(profiles.id, user.id)
        });
        if (profile?.fullName) {
            profileName = profile.fullName;
        }
    } catch (e) { /* ignore db error */ }

    // Cast user to any to avoid strict type mismatch if necessary, 
    // or assume the User type from supabase-js matches well enough in practice.
    // Ideally DashboardSidebar imports User from @supabase/supabase-js.

    return (
        <div className="flex h-screen w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
            {/* Sidebar Desktop (Hidden on Mobile) */}
            <DashboardSidebar user={user as any} profileName={profileName || ''} />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header Mobile (Visible only on Mobile) */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <div className="flex size-6 items-center justify-center rounded-md bg-indigo-600">
                            <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-neutral-900 dark:text-white">AppNodus</span>
                    </div>
                    <MobileSidebar user={user as any} profileName={profileName || ''} />
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
