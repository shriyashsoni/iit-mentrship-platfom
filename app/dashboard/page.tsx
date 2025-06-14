"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  Trophy,
} from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Get user's first name for greeting
  const firstName = user.name.split(" ")[0]

  const upcomingSessions = [
    {
      id: 1,
      title: "Physics Doubt Clearing",
      mentor: "Abhishek Gowda",
      date: "Today",
      time: "6:00 PM",
      duration: "60 min",
      type: "1-on-1",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Mathematics Group Session",
      mentor: "Kartikey Mittal",
      date: "Tomorrow",
      time: "7:00 PM",
      duration: "90 min",
      type: "Group",
      status: "confirmed",
    },
    {
      id: 3,
      title: "Chemistry Test Review",
      mentor: "Nupur Dewangan",
      date: "Jan 18",
      time: "5:00 PM",
      duration: "45 min",
      type: "1-on-1",
      status: "pending",
    },
  ]

  const recentTests = [
    {
      id: 1,
      name: "JEE Main Mock Test #15",
      score: 285,
      maxScore: 300,
      percentile: 94.5,
      rank: 1250,
      date: "Jan 12, 2024",
      subjects: {
        physics: 95,
        chemistry: 88,
        mathematics: 102,
      },
      improvement: "+5%",
    },
    {
      id: 2,
      name: "Organic Chemistry Test",
      score: 28,
      maxScore: 30,
      percentile: 96.2,
      rank: 890,
      date: "Jan 10, 2024",
      subjects: {
        chemistry: 28,
      },
      improvement: "+12%",
    },
    {
      id: 3,
      name: "Physics Mechanics Test",
      score: 26,
      maxScore: 30,
      percentile: 92.8,
      rank: 1450,
      date: "Jan 8, 2024",
      subjects: {
        physics: 26,
      },
      improvement: "+3%",
    },
  ]

  const studyProgress = {
    physics: { completed: 75, total: 100, currentTopic: "Thermodynamics" },
    chemistry: { completed: 68, total: 100, currentTopic: "Organic Reactions" },
    mathematics: { completed: 82, total: 100, currentTopic: "Coordinate Geometry" },
  }

  const achievements = [
    {
      title: "First 90+ Percentile",
      description: "Achieved 94.5 percentile in JEE Mock Test",
      date: "Jan 12, 2024",
      icon: Trophy,
      color: "text-yellow-400",
    },
    {
      title: "Consistency Champion",
      description: "Attended 15 consecutive mentorship sessions",
      date: "Jan 10, 2024",
      icon: Award,
      color: "text-blue-400",
    },
    {
      title: "Test Series Warrior",
      description: "Completed 50+ practice tests",
      date: "Jan 5, 2024",
      icon: Target,
      color: "text-green-400",
    },
  ]

  const weeklyGoals = [
    { task: "Complete Thermodynamics chapter", completed: true },
    { task: "Solve 20 organic chemistry problems", completed: true },
    { task: "Take 2 mock tests", completed: false },
    { task: "Attend all mentorship sessions", completed: false },
    { task: "Review previous test mistakes", completed: false },
  ]

  const tabs = [
    { id: "overview", name: "Overview", icon: Target },
    { id: "tests", name: "Test Results", icon: BookOpen },
    { id: "sessions", name: "Sessions", icon: Users },
    { id: "progress", name: "Progress", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-heading text-3xl font-bold text-white">Welcome back, {firstName}! 👋</h1>
              <p className="text-gray-400 mt-2">
                {user.email} • {user.plan}
                {user.provider === "google" && (
                  <Badge className="ml-2 bg-blue-600 text-white text-xs">Google Account</Badge>
                )}
              </p>
            </motion.div>
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300">
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* User Info Card */}
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-400" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-4">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-16 h-16 rounded-full border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                        <p className="text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Current Plan</h4>
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">{user.plan}</Badge>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Login Method</h4>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {user.provider === "google" ? "Google OAuth" : "Email & Password"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="card-dark">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">94.5%</div>
                    <div className="text-gray-400">Current Percentile</div>
                  </CardContent>
                </Card>
                <Card className="card-dark">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">15</div>
                    <div className="text-gray-400">Tests Completed</div>
                  </CardContent>
                </Card>
                <Card className="card-dark">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">28</div>
                    <div className="text-gray-400">Sessions Attended</div>
                  </CardContent>
                </Card>
                <Card className="card-dark">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">75%</div>
                    <div className="text-gray-400">Syllabus Complete</div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Upcoming Sessions */}
                  <Card className="card-dark">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                        Upcoming Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">{session.title}</h4>
                                <p className="text-gray-400 text-sm">
                                  {session.mentor} • {session.date} at {session.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge
                                variant={session.status === "confirmed" ? "default" : "secondary"}
                                className={session.status === "confirmed" ? "bg-green-600" : "bg-yellow-600 text-black"}
                              >
                                {session.status}
                              </Badge>
                              <Button size="sm" className="btn-primary">
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Test Performance */}
                  <Card className="card-dark">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                        Recent Test Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTests.slice(0, 3).map((test) => (
                          <div key={test.id} className="p-4 bg-gray-900 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-white">{test.name}</h4>
                              <Badge className="bg-green-600 text-white">{test.improvement}</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Score: </span>
                                <span className="text-white font-medium">
                                  {test.score}/{test.maxScore}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Percentile: </span>
                                <span className="text-green-400 font-medium">{test.percentile}%</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Rank: </span>
                                <span className="text-white font-medium">{test.rank}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Weekly Goals */}
                  <Card className="card-dark">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Target className="h-5 w-5 mr-2 text-yellow-400" />
                        Weekly Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {weeklyGoals.map((goal, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            {goal.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <span className={goal.completed ? "text-gray-400 line-through" : "text-white"}>
                              {goal.task}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-2">Progress: 2/5 completed</div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Study Progress */}
                  <Card className="card-dark">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                        Study Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(studyProgress).map(([subject, data]) => (
                          <div key={subject}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white capitalize font-medium">{subject}</span>
                              <span className="text-gray-400 text-sm">
                                {data.completed}/{data.total}
                              </span>
                            </div>
                            <Progress value={(data.completed / data.total) * 100} className="h-2 mb-1" />
                            <div className="text-xs text-gray-500">Current: {data.currentTopic}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Achievements */}
                  <Card className="card-dark">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-400" />
                        Recent Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <achievement.icon className={`h-5 w-5 mt-1 ${achievement.color}`} />
                            <div>
                              <h4 className="font-medium text-white">{achievement.title}</h4>
                              <p className="text-gray-400 text-sm">{achievement.description}</p>
                              <p className="text-gray-500 text-xs">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tab content would go here */}
          {activeTab === "tests" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-white">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Detailed test results and analytics will be displayed here.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "sessions" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-white">Mentorship Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Session history and upcoming bookings will be displayed here.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "progress" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-white">Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Detailed progress tracking and analytics will be displayed here.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
