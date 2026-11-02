import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY
)?.trim();

/**
 * Checks whether valid Supabase environment variables are present.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseKey.includes('placeholder') &&
    supabaseUrl.startsWith('https://')
  );
};

let clientInstance: SupabaseClient | null = null;

/**
 * Returns the singleton Supabase client instance, or throws a clear
 * descriptive error if the environment is unconfigured.
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase configuration missing: Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local.'
    );
  }

  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl!, supabaseKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  return clientInstance;
};
