// Variáveis públicas (vão para o navegador): URL e chave "publishable" do Supabase.
// Elas são públicas por natureza — os dados ficam protegidos pelas políticas RLS do banco.
// Os valores padrão apontam para o projeto Supabase oficial do app; para usar outro
// projeto, defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.
const DEFAULT_SUPABASE_URL = "https://qxgblksieynolyqsedxr.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_qW7P8_egzrU8yzyyfMKYPA_VR1YypWt";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
