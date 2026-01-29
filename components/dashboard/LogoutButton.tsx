'use client';

import { signout } from '@/app/login/actions';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
    return (
        <button
            onClick={() => signout()}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
        >
            <LogOut className="size-4" />
            Sair
        </button>
    )
}
