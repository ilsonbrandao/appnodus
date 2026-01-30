
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950 font-sans">
            <Header />
            <main className="flex-1 container max-w-5xl mx-auto px-4 py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white">Entre em Contato</h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                            Tem alguma dúvida sobre nossos planos ou funcionalidades? Nossa equipe está pronta para ajudar você a escalar suas vendas.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                    <Mail className="size-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900 dark:text-white">Email</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400">suporte@appnodus.com</p>
                                    <p className="text-neutral-500 dark:text-neutral-400">vendas@appnodus.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                    <Phone className="size-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900 dark:text-white">WhatsApp</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400">+55 (11) 99999-9999</p>
                                    <p className="text-xs text-neutral-400 mt-1">Seg a Sex, 9h às 18h</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" placeholder="Seu nome" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="seu@email.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Mensagem</Label>
                                <Textarea id="message" placeholder="Como podemos ajudar?" className="min-h-[120px]" />
                            </div>
                            <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900">
                                Enviar Mensagem
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
