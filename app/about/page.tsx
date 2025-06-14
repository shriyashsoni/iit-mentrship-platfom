"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Target, Heart, TrendingUp, Globe, BookOpen, Star } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, number: "20,000+", label: "Students Mentored" },
    { icon: Award, number: "100+", label: "IIT Mentors" },
    { icon: TrendingUp, number: "95%", label: "Success Rate" },
    { icon: Globe, number: "50+", label: "Cities Reached" },
  ]

  const timeline = [
    {
      year: "2023",
      title: "Foundation",
      description:
        "Apna Counsellor was founded by IITians with a vision to make quality mentorship accessible to every JEE aspirant.",
    },
    {
      year: "2023",
      title: "First 1,000 Students",
      description: "Reached our first milestone of mentoring 1,000 students with personalized guidance and support.",
    },
    {
      year: "2024",
      title: "Kota & Patna Centers",
      description: "Expanded to coaching hubs in Kota and Patna, partnering with local institutes for better reach.",
    },
    {
      year: "2024",
      title: "B2B Onboarding",
      description:
        "Launched coaching partnership program, helping institutes integrate IIT mentorship into their curriculum.",
    },
    {
      year: "2024",
      title: "20,000+ Community",
      description: "Built a thriving community of over 20,000 students across India, from Tier-1 to Tier-3 cities.",
    },
  ]

  const team = [
    {
      name: "Shriyash Soni",
      role: "Founder & Vision Mentor",
      image: "/placeholder.svg?height=200&width=200",
      description: "Passionate about making IIT mentorship accessible to every student in India.",
      achievements: ["3+ years experience", "1200+ students guided", "Platform architect"],
    },
    {
      name: "Abhishek Gowda",
      role: "Core Mentor - IIT Bombay",
      image: "/images/abhishek.png",
      description: "Physics expert and JEE strategy specialist helping students crack tough concepts.",
      achievements: ["B.Tech Electrical", "JEE Advanced Rank Holder", "500+ students mentored"],
    },
    {
      name: "Kartikey Mittal",
      role: "Core Mentor - IIT Bombay",
      image: "/images/kartikey.png",
      description: "Mathematics and Mechanics expert with a calm, student-friendly approach.",
      achievements: ["Mechanical Engineering", "Math Expert", "400+ students guided"],
    },
    {
      name: "Nupur Dewangan",
      role: "Counselling Expert",
      image: "/images/nupur.png",
      description: "Specializes in JoSAA counselling and helping students make informed college choices.",
      achievements: ["Counselling Specialist", "College Prediction Expert", "600+ students helped"],
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Student-First Approach",
      description: "Every decision we make is centered around what's best for our students' success and growth.",
    },
    {
      icon: Target,
      title: "Accessibility",
      description: "Making quality IIT mentorship affordable and accessible to students from all backgrounds.",
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Providing top-notch guidance through experienced mentors who've walked the same path.",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Creating a supportive ecosystem where students learn, grow, and succeed together.",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white">🚀 Our Story</Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Democratizing
              <span className="block text-yellow-300">IIT Mentorship</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Founded by IITians who understand the struggles of JEE preparation, we're on a mission to make quality
              mentorship accessible to every aspirant in India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 mb-8">
                To bridge the gap between IIT dreams and reality by providing affordable, high-quality mentorship to
                students from every corner of India, especially those from Tier-2 and Tier-3 cities who lack access to
                premium guidance.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Accessible Mentorship</h3>
                    <p className="text-gray-300">
                      Making IIT guidance available at affordable prices for every student.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Personalized Guidance</h3>
                    <p className="text-gray-300">Tailored mentorship based on individual student needs and goals.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Holistic Development</h3>
                    <p className="text-gray-300">
                      Not just academic support, but overall personality and career development.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/mentorship-illustration.jpg"
                alt="Mentorship - IIT mentor guiding student"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do at Apna Counsellor</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300">From a small idea to impacting thousands of students across India</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <Card className={`w-full max-w-md ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
                  <CardContent className="p-6">
                    <Badge className="mb-3">{item.year}</Badge>
                    <h3 className="font-heading text-xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Meet Our Core Team</h2>
            <p className="text-xl text-gray-300">The passionate individuals making IIT mentorship accessible to all</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-heading text-xl font-semibold mb-2 text-white">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4">{member.description}</p>

                  <div className="space-y-1">
                    {member.achievements.map((achievement, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs mr-1">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Recognition & Impact</h2>
            <p className="text-xl text-gray-300">
              Our work has been recognized by students, parents, and education experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-3 text-white">Student Testimonials</h3>
                <p className="text-gray-300">
                  Over 500+ positive reviews from students who achieved their IIT dreams with our guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-3 text-white">Media Coverage</h3>
                <p className="text-gray-300">
                  Featured in leading education publications for our innovative approach to JEE mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-3 text-white">Community Impact</h3>
                <p className="text-gray-300">
                  Building a supportive community of 20,000+ students helping each other succeed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the movement to make quality education accessible to every student in India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Become a Mentor
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
