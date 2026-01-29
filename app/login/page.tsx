import Link from 'next/link'
import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-indigo-600">
                        <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold">Acesso ao AppNodus</CardTitle>
                    <CardDescription>Gerencie suas vendas e redes sociais em um só lugar.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login">Entrar</TabsTrigger>
                            <TabsTrigger value="register">Cadastrar</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form action={async (formData) => {
                                'use server';
                                await login(formData);
                            }} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" name="password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Acessar</Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="register">
                            <form action={async (formData) => {
                                'use server';
                                await signup(formData);
                            }} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nome Completo</Label>
                                    <Input id="fullName" name="fullName" placeholder="Seu nome" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" name="password" type="password" required />
                                </div>
                                <Button type="submit" variant="outline" className="w-full">Criar Conta Grátis</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
                        Voltar para Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
