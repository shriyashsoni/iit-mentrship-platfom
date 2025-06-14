"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Video, GraduationCap, DollarSign, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface Stats {
  totalUsers: number
  totalTests: number
  totalWebinars: number
  totalSessions: number
  totalRevenue: number
  activeBookings: number
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTests: 0,
    totalWebinars: 0,
    totalSessions: 0,
    totalRevenue: 0,
    activeBookings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      // Fetch all stats in parallel
      const [
        { count: usersCount },
        { count: testsCount },
        { count: webinarsCount },
        { count: sessionsCount },
        { data: bookingsData },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("test_series").select("*", { count: "exact", head: true }),
        supabase.from("webinars").select("*", { count: "exact", head: true }),
        supabase.from("mentorship_sessions").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("amount, status").eq("payment_status", "paid"),
      ])

      const totalRevenue = bookingsData?.reduce((sum, booking) => sum + (booking.amount || 0), 0) || 0
      const activeBookings = bookingsData?.filter((booking) => booking.status === "confirmed").length || 0

      setStats({
        totalUsers: usersCount || 0,
        totalTests: testsCount || 0,
        totalWebinars: webinarsCount || 0,
        totalSessions: sessionsCount || 0,
        totalRevenue,
        activeBookings,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bgColor: "from-blue-600 to-cyan-500",
    },
    {
      title: "Test Series",
      value: stats.totalTests,
      icon: BookOpen,
      color: "text-green-400",
      bgColor: "from-green-600 to-teal-500",
    },
    {
      title: "Webinars",
      value: stats.totalWebinars,
      icon: Video,
      color: "text-purple-400",
      bgColor: "from-purple-600 to-pink-500",
    },
    {
      title: "Mentorship Sessions",
      value: stats.totalSessions,
      icon: GraduationCap,
      color: "text-yellow-400",
      bgColor: "from-yellow-500 to-orange-500",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "from-emerald-600 to-green-500",
    },
    {
      title: "Active Bookings",
      value: stats.activeBookings,
      icon: TrendingUp,
      color: "text-red-400",
      bgColor: "from-red-600 to-pink-500",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="card-dark">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-700 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="card-dark hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="card-dark">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">New user registration</p>
                  <p className="text-gray-400 text-sm">2 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">New</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Test series completed</p>
                  <p className="text-gray-400 text-sm">15 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Payment received</p>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
              </div>
              <Badge className="bg-emerald-600 text-white">₹299</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
