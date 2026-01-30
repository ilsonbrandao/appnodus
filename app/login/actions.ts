'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    // 0. Verificar se já existe no banco (Bypass Supabase Security Obscurity)
    // Isso é necessário porque o Supabase retorna sucesso falso se "Prevent Email Harvesting" estiver ativo.
    try {
        const [existingUser] = await db.select().from(profiles).where(eq(profiles.email, email));
        if (existingUser) {
            return { error: "User already registered" };
        }
    } catch (e) {
        console.error("Error checking existing user:", e);
        // Prossegue se der erro no banco, o Supabase vai tentar lidar
    }

    // 1. Criar usuário no Auth do Supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    // 2. Criar registro na tabela 'profiles' do Drizzle
    // O trigger do Supabase poderia fazer isso, mas vamos garantir via código também por segurança
    if (data.user) {
        try {
            await db.insert(profiles).values({
                id: data.user.id,
                email: email,
                fullName: fullName,
                role: 'user'
            }).onConflictDoNothing(); // Se já existir (devido a trigger ou retries), ignora
        } catch (e) {
            console.error("Erro ao criar profile:", e);
        }
    }

    revalidatePath('/', 'layout')
    return { success: true, message: "Verifique seu email para confirmar o cadastro." }
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    // O redirectTo deve apontar para uma rota que trate o token de recuperação
    // Geralmente /auth/callback que depois joga para uma pagina de update password
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string

    const { error } = await supabase.auth.updateUser({
        password: password
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true, message: "Senha atualizada com sucesso!" }
}
