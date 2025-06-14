"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Award, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { BookingSystem } from "@/components/booking-system"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function WebinarsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
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

  const upcomingWebinars = [
    {
      id: 1,
      title: "JEE 2024 Strategy & Last Minute Tips",
      speaker: "Abhishek Gowda",
      college: "IIT Bombay",
      image: "/images/abhishek.png",
      date: "2024-01-20",
      time: "7:00 PM",
      duration: "90 minutes",
      attendees: 2500,
      maxAttendees: 3000,
      category: "strategy",
      description: "Complete roadmap for JEE 2024 preparation with insider tips from IIT Bombay student",
      topics: ["Time Management", "Revision Strategy", "Exam Day Tips", "Subject Prioritization"],
      level: "All Levels",
      price: "Free",
    },
    {
      id: 2,
      title: "Physics Problem Solving Masterclass",
      speaker: "Kartikey Mittal",
      college: "IIT Bombay",
      image: "/images/kartikey.png",
      date: "2024-01-22",
      time: "6:00 PM",
      duration: "120 minutes",
      attendees: 1800,
      maxAttendees: 2000,
      category: "physics",
      description: "Advanced problem-solving techniques for JEE Physics with live demonstrations",
      topics: ["Mechanics Shortcuts", "Thermodynamics Tricks", "Wave Problems", "Modern Physics"],
      level: "Advanced",
      price: "₹99",
    },
    {
      id: 3,
      title: "Chemistry Organic Reactions Deep Dive",
      speaker: "Nupur Dewangan",
      college: "IIT Bombay",
      image: "/images/nupur.png",
      date: "2024-01-25",
      time: "8:00 PM",
      duration: "100 minutes",
      attendees: 2200,
      maxAttendees: 2500,
      category: "chemistry",
      description: "Master organic chemistry reactions with memory techniques and pattern recognition",
      topics: ["Reaction Mechanisms", "Name Reactions", "Stereochemistry", "Synthesis Problems"],
      level: "Intermediate",
      price: "₹149",
    },
  ]

  const pastWebinars = [
    {
      id: 1,
      title: "Mathematics Integration Techniques",
      speaker: "Shriyash Soni",
      views: 15000,
      rating: 4.9,
      duration: "85 minutes",
      thumbnail: "/images/webinar-thumbnail.png",
      price: "₹199",
    },
    {
      id: 2,
      title: "JEE Advanced Pattern Analysis 2023",
      speaker: "Abhishek Gowda",
      views: 12500,
      rating: 4.8,
      duration: "95 minutes",
      thumbnail: "/images/webinar-thumbnail.png",
      price: "₹149",
    },
    {
      id: 3,
      title: "Chemistry Inorganic Memory Techniques",
      speaker: "Nupur Dewangan",
      views: 18000,
      rating: 4.9,
      duration: "75 minutes",
      thumbnail: "/images/webinar-thumbnail.png",
      price: "₹99",
    },
  ]

  const categories = [
    { id: "all", name: "All Webinars", count: 25 },
    { id: "strategy", name: "JEE Strategy", count: 8 },
    { id: "physics", name: "Physics", count: 6 },
    { id: "chemistry", name: "Chemistry", count: 7 },
    { id: "mathematics", name: "Mathematics", count: 4 },
  ]

  const speakers = [
    {
      name: "Shriyash Soni",
      title: "Founder & Vision Mentor",
      college: "Founder of Apna Counsellor",
      image: "/images/shriyash-founder.jpg",
      webinars: 15,
      rating: 4.9,
      specialization: "Overall Strategy & Motivation",
    },
    {
      name: "Abhishek Gowda",
      title: "Physics Expert",
      college: "IIT Bombay",
      image: "/images/abhishek.png",
      webinars: 12,
      rating: 4.8,
      specialization: "Physics & Problem Solving",
    },
    {
      name: "Kartikey Mittal",
      title: "Mathematics Expert",
      college: "IIT Bombay",
      image: "/images/kartikey.png",
      webinars: 10,
      rating: 4.9,
      specialization: "Mathematics & Calculus",
    },
    {
      name: "Nupur Dewangan",
      title: "Chemistry Expert",
      college: "IIT Bombay",
      image: "/images/nupur.png",
      webinars: 14,
      rating: 4.8,
      specialization: "Chemistry & Organic Reactions",
    },
  ]

  const handleBooking = (webinar: any, type: "webinar" | "test" | "mentorship" = "webinar") => {
    if (!user) {
      router.push("/login")
      return
    }

    setBookingData({
      show: true,
      type,
      title: webinar.title,
      mentor: webinar.speaker || webinar.mentor,
      price: webinar.price,
      duration: webinar.duration,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black to-blue-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-4 py-2">
              🎥 Live & Recorded Sessions
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8">
              Expert Webinars by
              <span className="gradient-text-yellow block">IIT Bombay</span>
              <span className="gradient-text block">Mentors</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Join live interactive sessions with current IIT Bombay students and our experienced founder. Get insider
              tips, strategies, and subject expertise directly from those who've cracked JEE.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow text-lg px-8 py-6">
                <Bell className="mr-2 h-5 w-5" />
                Join Next Webinar
              </Button>
              <Button size="lg" className="btn-accent text-lg px-8 py-6">
                Browse All Webinars
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Upcoming Live Webinars</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't miss these exclusive sessions with IIT Bombay mentors
            </p>
          </motion.div>

          <div className="grid gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="card-dark hover-glow">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-6">
                          <Image
                            src={webinar.image || "/placeholder.svg"}
                            alt={webinar.speaker}
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-blue-600"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-red-600 text-white">LIVE</Badge>
                              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                                {webinar.level}
                              </Badge>
                              <Badge className="bg-green-600 text-white">{webinar.price}</Badge>
                            </div>
                            <h3 className="font-heading text-2xl font-semibold mb-3 text-white">{webinar.title}</h3>
                            <div className="flex items-center gap-4 mb-4 text-gray-300">
                              <div className="flex items-center">
                                <Award className="h-4 w-4 mr-1 text-blue-400" />
                                <span className="font-medium">{webinar.speaker}</span>
                                <span className="text-gray-500 ml-1">({webinar.college})</span>
                              </div>
                            </div>
                            <p className="text-gray-400 mb-4">{webinar.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {webinar.topics.map((topic, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-gray-800 text-gray-300">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center p-4 bg-gray-900 rounded-lg">
                          <div className="text-2xl font-bold text-white mb-2">{webinar.date}</div>
                          <div className="text-blue-400 font-medium">{webinar.time}</div>
                          <div className="text-gray-400 text-sm">{webinar.duration}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-2">
                            {webinar.attendees}/{webinar.maxAttendees} registered
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                              style={{ width: `${(webinar.attendees / webinar.maxAttendees) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button onClick={() => handleBooking(webinar)} className="w-full btn-primary">
                            Register Now
                          </Button>
                          <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Webinars */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Recorded Webinars</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access our library of recorded sessions anytime, anywhere
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pastWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-dark hover-glow group cursor-pointer">
                  <div className="relative">
                    <Image
                      src={webinar.thumbnail || "/placeholder.svg"}
                      alt={webinar.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-blue-600 text-white">{webinar.price}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-3 text-white">{webinar.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-400 font-medium">{webinar.speaker}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white">{webinar.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{webinar.views.toLocaleString()} views</span>
                      <span>{webinar.duration}</span>
                    </div>
                    <Button onClick={() => handleBooking(webinar)} className="w-full btn-primary">
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Meet Our Expert Speakers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn from the best - our founder and current IIT Bombay students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((speaker, index) => (
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
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto border-4 border-gray-700 group-hover:border-blue-500 transition-colors"
                      />
                      {speaker.name === "Shriyash Soni" && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold">
                          👑 Founder
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2 text-white">{speaker.name}</h3>
                    <p className="text-blue-400 font-medium mb-2">{speaker.title}</p>
                    <p className="text-gray-400 text-sm mb-3">{speaker.college}</p>
                    <p className="text-gray-500 text-sm mb-4">{speaker.specialization}</p>
                    <div className="flex items-center justify-center mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-white">{speaker.rating}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {speaker.webinars} webinars
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Never Miss a Webinar</h2>
            <p className="text-xl text-gray-300 mb-10">
              Subscribe to get notified about upcoming live sessions and new recorded content
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow">
                <Bell className="mr-2 h-5 w-5" />
                Enable Notifications
              </Button>
              <Button size="lg" className="btn-accent">
                Browse All Webinars
              </Button>
            </div>
            <motion.p
              className="text-yellow-400 mt-6 text-sm font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🎯 New webinars every week with IIT Bombay mentors!
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
