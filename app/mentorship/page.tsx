"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, CheckCircle, Users, Clock, Target, Award } from "lucide-react"
import { motion } from "framer-motion"
import { BookingSystem } from "@/components/booking-system"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function MentorshipPage() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)

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

  const handleBooking = (item: any, type: "mentorship" = "mentorship") => {
    if (!user) {
      router.push("/login")
      return
    }

    setBookingData({
      show: true,
      type,
      title: item.title || `Session with ${item.name}`,
      mentor: item.name,
      price: item.price,
      duration: item.duration || "60 minutes",
    })
  }

  const mentors = [
    {
      id: "shriyash",
      name: "Shriyash Soni",
      title: "Founder & Vision Mentor",
      college: "Founder of Apna Counsellor",
      image: "/images/shriyash-founder.jpg",
      experience: "3+ years",
      students: "1200+",
      specialization: ["Strategy Building", "Roadmap Planning", "Overall Guidance"],
      achievements: ["Founder of Apna Counsellor", "Mentored 1000+ students", "Expert in student counseling"],
      rating: 4.9,
      available: true,
      isFounder: true,
    },
    {
      id: "abhishek",
      name: "Abhishek Gowda",
      title: "Core Mentor",
      college: "IIT Bombay",
      image: "/images/abhishek.png",
      experience: "2+ years",
      students: "500+",
      specialization: ["Physics", "JEE Strategy", "Doubt Clearing"],
      achievements: ["B.Tech Electrical Engineering", "JEE Advanced Rank Holder", "Physics Expert"],
      rating: 4.8,
      available: true,
      isFounder: false,
    },
    {
      id: "kartikey",
      name: "Kartikey Mittal",
      title: "Core Mentor",
      college: "IIT Bombay",
      image: "/images/kartikey.png",
      experience: "2+ years",
      students: "400+",
      specialization: ["Mathematics", "Mechanics", "College Selection"],
      achievements: ["Mechanical Engineering Student", "Math Expert", "Helped 200+ with college choice"],
      rating: 4.9,
      available: true,
      isFounder: false,
    },
    {
      id: "sahasra",
      name: "Sahasra Oleti",
      title: "Academic Support Lead",
      college: "IIT Bombay",
      image: "/images/sahasra.png",
      experience: "1+ years",
      students: "300+",
      specialization: ["Academic Mentorship", "Female Students Support", "Confidence Building"],
      achievements: ["Peer Teaching Expert", "Early-stage Aspirant Specialist", "Webinar Contributor"],
      rating: 4.7,
      available: false,
      isFounder: false,
    },
    {
      id: "nupur",
      name: "Nupur Dewangan",
      title: "Counselling Expert",
      college: "IIT Bombay",
      image: "/images/nupur.png",
      experience: "2+ years",
      students: "600+",
      specialization: ["JoSAA Counselling", "CSAB Process", "Document Verification"],
      achievements: ["College Prediction Expert", "Admission Specialist", "Parent Communication Expert"],
      rating: 4.8,
      available: true,
      isFounder: false,
    },
    {
      id: "dhruv",
      name: "Dhruv Chaturvedi",
      title: "Mentor & Counsellor",
      college: "IIT Bombay",
      image: "/images/dhruv.png",
      experience: "1+ years",
      students: "250+",
      specialization: ["Academic Planning", "Goal Setting", "Performance Tracking"],
      achievements: ["Class 10-12 Specialist", "Habit Formation Expert", "Consistency Coach"],
      rating: 4.6,
      available: true,
      isFounder: false,
    },
  ]

  const mentorshipTypes = [
    {
      title: "1-on-1 Mentorship",
      description: "Personal guidance sessions with dedicated IIT Bombay mentors",
      features: ["Weekly 45-min calls", "Personalized study plan", "Direct WhatsApp access", "Progress tracking"],
      price: "₹499/month",
      popular: true,
      icon: Users,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Group Mentorship",
      description: "Small group sessions with 5-8 students per mentor",
      features: ["Bi-weekly group calls", "Peer learning", "Group discussions", "Shared resources"],
      price: "₹299/month",
      popular: false,
      icon: Target,
      color: "from-purple-600 to-pink-500",
    },
    {
      title: "Roadmap Planning",
      description: "Comprehensive preparation strategy and timeline",
      features: ["Detailed study roadmap", "Subject-wise planning", "Monthly milestones", "Regular reviews"],
      price: "₹199/month",
      popular: false,
      icon: Clock,
      color: "from-green-600 to-teal-500",
    },
  ]

  const process = [
    {
      step: 1,
      title: "Choose Your Plan",
      description: "Select the mentorship type that suits your needs and goals",
      icon: Target,
    },
    {
      step: 2,
      title: "Get Matched",
      description: "We assign you the best IIT Bombay mentor based on your requirements",
      icon: Users,
    },
    {
      step: 3,
      title: "Start Learning",
      description: "Begin your personalized mentorship journey with expert guidance",
      icon: Award,
    },
    {
      step: 4,
      title: "Track Progress",
      description: "Monitor your improvement with regular assessments and feedback",
      icon: CheckCircle,
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
              👨‍🏫 By IIT Bombay Students, For Future IITians
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8">
              Get Mentored by
              <span className="gradient-text-yellow block">IIT Bombay</span>
              <span className="gradient-text block">Toppers</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Personal guidance from current IIT Bombay students and our experienced founder who know exactly what it
              takes to crack JEE and succeed in top engineering colleges.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow text-lg px-8 py-6">
                Book Demo Call
              </Button>
              <Button size="lg" className="btn-accent text-lg px-8 py-6">
                Subscribe for ₹299/month
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentorship Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Choose Your Mentorship Style</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible options designed to fit your learning preferences and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {mentorshipTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`card-dark relative hover-glow h-full ${type.popular ? "ring-2 ring-blue-500" : ""}`}>
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
                    <ul className="space-y-4 mb-8">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleBooking(type)}
                      className={`w-full ${type.popular ? "btn-primary" : "btn-accent"}`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Mentors */}
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
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Meet Your Mentors</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn from the best - our founder and current IIT Bombay students who've been in your shoes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className={`card-dark hover-glow cursor-pointer h-full ${mentor.isFounder ? "ring-2 ring-yellow-500" : ""}`}
                  onClick={() => setSelectedMentor(mentor.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      {mentor.isFounder && (
                        <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold">
                          👑 Founder
                        </Badge>
                      )}

                      <div className="relative mb-6">
                        <Image
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          width={120}
                          height={120}
                          className="rounded-full mx-auto border-4 border-gray-700"
                        />
                        <div
                          className={`absolute bottom-0 right-1/2 transform translate-x-6 w-4 h-4 rounded-full border-2 border-black ${
                            mentor.available ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                      </div>

                      <h3 className="font-heading text-xl font-semibold mb-2 text-white">{mentor.name}</h3>
                      <p className="text-blue-400 font-medium mb-2">{mentor.title}</p>

                      <div className="flex items-center justify-center mb-4">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-400">{mentor.college}</span>
                      </div>

                      <div className="flex items-center justify-center mb-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-white">{mentor.rating}</span>
                        <span className="text-gray-500 ml-2">({mentor.students} students)</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {mentor.specialization.slice(0, 2).map((spec, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleBooking(mentor)}
                        className={`w-full ${mentor.available ? "btn-primary" : "bg-gray-700 text-gray-400"}`}
                        disabled={!mentor.available}
                      >
                        {mentor.available ? "Book Session" : "Currently Busy"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">How Mentorship Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple steps to start your personalized JEE preparation journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>

                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-x-4 -translate-y-1/2"></div>
                )}
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
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Start Your Mentorship Journey Today</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of students who are already getting mentored by IIT Bombay toppers and our experienced
              founder
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow">
                Book Free Demo
              </Button>
              <Button size="lg" className="btn-accent">
                Choose Your Plan
              </Button>
            </div>
            <motion.p
              className="text-yellow-400 mt-6 text-sm font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🔥 Limited slots - Only 1 mentor per 20 students!
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
