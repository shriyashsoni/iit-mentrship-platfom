import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = "https://omariaiiqvfhztbhhcip.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  name: string
  email: string
  plan: string
  avatar?: string
  provider?: "email" | "google"
}
