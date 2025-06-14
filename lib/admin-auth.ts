import { supabase } from "@/lib/supabase"

export async function checkAdminAccess(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.from("admin_users").select("*").eq("email", email).single()

    if (error || !data) {
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking admin access:", error)
    return false
  }
}

export async function getAdminRole(email: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.from("admin_users").select("role").eq("email", email).single()

    if (error || !data) {
      return null
    }

    return data.role
  } catch (error) {
    console.error("Error getting admin role:", error)
    return null
  }
}
