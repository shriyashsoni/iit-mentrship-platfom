"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  BarChart3,
  Target,
  Download,
  Play,
  Star,
  Trophy,
  Zap,
  Brain,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { BookingSystem } from "@/components/booking-system"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function TestSeriesPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [upcomingTests, setUpcomingTests] = useState<any[]>([])
  const [mentorProfiles, setMentorProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [bookingData, setBookingData] = useState<{
    show: boolean
    type: "webinar" | "test" | "mentorship"
    title: string
    mentor?: string
    price?: string
    duration?: string
  } | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchTestSeries()
    fetchMentors()
  }, [])

  async function fetchTestSeries() {
    try {
      const { data, error } = await supabase
        .from("test_series")
        .select(`
          *,
          profiles!test_series_mentor_id_fkey(full_name)
        `)
        .eq("is_active", true)
        .order("test_date", { ascending: true })

      if (error) throw error

      const testsWithMentorNames =
        data?.map((test) => ({
          id: test.id,
          title: test.title,
          mentor: `${test.profiles?.full_name} (IIT Bombay)`,
          date: test.test_date ? new Date(test.test_date).toISOString().split("T")[0] : "2024-01-15",
          time: test.test_time || "10:00 AM",
          duration: `${test.duration} min`,
          questions: test.questions,
          difficulty: test.difficulty,
          enrolled: test.enrolled_count,
          maxStudents: test.max_students,
          tags: test.tags || [],
          price: test.price,
        })) || []

      setUpcomingTests(testsWithMentorNames)
    } catch (error) {
      console.error("Error fetching test series:", error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchMentors() {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("is_mentor", true).limit(3)

      if (error) throw error

      const mentorsData =
        data?.map((mentor) => ({
          name: mentor.full_name,
          college: "IIT Bombay",
          subject: mentor.mentor_subjects?.[0] || "General",
          testsCreated: Math.floor(Math.random() * 50) + 20, // Random for demo
          image: `/images/${mentor.full_name.toLowerCase().split(" ")[0]}.png`,
          specialization: mentor.mentor_specialization || "Expert",
          rating: mentor.mentor_rating || 4.8,
        })) || []

      setMentorProfiles(mentorsData)
    } catch (error) {
      console.error("Error fetching mentors:", error)
    }
  }

  const handleBooking = async (test: any, type: "test" = "test") => {
    if (!user) {
      router.push("/login")
      return
    }

    // Create booking in database
    try {
      const { error } = await supabase.from("bookings").insert([
        {
          user_id: user.id,
          booking_type: type,
          item_id: test.id,
          amount: test.price || 0,
          status: "pending",
        },
      ])

      if (error) throw error

      setBookingData({
        show: true,
        type,
        title: test.title || test.name,
        mentor: test.mentor,
        price: test.price ? `₹${test.price}` : "Free",
        duration: test.duration,
      })
    } catch (error) {
      console.error("Error creating booking:", error)
    }
  }

  const testTypes = [
    {
      title: "Weekly Topic Tests",
      description: "Chapter-wise tests covering specific topics by IIT Bombay mentors",
      duration: "90 minutes",
      questions: "30 questions",
      frequency: "Every week",
      price: "₹149/month",
      features: [
        "Topic-wise coverage by IIT experts",
        "Instant results & analysis",
        "Detailed solutions with explanations",
        "Performance analytics dashboard",
        "Mentor-reviewed question bank",
      ],
      color: "from-blue-600 to-cyan-500",
      icon: BookOpen,
    },
    {
      title: "Monthly Mock Tests",
      description: "Full-length JEE Main & Advanced pattern tests by IIT Bombay toppers",
      duration: "3 hours",
      questions: "90 questions",
      frequency: "Monthly",
      price: "₹199/month",
      features: [
        "Latest JEE pattern by IIT mentors",
        "All India ranking system",
        "Detailed performance analysis",
        "Improvement suggestions",
        "Mock interview preparation",
      ],
      color: "from-purple-600 to-pink-500",
      icon: Trophy,
      popular: true,
    },
    {
      title: "Previous Year Tests",
      description: "Actual JEE papers with IIT Bombay mentor insights",
      duration: "3 hours",
      questions: "90 questions",
      frequency: "On-demand",
      price: "₹99/month",
      features: [
        "Actual JEE papers (2010-2024)",
        "Year-wise sorting & analysis",
        "Trend analysis by IIT experts",
        "Topic distribution insights",
        "Success pattern recognition",
      ],
      color: "from-green-600 to-teal-500",
      icon: Brain,
    },
  ]

  const pastResults = [
    {
      test: "JEE Main Mock Test #12",
      score: 285,
      maxScore: 300,
      rank: 156,
      percentile: 99.2,
      date: "2024-01-10",
      improvement: "+15%",
    },
    {
      test: "Thermodynamics Test",
      score: 27,
      maxScore: 30,
      rank: 45,
      percentile: 98.5,
      date: "2024-01-08",
      improvement: "+8%",
    },
    {
      test: "Algebra - Complex Numbers",
      score: 25,
      maxScore: 30,
      rank: 89,
      percentile: 97.8,
      date: "2024-01-05",
      improvement: "+12%",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "IIT Bombay Curated",
      description: "Every test is designed and reviewed by current IIT Bombay students",
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed performance insights with personalized improvement suggestions",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: Target,
      title: "Latest JEE Pattern",
      description: "Tests follow the most recent NTA pattern and difficulty level",
      color: "from-green-600 to-teal-500",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback with detailed solutions and explanations",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-black to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-4 py-2">
              🧪 Designed by IIT Bombay Toppers
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8">
              Master JEE with
              <span className="gradient-text-yellow block">Expert Test Series</span>
              <span className="gradient-text block">by IIT Bombay</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Comprehensive test series designed by current IIT Bombay students following the latest NTA pattern with
              detailed performance analytics and personalized mentorship insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow text-lg px-8 py-6 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Try 1 Free Test
              </Button>
              <Button size="lg" className="btn-accent text-lg px-8 py-6 group">
                Subscribe for ₹149/month
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              Why Our Test Series is
              <span className="gradient-text block">Different</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Created by IIT Bombay students who recently cracked JEE themselves
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="card-dark h-full hover-glow group cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Types */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Choose Your Test Series</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Different test formats to match your preparation stage and goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`card-dark hover-glow h-full relative ${type.popular ? "ring-2 ring-blue-500" : ""}`}>
                  {type.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <type.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">{type.title}</CardTitle>
                    <p className="text-gray-400">{type.description}</p>
                    <div className="text-4xl font-bold gradient-text mt-4">{type.price}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-300">
                        <Clock className="h-5 w-5 text-gray-500 mr-3" />
                        <span>{type.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <BookOpen className="h-5 w-5 text-gray-500 mr-3" />
                        <span>{type.questions}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                        <span>{type.frequency}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() =>
                        handleBooking({ title: type.title, price: type.price, duration: type.duration }, "test")
                      }
                      className={`w-full ${type.popular ? "btn-primary" : "btn-accent"}`}
                    >
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tests */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Upcoming Tests by IIT Bombay Mentors</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Register for upcoming tests and track your preparation progress
            </p>
          </motion.div>

          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading tests...</p>
              </div>
            ) : upcomingTests.length === 0 ? (
              <Card className="card-dark">
                <CardContent className="text-center py-8">
                  <p className="text-gray-400">No upcoming tests found</p>
                </CardContent>
              </Card>
            ) : (
              upcomingTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="card-dark hover-glow">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6 items-center">
                        <div>
                          <h3 className="font-heading text-lg font-semibold mb-2 text-white">{test.title}</h3>
                          <div className="flex items-center text-sm text-blue-400 mb-2">
                            <Award className="h-4 w-4 mr-1" />
                            {test.mentor}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            {test.date} at {test.time}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-300">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            {test.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                            {test.questions} questions
                          </div>
                          <Badge
                            variant={
                              test.difficulty === "Hard"
                                ? "destructive"
                                : test.difficulty === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="bg-gray-800"
                          >
                            {test.difficulty}
                          </Badge>
                        </div>

                        <div>
                          <div className="text-sm text-gray-400 mb-2">
                            {test.enrolled}/{test.maxStudents} enrolled
                          </div>
                          <Progress value={(test.enrolled / test.maxStudents) * 100} className="h-2 bg-gray-800" />
                          <div className="flex flex-wrap gap-1 mt-3">
                            {test.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button onClick={() => handleBooking(test)} className="w-full btn-primary">
                            Register Now
                          </Button>
                          <Button variant="outline" size="sm" className="w-full border-gray-600 text-gray-300">
                            View Syllabus
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-blue-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl font-bold text-white mb-6">Detailed Performance Analytics</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get comprehensive insights into your performance with detailed analytics, ranking comparisons, and
                personalized improvement suggestions from IIT Bombay mentors.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-blue-400 mr-3" />
                  <span className="text-gray-300">Subject-wise performance breakdown</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                  <span className="text-gray-300">Progress tracking over time</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-6 w-6 text-purple-400 mr-3" />
                  <span className="text-gray-300">Personalized improvement suggestions</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-orange-400 mr-3" />
                  <span className="text-gray-300">All India ranking and percentile</span>
                </div>
              </div>

              <Button className="mt-8 btn-primary" size="lg">
                View Sample Report
              </Button>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-2xl font-semibold mb-4 text-white">Recent Test Results</h3>
              {pastResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="card-dark">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-white">{result.test}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                            {result.date}
                          </Badge>
                          <Badge className="bg-green-600 text-white">{result.improvement}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Score: </span>
                          <span className="font-semibold text-white">
                            {result.score}/{result.maxScore}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Rank: </span>
                          <span className="font-semibold text-white">{result.rank}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Percentile: </span>
                          <span className="font-semibold text-green-400">{result.percentile}%</span>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                            <Download className="h-4 w-4 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Test Creators */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Meet Your Test Creators</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our test series is created by current IIT Bombay students who recently cracked JEE themselves
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {mentorProfiles.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-dark text-center hover-glow group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <Image
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto border-4 border-gray-700 group-hover:border-blue-500 transition-colors"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2 text-white">{mentor.name}</h3>
                    <p className="text-blue-400 font-medium mb-2">{mentor.college}</p>
                    <p className="text-gray-400 mb-3">{mentor.subject} Expert</p>
                    <p className="text-sm text-gray-500 mb-4">{mentor.specialization}</p>
                    <div className="flex items-center justify-center mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-white">{mentor.rating}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {mentor.testsCreated} tests created
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Start Your Test Series Journey</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of students who are improving their JEE scores with our IIT Bombay mentor-created test
              series
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow">
                Try Free Test
              </Button>
              <Button size="lg" className="btn-accent">
                Subscribe Now
              </Button>
            </div>
            <motion.p
              className="text-yellow-400 mt-6 text-sm font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🎯 100+ new tests added every month by IIT Bombay mentors!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Booking System Modal */}
      {bookingData?.show && (
        <BookingSystem
          type={bookingData.type}
          title={bookingData.title}
          mentor={bookingData.mentor}
          price={bookingData.price}
          duration={bookingData.duration}
          onClose={() => setBookingData(null)}
        />
      )}
    </div>
  )
}
