import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // Se for fluxo de reset password, o usuário agora está logado e pode atualizar a senha.
            // Redireciona para a página especificada.
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // TODO: return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_code_error`);
}
