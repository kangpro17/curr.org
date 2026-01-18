import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

// Browser Client Creator
export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables are missing. Some features may not work.');
        // Return a mock or handle gracefully - for build stability, we can return null if needed
        // but createBrowserClient usually needs strings.
    }

    return createBrowserClient<Database>(
        supabaseUrl || '',
        supabaseAnonKey || ''
    )
}
