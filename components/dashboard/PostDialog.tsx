'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const postSchema = z.object({
    platform: z.string().min(1, "Selecione a plataforma"),
    content: z.string().min(1, "O conteúdo não pode estar vazio"),
    date: z.date().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PostDialog({ open, onOpenChange }: PostDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [topic, setTopic] = useState("");
    const [showAiInput, setShowAiInput] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
    });

    const date = watch('date');
    const platform = watch('platform');

    // Importar dinamicamente as actions para evitar erro de 'use server' em client component se importado errado
    // Mas em Next.js App Router, actions podem ser importadas.
    // Vamos assumir que actions/posts.ts está correto.

    const handleGenerateAI = async () => {
        if (!topic) return toast.error("Digite um tema para a IA.");

        setIsGenerating(true);
        try {
            // Importar dinamicamente ou usar bind se fosse passado via props. 
            // Vou usar fetch num endpoint ou assumir que posso importar a action.
            // Para simplicidade, vou importar a action no topo do arquivo (adicionarei o import num passo separado ou assumirei que o bundler resolve).
            // Vou usar um truque: chamar a action importada (que vou adicionar no topo).

            const { generatePostContent } = await import('@/actions/posts');
            const result = await generatePostContent(topic, platform || 'linkedin');

            if (result.error) {
                toast.error(result.error);
            } else if (result.content) {
                setValue('content', result.content);
                toast.success("Conteúdo gerado!");
                setShowAiInput(false);
            }
        } catch (e) {
            console.error(e);
            toast.error("Erro ao conectar com a IA.");
        } finally {
            setIsGenerating(false);
        }
    };

    const onSubmit = async (data: PostFormValues) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('content', data.content);
            if (data.date) formData.append('date', data.date.toISOString());
            formData.append('status', data.date ? 'Scheduled' : 'Draft');

            const { savePost } = await import('@/actions/posts');
            const result = await savePost(formData);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Post salvo com sucesso!");
                onOpenChange(false);
                reset();
                setTopic("");
            }
        } catch (e) {
            toast.error("Erro inesperado ao salvar.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Novo Post</DialogTitle>
                    <DialogDescription>
                        Crie e agende conteúdo para suas redes sociais.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Plataforma</Label>
                        <Select onValueChange={(val) => setValue('platform', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a rede social" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="twitter">X / Twitter</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.platform && <p className="text-sm text-red-500">{errors.platform.message}</p>}
                    </div>

                    {/* Área de IA */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                                <span className="text-lg">✨</span> Assistente de IA
                            </Label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-xs h-6 text-indigo-600"
                                onClick={() => setShowAiInput(!showAiInput)}
                            >
                                {showAiInput ? "Fechar" : "Abrir"}
                            </Button>
                        </div>

                        {showAiInput && (
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1 bg-white dark:bg-neutral-950"
                                    placeholder="Sobre o que você quer escrever? (ex: Dicas de liderança)"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating || !topic}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                    {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : "Gerar"}
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Conteúdo</Label>
                        <Textarea
                            placeholder="Escreva sua legenda aqui..."
                            className="min-h-[150px] font-sans"
                            {...register('content')}
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <Label>Data de Agendamento</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Publicar Agora (Draft)</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => setValue('date', d)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {date ? "Agendar" : "Salvar Rascunho"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
