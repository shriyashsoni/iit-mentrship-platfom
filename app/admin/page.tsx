"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, Video, GraduationCap, Settings, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { checkAdminAccess } from "@/lib/admin-auth"
import { TestSeriesManager } from "@/components/admin/test-series-manager"
import { WebinarManager } from "@/components/admin/webinar-manager"
import { MentorshipManager } from "@/components/admin/mentorship-manager"
import { UserManager } from "@/components/admin/user-manager"
import { AdminStats } from "@/components/admin/admin-stats"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function verifyAdmin() {
      if (!isLoading && user) {
        const adminAccess = await checkAdminAccess(user.email)
        if (!adminAccess) {
          router.push("/")
          return
        }
        setIsAdmin(true)
      } else if (!isLoading && !user) {
        router.push("/login")
      }
      setLoading(false)
    }

    verifyAdmin()
  }, [user, isLoading, router])

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "tests", name: "Test Series", icon: BookOpen },
    { id: "webinars", name: "Webinars", icon: Video },
    { id: "mentorship", name: "Mentorship", icon: GraduationCap },
    { id: "users", name: "Users", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-heading text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-2">
                Welcome, {user?.name} • Super Admin
                <Badge className="ml-2 bg-red-600 text-white text-xs">ADMIN</Badge>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900 border-gray-700">
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <div className="mt-8">
              <TabsContent value="overview">
                <AdminStats />
              </TabsContent>

              <TabsContent value="tests">
                <TestSeriesManager />
              </TabsContent>

              <TabsContent value="webinars">
                <WebinarManager />
              </TabsContent>

              <TabsContent value="mentorship">
                <MentorshipManager />
              </TabsContent>

              <TabsContent value="users">
                <UserManager />
              </TabsContent>

              <TabsContent value="settings">
                <Card className="card-dark">
                  <CardHeader>
                    <CardTitle className="text-white">System Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">System settings and configuration options will be available here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
