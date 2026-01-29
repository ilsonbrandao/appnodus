'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Instagram, Linkedin, Plus } from 'lucide-react';
import { PostDialog } from './PostDialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Post = {
    id: number;
    content: string;
    mediaUrls: string[] | null;
    scheduledFor: Date | null;
    status: string;
    platform?: 'instagram' | 'linkedin' | 'twitter' | null;
};

export function PostsView({ initialPosts }: { initialPosts: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Mock data if empty for visualization
    const displayPosts = posts.length > 0 ? posts : MOCK_POSTS;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <div className="flex gap-2">
                    <div className="flex -space-x-2">
                        <div className="size-8 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white dark:border-neutral-900">
                            <Instagram className="size-4 text-white" />
                        </div>
                        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white dark:border-neutral-900">
                            <Linkedin className="size-4 text-white" />
                        </div>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium">Contas Conectadas</p>
                        <p className="text-xs text-neutral-500">2 ativas</p>
                    </div>
                </div>
                <Button onClick={() => setIsCreateOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Novo Post
                </Button>
            </div>

            <Tabs defaultValue="scheduled" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
                    <TabsTrigger value="scheduled">Agendados</TabsTrigger>
                    <TabsTrigger value="published">Publicados</TabsTrigger>
                    <TabsTrigger value="draft">Rascunhos</TabsTrigger>
                </TabsList>

                <TabsContent value="scheduled" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayPosts.filter(p => p.status === 'Scheduled' || p.status === 'Agendado').map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    {displayPosts.filter(p => p.status === 'Scheduled').length === 0 && (
                        <p className="text-center text-neutral-500 py-12">Nenhum post agendado.</p>
                    )}
                </TabsContent>

                <TabsContent value="published" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayPosts.filter(p => p.status === 'Published').map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="draft" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayPosts.filter(p => p.status === 'Draft').map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <PostDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
            />
        </div>
    );
}

function PostCard({ post }: { post: Post }) {
    const PlatformIcon = () => {
        // Mock logic for platform, in real app this comes from social_account relation
        if (post.content.includes('#linkedin')) return <Linkedin className="size-4 text-blue-600" />;
        return <Instagram className="size-4 text-pink-600" />;
    }

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <PlatformIcon />
                    <span className="text-xs font-medium text-neutral-500">
                        {post.scheduledFor ? format(new Date(post.scheduledFor), "d 'de' MMMM", { locale: ptBR }) : 'Sem data'}
                    </span>
                </div>
                <Badge variant={post.status === 'Published' ? 'secondary' : 'outline'}>
                    {post.status}
                </Badge>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-sm text-neutral-800 dark:text-neutral-200 line-clamp-3">
                    {post.content}
                </p>
                {post.mediaUrls && post.mediaUrls.length > 0 && (
                    <div className="mt-3 h-32 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md flex items-center justify-center text-neutral-400 text-xs">
                        {post.mediaUrls.length} mídia(s)
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0 text-xs text-neutral-400">
                {post.scheduledFor && (
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="size-3" />
                        {format(new Date(post.scheduledFor), "HH:mm")}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

const MOCK_POSTS: Post[] = [
    {
        id: 1,
        content: "🚀 Lançamento da nova feature de IA! Estamos muito empolgados em compartilhar... #tech #ai",
        mediaUrls: ['url'],
        scheduledFor: new Date(Date.now() + 86400000), // Amanhã
        status: 'Scheduled',
        platform: 'linkedin'
    },
    {
        id: 2,
        content: "5 Dicas para melhorar suas vendas hoje mesmo. Confira no carrossel! 👇",
        mediaUrls: ['url', 'url'],
        scheduledFor: new Date(Date.now() + 172800000),
        status: 'Scheduled',
        platform: 'instagram'
    },
    {
        id: 3,
        content: "Rascunho sobre a cultura da empresa...",
        mediaUrls: [],
        scheduledFor: null,
        status: 'Draft',
        platform: 'linkedin'
    }
];
