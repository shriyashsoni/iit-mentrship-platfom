"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          router.push("/login?error=auth_failed")
          return
        }

        if (data.session) {
          // Successful authentication - redirect to dashboard
          console.log("Authentication successful, redirecting to dashboard")
          router.push("/dashboard")
        } else {
          // No session found - redirect to login
          console.log("No session found, redirecting to login")
          router.push("/login")
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error)
        router.push("/login?error=unexpected")
      }
    }

    // Small delay to ensure the URL hash is processed
    const timer = setTimeout(handleAuthCallback, 100)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-bold mb-2">Completing Sign In...</h2>
        <p className="text-gray-400">Please wait while we set up your account</p>
        <div className="mt-4 text-sm text-gray-500">Redirecting to dashboard...</div>
      </motion.div>
    </div>
  )
}
