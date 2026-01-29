
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';

// UUID fixo para usuário de teste
const DEMO_USER_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

async function setup() {
    console.log("Configurando usuário Demo...");

    try {
        await db.insert(profiles).values({
            id: DEMO_USER_ID,
            email: 'demo@appnodus.com',
            fullName: 'Usuário Demo',
            role: 'admin'
        }).onConflictDoNothing();

        console.log("✅ Usuário Demo 'demo@appnodus.com' criado/garantido no banco.");
        console.log(`ID: ${DEMO_USER_ID}`);
    } catch (e) {
        console.error("Erro ao criar usuário demo:", e);
    }

    process.exit(0);
}

setup();
