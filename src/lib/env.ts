// Variáveis públicas (podem ir para o navegador): apenas URL e chave "anon/publishable" do Supabase,
// que são protegidas pelas políticas RLS do banco.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
