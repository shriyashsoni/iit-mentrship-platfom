"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, X, Star, Users, BookOpen, MessageCircle, Award, TrendingUp } from "lucide-react"
import { BookingSystem } from "@/components/booking-system"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

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

  const handlePlanSelection = (plan: any) => {
    if (!user) {
      router.push("/login")
      return
    }

    setBookingData({
      show: true,
      type: "mentorship",
      title: `${plan.name} Plan`,
      price: isYearly ? `₹${Math.floor(plan.yearlyPrice / 12)}/month` : `₹${plan.monthlyPrice}/month`,
      duration: "Monthly subscription",
    })
  }

  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started with JEE preparation",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      popular: false,
      features: [
        { name: "2 group mentorship calls per month", included: true },
        { name: "2 weekly tests", included: true },
        { name: "Access to live webinars", included: true },
        { name: "Basic study materials", included: true },
        { name: "Community access", included: true },
        { name: "1-on-1 mentorship", included: false },
        { name: "Personalized roadmap", included: false },
        { name: "Priority support", included: false },
        { name: "Career guidance", included: false },
      ],
    },
    {
      name: "Pro",
      description: "Most comprehensive plan for serious JEE aspirants",
      monthlyPrice: 499,
      yearlyPrice: 4990,
      popular: true,
      features: [
        { name: "1-on-1 mentorship sessions", included: true },
        { name: "4+ weekly tests", included: true },
        { name: "Personalized study roadmap", included: true },
        { name: "Career guidance sessions", included: true },
        { name: "Priority doubt clearing", included: true },
        { name: "Performance analytics", included: true },
        { name: "Mock interview sessions", included: true },
        { name: "College selection guidance", included: true },
        { name: "WhatsApp mentor access", included: true },
      ],
    },
    {
      name: "Test-Only",
      description: "Just the test series for self-motivated students",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      popular: false,
      features: [
        { name: "Weekly test series access", included: true },
        { name: "Performance analytics", included: true },
        { name: "All India ranking", included: true },
        { name: "Previous year papers", included: true },
        { name: "Detailed solutions", included: true },
        { name: "Mentorship sessions", included: false },
        { name: "Live webinars", included: false },
        { name: "Study materials", included: false },
        { name: "Career guidance", included: false },
      ],
    },
  ]

  const coachingFeatures = [
    "Verified IIT mentors for your batches",
    "White-labeled test series with your branding",
    "Integration with existing LMS/ERP systems",
    "Dedicated mentor login panels",
    "ROI reporting and analytics",
    "Custom pricing based on student count",
    "Training sessions for your faculty",
    "Marketing support materials",
  ]

  const faqs = [
    {
      question: "What if I miss a mentorship session?",
      answer:
        "You can reschedule your session up to 24 hours in advance. Missed sessions without prior notice will be counted as used.",
    },
    {
      question: "Can I switch mentors?",
      answer:
        "Yes, you can request a mentor change once per month. We'll match you with another mentor based on your preferences.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "We offer a 7-day money-back guarantee if you're not satisfied with our services. Refunds are processed within 5-7 business days.",
    },
    {
      question: "Do you provide study materials?",
      answer:
        "Yes, Pro plan subscribers get access to comprehensive study materials, notes, and formula sheets prepared by our IIT mentors.",
    },
    {
      question: "How are the test series different from others?",
      answer:
        "Our tests are created by current IIT students who recently cleared JEE. They follow the latest NTA pattern and provide detailed performance analytics.",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600/20 via-black to-purple-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white">💰 Transparent Pricing</Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Choose Your
              <span className="block text-yellow-300">Success Plan</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Affordable plans designed for every student's needs. Start your JEE journey with the guidance of IIT
              mentors at unbeatable prices.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isYearly ? "text-white font-semibold" : "text-blue-200"}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-yellow-400" />
              <span className={`text-lg ${isYearly ? "text-white font-semibold" : "text-blue-200"}`}>Yearly</span>
              <Badge className="bg-yellow-400 text-yellow-900 ml-2">Save 17%</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative hover-scale bg-gray-800 border-gray-700 ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <p className="text-gray-300 mt-2">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-blue-400">
                      ₹{isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-300">/month</span>
                    {isYearly && <div className="text-sm text-green-400 mt-1">Billed yearly: ₹{plan.yearlyPrice}</div>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-white" : "text-gray-500"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePlanSelection(plan)}
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Start Now" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">🎁 Special Offer: Get 1 Free Webinar & Test with every plan</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                Talk to a Counsellor
              </Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Partnership */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 text-white bg-blue-600">🏫 For Coaching Institutes</Badge>
              <h2 className="font-heading text-4xl font-bold text-white mb-6">Coaching Partnership Program</h2>
              <p className="text-xl text-gray-300 mb-8">
                Enhance your coaching institute with verified IIT mentors and comprehensive test series. Custom
                solutions for coaching centers across India.
              </p>

              <div className="space-y-4 mb-8">
                {coachingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button size="lg">Book Demo for Institute</Button>
                <Button size="lg" variant="outline">
                  Download Brochure
                </Button>
              </div>
            </div>

            <Card className="p-8 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white">Custom Pricing</CardTitle>
                <p className="text-center text-gray-300">Tailored solutions based on your institute's needs</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">Contact Us</div>
                    <p className="text-gray-300">For custom pricing based on student count</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                      <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <div className="font-semibold text-white">50-200 Students</div>
                      <div className="text-gray-300">₹50/student/month</div>
                    </div>
                    <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-700">
                      <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <div className="font-semibold text-white">200+ Students</div>
                      <div className="text-gray-300">₹30/student/month</div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Schedule Demo Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Success Stories from Our Students</h2>
            <p className="text-xl text-gray-300">
              See how our affordable plans helped students achieve their IIT dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-white">Rahul Sharma</h3>
                <Badge className="mb-3">AIR 156 - Pro Plan</Badge>
                <p className="text-gray-300 italic">
                  "The Pro plan's 1-on-1 mentorship was worth every penny. My mentor helped me improve from 85%ile to
                  99.2%ile in just 6 months!"
                </p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-white">Priya Patel</h3>
                <Badge className="mb-3">AIR 289 - Basic Plan</Badge>
                <p className="text-gray-300 italic">
                  "Even with the Basic plan, the group mentorship and tests were excellent. Great value for money for
                  students from small towns like me."
                </p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-white">Arjun Kumar</h3>
                <Badge className="mb-3">AIR 445 - Test-Only</Badge>
                <p className="text-gray-300 italic">
                  "The Test-Only plan was perfect for my self-study approach. The analytics helped me identify weak
                  areas and improve systematically."
                </p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Got questions? We've got answers.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-3 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Ready to Start Your JEE Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your plan and get started with India's most affordable IIT mentorship platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start with ₹149
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Talk to Counsellor
            </Button>
          </div>
          <p className="text-blue-200 mt-4 text-sm">
            💳 Secure payments • 7-day money-back guarantee • No hidden charges
          </p>
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
