'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Instagram, Linkedin, Plus, Image as ImageIcon, MoreHorizontal, Clock } from 'lucide-react';
import { PostDialog } from './PostDialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header com Stats de Contas */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="flex gap-4 items-center">
                    <div className="flex -space-x-3">
                        <div className="size-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-sm z-10">
                            <Instagram className="size-5 text-white" />
                        </div>
                        <div className="size-10 rounded-full bg-[#0077b5] flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-sm z-0">
                            <Linkedin className="size-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Contas Conectadas</h3>
                        <p className="text-xs text-neutral-500">Instagram, LinkedIn</p>
                    </div>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Novo Post
                </Button>
            </div>

            {/* Abas e Filtros */}
            <Tabs defaultValue="scheduled" className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <TabsList className="bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg">
                        <TabsTrigger value="scheduled" className="px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm">
                            Agendados
                        </TabsTrigger>
                        <TabsTrigger value="published" className="px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm">
                            Publicados
                        </TabsTrigger>
                        <TabsTrigger value="draft" className="px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-sm">
                            Rascunhos
                        </TabsTrigger>
                    </TabsList>
                </div>

                {['scheduled', 'published', 'draft'].map((tabValue) => (
                    <TabsContent key={tabValue} value={tabValue} className="mt-0 focus-visible:outline-none">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayPosts
                                .filter(p => {
                                    if (tabValue === 'scheduled') return p.status === 'Scheduled' || p.status === 'Agendado';
                                    if (tabValue === 'published') return p.status === 'Published';
                                    return p.status === 'Draft';
                                })
                                .map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            }
                        </div>
                        {displayPosts.filter(p => {
                            if (tabValue === 'scheduled') return p.status === 'Scheduled' || p.status === 'Agendado';
                            if (tabValue === 'published') return p.status === 'Published';
                            return p.status === 'Draft';
                        }).length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
                                    <div className="size-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                                        <CalendarIcon className="size-6 text-neutral-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Nenhum post encontrado</h3>
                                    <p className="text-sm text-neutral-500 max-w-xs text-center mt-1">
                                        Não há posts nesta categoria. Crie um novo post para começar.
                                    </p>
                                </div>
                            )}
                    </TabsContent>
                ))}
            </Tabs>

            <PostDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
            />
        </div>
    );
}

function PostCard({ post }: { post: Post }) {
    const isInstagram = !post.content.includes('#linkedin'); // Mock logic

    return (
        <Card className="group overflow-hidden border-neutral-200 dark:border-neutral-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            {/* Visual Header (Image or Gradient) */}
            <div className="relative h-40 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                {/* Badges Flutuantes */}
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <div className={cn(
                        "size-6 rounded-full flex items-center justify-center shadow-sm",
                        isInstagram ? "bg-white text-pink-600" : "bg-white text-blue-600" // LinkedIn color
                    )}>
                        {isInstagram ? <Instagram className="size-3.5" /> : <Linkedin className="size-3.5" />}
                    </div>
                </div>

                <div className="absolute top-3 right-3 z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-white/80 hover:bg-white text-neutral-600 backdrop-blur-sm shadow-sm">
                                <MoreHorizontal className="size-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                    // Mock Image Logic - in real app use Next Image with url
                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                        <ImageIcon className="size-8 text-neutral-400" />
                        {post.mediaUrls.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                                +{post.mediaUrls.length - 1}
                            </div>
                        )}
                    </div>
                ) : (
                    // Gradient Placeholder for text-only posts
                    <div className={cn(
                        "w-full h-full flex items-center justify-center p-6 text-white text-center text-sm font-medium italic relative overflow-hidden group-hover:scale-105 transition-transform duration-500",
                        isInstagram ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gradient-to-br from-blue-600 to-cyan-500"
                    )}>
                        <p className="line-clamp-3 relative z-10 opacity-90">{post.content}</p>
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                )}
            </div>

            {/* Conteúdo */}
            <CardContent className="p-4 flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant={
                        post.status === 'Published' ? 'secondary' :
                            post.status === 'Draft' ? 'outline' : 'default'
                    } className={cn(
                        "text-[10px] h-5 px-1.5 font-normal",
                        post.status === 'Scheduled' && "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
                        post.status === 'Agendado' && "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
                    )}>
                        {post.status === 'Scheduled' || post.status === 'Agendado' ? 'Agendado' : post.status}
                    </Badge>
                    {post.scheduledFor && (
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                            <Clock className="size-3" />
                            {format(new Date(post.scheduledFor), "d MMM, HH:mm", { locale: ptBR })}
                        </span>
                    )}
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                    {post.content}
                </p>
            </CardContent>

            <CardFooter className="px-4 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex justify-between items-center text-xs text-neutral-500">
                <span>Criado hoje</span>
                <Button variant="ghost" className="h-6 text-[10px] px-2 hover:bg-white hover:shadow-sm">Ver Detalhes</Button>
            </CardFooter>
        </Card>
    )
}

const MOCK_POSTS: Post[] = [
    {
        id: 1,
        content: "🚀 Lançamento da nova feature de IA! Estamos muito empolgados em compartilhar nossas novidades com o mundo. #tech #ai #startup",
        mediaUrls: [], // Sem imagem, usa gradiente
        scheduledFor: new Date(Date.now() + 86400000), // Amanhã
        status: 'Scheduled',
        platform: 'linkedin'
    },
    {
        id: 2,
        content: "5 Dicas para melhorar suas vendas hoje mesmo. Confira no carrossel abaixo e não esqueça de salvar! 👇⚡",
        mediaUrls: ['url', 'url'], // Com imagem
        scheduledFor: new Date(Date.now() + 172800000),
        status: 'Scheduled',
        platform: 'instagram'
    },
    {
        id: 3,
        content: "Reflexão sobre a cultura de trabalho remoto e como isso afeta a produtividade.",
        mediaUrls: [],
        scheduledFor: null,
        status: 'Draft',
        platform: 'linkedin'
    },
    {
        id: 4,
        content: "Promoção relâmpago! Apenas hoje 50% OFF em todos os planos. Corra!",
        mediaUrls: ['url'],
        scheduledFor: new Date(),
        status: 'Published',
        platform: 'instagram'
    }
];
