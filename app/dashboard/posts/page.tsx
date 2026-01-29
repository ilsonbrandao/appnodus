import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { desc, eq, type InferSelectModel } from 'drizzle-orm';
import { PostsView } from '@/components/dashboard/PostsView';
import { createClient } from '@/utils/supabase/server';

type Post = InferSelectModel<typeof posts>;

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
    let myPosts: Post[] = [];
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return <div className="p-8">Por favor faça login.</div>;
        }

        myPosts = await db.select().from(posts)
            .where(eq(posts.profileId, user.id))
            .orderBy(desc(posts.createdAt));
    } catch (e) {
        console.error("Failed to fetch posts", e);
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Agendamento Social</h2>
            </div>
            <PostsView initialPosts={myPosts as any} />
        </div>
    );
}
