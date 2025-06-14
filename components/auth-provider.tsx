"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase, type User } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  session: Session | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Get the correct base URL for redirects
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Browser should use the current origin
    return window.location.origin
  }
  // Server should use the production URL
  return "https://iitbombaymentors.vercel.app"
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)

      if (session?.user) {
        if (event === "SIGNED_IN") {
          await createOrUpdateProfile(session.user)
        }
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        setIsLoading(false)
        return
      }

      if (profile) {
        const userData: User = {
          id: profile.id,
          name: profile.full_name || profile.email.split("@")[0],
          email: profile.email,
          plan: profile.plan || "Basic Plan",
          avatar: profile.avatar_url,
          provider: profile.provider || "email",
        }
        setUser(userData)
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createOrUpdateProfile = async (authUser: any) => {
    try {
      const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      const profileData = {
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email.split("@")[0],
        avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture,
        provider: authUser.app_metadata?.provider || "email",
        plan: existingProfile?.plan || "Basic Plan",
        updated_at: new Date().toISOString(),
      }

      if (existingProfile) {
        // Update existing profile
        await supabase.from("profiles").update(profileData).eq("id", authUser.id)
      } else {
        // Create new profile
        await supabase.from("profiles").insert({
          ...profileData,
          created_at: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error creating/updating profile:", error)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setIsLoading(false)
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Redirect will be handled by the login page
        return { success: true }
      }

      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      const baseUrl = getBaseUrl()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${baseUrl}/auth/callback`,
        },
      })

      if (error) {
        setIsLoading(false)
        return { success: false, error: error.message }
      }

      // OAuth redirect will handle the rest
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      const baseUrl = getBaseUrl()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${baseUrl}/auth/callback`,
        },
      })

      if (error) {
        setIsLoading(false)
        return { success: false, error: error.message }
      }

      if (data.user && !data.session) {
        setIsLoading(false)
        return { success: true, error: "Please check your email to confirm your account" }
      }

      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, login, loginWithGoogle, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
