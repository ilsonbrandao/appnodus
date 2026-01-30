'use client';

import { useState } from 'react';
import { updatePassword } from '@/app/login/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleUpdatePassword(formData: FormData) {
        setIsLoading(true);
        setError(null);

        try {
            const result = await updatePassword(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                setSuccess(true);
            }
        } catch (e) {
            setError("Erro inesperado ao atualizar a senha.");
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
                <Card className="w-full max-w-md shadow-xl border-green-200 bg-green-50 dark:bg-green-900/10">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <CheckCircle2 className="size-6 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-300">Senha Atualizada!</CardTitle>
                        <CardDescription className="text-green-700 dark:text-green-400">
                            Sua senha foi alterada com sucesso. Você já está logado.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Link href="/dashboard">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                Ir para o Dashboard
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
            <Card className="w-full max-w-md shadow-xl border-neutral-200 dark:border-neutral-800">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none">
                        <Lock className="size-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Criar Nova Senha</CardTitle>
                    <CardDescription>Digite sua nova senha abaixo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleUpdatePassword} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Erro</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Nova Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="No mínimo 6 caracteres"
                                    minLength={6}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-neutral-400 hover:text-neutral-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 h-10 font-medium">
                            {isLoading ? 'Salvando...' : 'Redefinir Senha'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
