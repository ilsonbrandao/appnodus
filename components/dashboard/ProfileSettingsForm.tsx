'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransition } from 'react';
import { updateProfile } from '@/actions/profile';
import { toast } from 'sonner';

export function ProfileSettingsForm({ initialName, email }: { initialName: string, email: string }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateProfile(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message);
            }
        });
    };

    return (
        <Card>
            <form action={handleSubmit}>
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>Suas informações pessoais e de contato.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} disabled className="bg-neutral-100 dark:bg-neutral-800" />
                        <p className="text-[0.8rem] text-neutral-500">O email não pode ser alterado.</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            defaultValue={initialName}
                            placeholder="Seu nome"
                        />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
