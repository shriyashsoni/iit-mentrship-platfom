"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Star,
  ArrowRight,
  Play,
  MessageCircle,
  Target,
  Zap,
  Brain,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Crack JEE with IIT Bombay Mentors"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    { icon: Users, label: "20,000+", description: "Students Mentored", color: "from-blue-600 to-blue-400" },
    { icon: GraduationCap, label: "100+", description: "IIT Bombay Mentors", color: "from-yellow-500 to-yellow-300" },
    { icon: BookOpen, label: "500+", description: "Test Papers", color: "from-purple-600 to-purple-400" },
    { icon: Trophy, label: "98%", description: "Success Rate", color: "from-green-600 to-green-400" },
  ]

  const features = [
    {
      icon: Brain,
      title: "IIT Bombay Mentors",
      description: "Get guidance from current IIT Bombay students who recently cracked JEE themselves.",
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: Target,
      title: "Personalized Roadmap",
      description: "Custom study plans designed specifically for your current level and target rank.",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: Zap,
      title: "Weekly Test Series",
      description: "Comprehensive tests following latest NTA pattern with detailed performance analytics.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Clock,
      title: "Live Doubt Sessions",
      description: "Regular live sessions for instant doubt clearing and strategy discussions.",
      color: "from-green-600 to-teal-500",
    },
  ]

  const testimonials = [
    {
      name: "Rahul Sharma",
      rank: "AIR 156",
      image: "/placeholder.svg?height=80&width=80",
      text: "The mentorship from IIT Bombay seniors helped me improve from 85%ile to 99.2%ile in just 6 months!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      rank: "AIR 289",
      image: "/placeholder.svg?height=80&width=80",
      text: "Weekly tests and personalized feedback were game-changers in my JEE preparation journey.",
      rating: 5,
    },
    {
      name: "Arjun Kumar",
      rank: "AIR 445",
      image: "/placeholder.svg?height=80&width=80",
      text: "The doubt-clearing sessions and strategy guidance made all the difference in my success.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Floating Particles Background */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge className="bg-gradient-to-r from-blue-600 to-yellow-400 text-black font-semibold px-6 py-3 text-lg mb-8">
                🎓 India's #1 IIT Bombay Mentorship Platform
              </Badge>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="font-heading text-6xl md:text-8xl font-bold leading-tight">
                <span className="text-white">Crack JEE with</span>
                <br />
                <span className="gradient-text-yellow">IIT Bombay</span>
                <br />
                <span className="gradient-text">Mentors</span>
              </h1>

              <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Join India's most trusted platform for JEE mentorship. Get personalized guidance from current IIT Bombay
                students who know exactly what it takes to crack JEE.
              </p>
            </motion.div>

            {/* Hero Image with 3D Animation */}
            <motion.div
              className="relative max-w-2xl mx-auto my-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <Image
                  src="/images/hero-illustration.jpg"
                  alt="IIT Mentorship Illustration"
                  width={800}
                  height={600}
                  className="rounded-3xl shadow-2xl animate-float"
                  priority
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-yellow-400/20"></div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button size="lg" className="btn-primary text-xl px-10 py-6 hover-glow group">
                Start Your Journey
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-10 py-6 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white group"
              >
                <Play className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
              <Button size="lg" className="btn-accent text-xl px-10 py-6 group">
                <MessageCircle className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                WhatsApp
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center justify-center space-x-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-black"
                  ></div>
                ))}
              </div>
              <div className="text-lg text-gray-400">
                <span className="text-yellow-400 font-semibold">2000+</span> students joined this month
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-dark text-center hover-glow group cursor-pointer">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 font-heading">{stat.label}</div>
                    <div className="text-gray-400 font-medium">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              ✨ Why Choose Apna Counsellor
            </Badge>
            <h2 className="font-heading text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="gradient-text block">Crack JEE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From personalized mentorship to comprehensive test series, we provide all the tools and guidance you need
              for JEE success.
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

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2">
              🌟 Success Stories
            </Badge>
            <h2 className="font-heading text-5xl font-bold text-white mb-6">
              What Our Students
              <span className="gradient-text-yellow block">Achieved</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from students who cracked JEE with our IIT Bombay mentorship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-dark hover-glow group cursor-pointer h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full mr-4 border-2 border-blue-600"
                      />
                      <div>
                        <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold">
                          {testimonial.rank}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 italic leading-relaxed mb-6">"{testimonial.text}"</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
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
            <h2 className="font-heading text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <span className="gradient-text-yellow block">JEE Journey?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Join thousands of students who are already on their path to IIT success with our expert mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary text-lg px-10 py-6 hover-glow">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-10 py-6"
              >
                Talk to Counsellor
              </Button>
            </div>
            <motion.p
              className="text-yellow-400 mt-6 text-sm font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🔥 Limited slots available - Only 1 mentor per 20 students!
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
