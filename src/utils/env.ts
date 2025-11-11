interface AppConfig {
  supabase: {
    url?: string;
    anonKey?: string;
  };
}

// Accessing environment variables for Vite
// VITE_ is the prefix for environment variables that are exposed to the client-side code.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const config: AppConfig = {
  supabase: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  },
};
