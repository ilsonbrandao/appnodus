'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'

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
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

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
