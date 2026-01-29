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

    const onSubmit = async (data: PostFormValues) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Creating post:", data);
        toast.success("Post agendado com sucesso! (Simulado)");

        setIsSubmitting(false);
        onOpenChange(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
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

                    <div className="space-y-2">
                        <Label>Conteúdo</Label>
                        <Textarea
                            placeholder="Escreva sua legenda aqui..."
                            className="min-h-[120px]"
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
                                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolher data</span>}
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
                            Agendar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
