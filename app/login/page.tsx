'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { login, signup, resetPassword } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Lock, Mail, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

function LoginFormContent() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [forgotError, setForgotError] = useState<string | null>(null);

    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);

    // Estados para visibilidade de senha
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    // Controle manual das tabs para permitir navegação via link
    const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
    const [activeTab, setActiveTab] = useState<string>(initialTab);

    async function handleLogin(formData: FormData) {
        setIsLoading(true);
        setLoginError(null);

        try {
            const result = await login(formData);

            if (result?.error) {
                const msg = result.error.toLowerCase();
                if (msg.includes('invalid login credentials')) {
                    setLoginError("Email ou senha incorretos.");
                } else if (msg.includes('email not confirmed')) {
                    setLoginError("Email não confirmado. Verifique sua caixa de entrada.");
                } else {
                    setLoginError(result.error);
                }
            } else if (result?.success) {
                router.push('/dashboard');
            }
        } catch (error) {
            setLoginError("Ocorreu um erro inesperado. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSignup(formData: FormData) {
        setIsLoading(true);
        setRegisterError(null);
        setRegisterSuccess(false);

        try {
            const result = await signup(formData);

            if (result?.error) {
                const msg = result.error.toLowerCase();
                if (msg.includes('user already registered') || msg.includes('multiple users')) {
                    setRegisterError("Este email já está cadastrado. Tente fazer login.");
                } else {
                    setRegisterError(result.error);
                }
            } else if (result?.success) {
                setRegisterSuccess(true);
                toast.success("Conta criada com sucesso!");
            }
        } catch (error) {
            setRegisterError("Erro ao criar conta.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleForgotPassword(formData: FormData) {
        setIsLoading(true);
        setForgotError(null);
        setForgotSuccess(false);

        try {
            const result = await resetPassword(formData);

            if (result?.error) {
                setForgotError(result.error);
            } else if (result?.success) {
                setForgotSuccess(true);
                toast.success("Email de recuperação enviado!");
            }
        } catch (e) {
            setForgotError("Erro ao solicitar recuperação.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md shadow-xl border-neutral-200 dark:border-neutral-800 transition-all duration-300">
            <CardHeader className="flex flex-col items-center">
                <div className="mb-6 relative size-20">
                    <Image
                        src="/logo.png"
                        alt="App Mídia"
                        fill
                        className="object-contain rounded-2xl"
                        priority
                    />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Acesso ao App Mídia</CardTitle>
                <p className="text-center text-neutral-500 mt-2 text-sm">Gerencie suas vendas e redes sociais em um só lugar.</p>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {activeTab !== 'forgot' && (
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">Entrar</TabsTrigger>
                            <TabsTrigger value="register">Cadastrar</TabsTrigger>
                        </TabsList>
                    )}

                    {/* LOGIN TAB */}
                    <TabsContent value="login">
                        <form action={handleLogin} className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                            {loginError && (
                                <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Erro no Login</AlertTitle>
                                    <AlertDescription>{loginError}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="h-10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('forgot')}
                                        className="text-xs text-indigo-600 hover:text-indigo-500 hover:underline"
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showLoginPassword ? "text" : "password"}
                                        required
                                        className="h-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                        className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-neutral-400 hover:text-neutral-600 focus:outline-none"
                                    >
                                        {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 h-10 transition-all font-medium">
                                {isLoading ? <Loader2 className="animate-spin size-4" /> : 'Acessar Painel'}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* REGISTER TAB */}
                    <TabsContent value="register">
                        {registerSuccess ? (
                            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-300">
                                <div className="mx-auto size-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="size-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Confirme seu Email</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Enviamos um link de confirmação para o seu email.
                                    <br />
                                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">Verifique também sua caixa de SPAM.</span>
                                </p>
                                <Button variant="outline" onClick={() => window.location.reload()} className="w-full mt-4">
                                    Voltar para Login
                                </Button>
                            </div>
                        ) : (
                            <form action={handleSignup} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                {registerError && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Erro</AlertTitle>
                                        <AlertDescription>{registerError}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs flex gap-2 items-start border border-blue-100 dark:border-blue-800">
                                    <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                                    <p>
                                        Após criar a conta, você receberá um <strong>link de validação</strong> no seu e-mail. É obrigatório confirmar.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nome Completo</Label>
                                    <Input id="fullName" name="fullName" placeholder="Seu nome" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Corporativo</Label>
                                    <Input id="email" name="email" type="email" placeholder="seu@empresa.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha Forte</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showRegisterPassword ? "text" : "password"}
                                            required
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-neutral-400 hover:text-neutral-600 focus:outline-none"
                                        >
                                            {showRegisterPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </div>
                                </div>

                                <Button type="submit" disabled={isLoading} variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 h-10 font-medium">
                                    {isLoading ? <Loader2 className="animate-spin size-4" /> : 'Criar Conta Grátis'}
                                </Button>
                            </form>
                        )}
                    </TabsContent>

                    {/* FORGOT PASSWORD TAB (Hidden Trigger) */}
                    <TabsContent value="forgot">
                        {forgotSuccess ? (
                            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
                                <div className="mx-auto size-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Mail className="size-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Email Enviado</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Se houver uma conta com este email, você receberá as instruções de redefinição em instantes.
                                </p>
                                <Button onClick={() => setActiveTab('login')} variant="outline" className="w-full mt-2">
                                    Voltar para Login
                                </Button>
                            </div>
                        ) : (
                            <form action={handleForgotPassword} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 -ml-2"
                                        onClick={() => setActiveTab('login')}
                                    >
                                        <ArrowLeft className="size-4" />
                                    </Button>
                                    <h3 className="text-lg font-semibold">Recuperar Senha</h3>
                                </div>

                                <p className="text-sm text-neutral-500 mb-4">
                                    Digite seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.
                                </p>

                                {forgotError && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Erro</AlertTitle>
                                        <AlertDescription>{forgotError}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="forgot-email">Email</Label>
                                    <Input id="forgot-email" name="email" type="email" placeholder="seu@email.com" required className="h-10" />
                                </div>

                                <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 h-10 font-medium">
                                    {isLoading ? <Loader2 className="animate-spin size-4" /> : 'Enviar Link de Recuperação'}
                                </Button>
                            </form>
                        )}
                    </TabsContent>

                </Tabs>
            </CardContent>
            <CardFooter className="justify-center border-t border-neutral-100 dark:border-neutral-800 pt-6">
                <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors flex items-center gap-2">
                    ← Voltar para Home
                </Link>
            </CardFooter>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
            <Suspense fallback={
                <div className="p-8 bg-white rounded-lg shadow flex flex-col items-center">
                    <Loader2 className="animate-spin size-8 text-indigo-600 mb-2" />
                    <p className="text-sm text-neutral-500">Carregando...</p>
                </div>
            }>
                <LoginFormContent />
            </Suspense>
        </div>
    );
}
