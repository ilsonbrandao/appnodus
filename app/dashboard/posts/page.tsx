import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { desc, type InferSelectModel } from 'drizzle-orm';
import { PostsView } from '@/components/dashboard/PostsView';

type Post = InferSelectModel<typeof posts>;

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
    // Fetch posts (will be empty initially)
    let allPosts: Post[] = [];
    try {
        // TODO: Filter by logged in user eventually
        allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    } catch (e) {
        console.error("Failed to fetch posts", e);
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Agendamento Social</h2>
            </div>
            <PostsView initialPosts={allPosts as any} />
        </div>
    );
}
