import { pgTable, text, timestamp, jsonb, integer, uuid, serial } from 'drizzle-orm/pg-core';

// Tabela de Perfis (Vinculada ao Supabase Auth via ID)
export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey(), // DEVE coincidir com auth.users.id
    email: text('email').notNull(),
    fullName: text('full_name'),
    role: text('role').default('user').notNull(), // 'admin' | 'user'
    avatarUrl: text('avatar_url'),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabela de Leads (Capturados via Quiz)
export const leads = pgTable('leads', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    company: text('company'),
    role: text('role'), // Cargo do lead

    // Dados do Quiz e Qualificação IA
    quizData: jsonb('quiz_data'), // Respostas completas
    aiAnalysis: text('ai_analysis'), // Feedback da IA
    score: integer('score').default(0), // 0-100
    category: text('category').default('Cold').notNull(), // Cold, Morno, Quente, Ultra Quente

    status: text('status').default('New').notNull(), // New, Contacted, Converted, Qualified
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contas de Redes Sociais
export const socialAccounts = pgTable('social_accounts', {
    id: serial('id').primaryKey(),
    profileId: uuid('profile_id').references(() => profiles.id).notNull(),
    platform: text('platform').notNull(), // 'linkedin', 'instagram', 'twitter'
    username: text('username').notNull(),
    connectionStatus: text('connection_status').default('active'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Posts Agendados
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    profileId: uuid('profile_id').references(() => profiles.id).notNull(),
    socialAccountId: integer('social_account_id').references(() => socialAccounts.id),

    content: text('content').notNull(),
    mediaUrls: text('media_urls').array(), // Array de URLs

    scheduledFor: timestamp('scheduled_for'),
    publishedAt: timestamp('published_at'),

    status: text('status').default('Draft').notNull(), // Draft, Scheduled, Published, Failed
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
