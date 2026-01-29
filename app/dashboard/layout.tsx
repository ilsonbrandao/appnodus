import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

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
            <DashboardSidebar user={user as any} profileName={profileName || ''} />
            <main className="flex-1 overflow-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
