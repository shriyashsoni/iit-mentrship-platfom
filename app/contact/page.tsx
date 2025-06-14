"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Get instant responses from our team",
      contact: "+91 91098 81906",
      action: "Chat Now",
      color: "from-green-600 to-green-400",
      available: "24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our counselors",
      contact: "+91 91098 81906",
      action: "Call Now",
      color: "from-blue-600 to-blue-400",
      available: "9 AM - 9 PM",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed queries",
      contact: "apnacounsellor@gmail.com",
      action: "Send Email",
      color: "from-purple-600 to-purple-400",
      available: "24-48 hrs response",
    },
    {
      icon: Calendar,
      title: "Book a Call",
      description: "Schedule a personalized session",
      contact: "Free 30-min consultation",
      action: "Book Now",
      color: "from-yellow-600 to-yellow-400",
      available: "Mon-Sat",
    },
  ]

  const officeLocations = [
    {
      city: "Mumbai",
      address: "Andheri East, Mumbai, Maharashtra 400069",
      type: "Head Office",
      phone: "+91 91098 81906",
      email: "mumbai@apnacounsellor.com",
    },
    {
      city: "Kota",
      address: "Coaching Hub Area, Kota, Rajasthan",
      type: "Regional Office",
      phone: "+91 91098 81906",
      email: "kota@apnacounsellor.com",
    },
    {
      city: "Patna",
      address: "Boring Road, Patna, Bihar",
      type: "Regional Office",
      phone: "+91 91098 81906",
      email: "patna@apnacounsellor.com",
    },
  ]

  const faqs = [
    {
      question: "How quickly do you respond to queries?",
      answer:
        "WhatsApp queries are answered within 30 minutes during business hours. Email queries get responses within 24-48 hours.",
    },
    {
      question: "Can I speak to a mentor directly?",
      answer:
        "Yes! You can book a free 30-minute consultation call with our mentors to discuss your preparation strategy.",
    },
    {
      question: "Do you provide support in regional languages?",
      answer:
        "Currently, we provide support in English and Hindi. We're working on adding more regional languages soon.",
    },
    {
      question: "What are your office hours?",
      answer:
        "Our phone support is available from 9 AM to 9 PM, Monday to Saturday. WhatsApp support is available 24/7.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-black to-blue-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-4 py-2">
              📞 We're Here to Help
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8">
              Get in Touch with
              <span className="gradient-text-yellow block">Our Expert</span>
              <span className="gradient-text block">Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Have questions about JEE preparation, mentorship, or our programs? Our team of IIT Bombay mentors and
              counselors is ready to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow text-lg px-8 py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now
              </Button>
              <Button size="lg" className="btn-accent text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Choose Your Preferred Way to Connect</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multiple ways to reach us - pick what works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-dark h-full hover-glow group cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3 text-white">{method.title}</h3>
                    <p className="text-gray-400 mb-4">{method.description}</p>
                    <div className="text-blue-400 font-medium mb-2">{method.contact}</div>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300 mb-6">
                      {method.available}
                    </Badge>
                    <Button className="w-full btn-primary">{method.action}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                  <p className="text-gray-400">Fill out the form and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="bg-gray-800 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-gray-800 border-gray-700 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What can we help you with?"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your query..."
                        rows={5}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full btn-primary text-lg py-3">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Locations */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-heading text-2xl font-semibold mb-6 text-white">Our Locations</h3>
                <div className="space-y-6">
                  {officeLocations.map((location, index) => (
                    <Card key={index} className="card-dark">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="font-heading text-lg font-semibold text-white">{location.city}</h4>
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                            {location.type}
                          </Badge>
                        </div>
                        <div className="space-y-3 text-gray-300">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-blue-400 mr-3" />
                            <span className="text-sm">{location.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-green-400 mr-3" />
                            <span className="text-sm">{location.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-purple-400 mr-3" />
                            <span className="text-sm">{location.email}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold mb-6 text-white">Business Hours</h3>
                <Card className="card-dark">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-blue-400 mr-3" />
                          <span className="text-gray-300">Phone Support</span>
                        </div>
                        <span className="text-white font-medium">9 AM - 9 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MessageCircle className="h-5 w-5 text-green-400 mr-3" />
                          <span className="text-gray-300">WhatsApp</span>
                        </div>
                        <span className="text-white font-medium">24/7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-purple-400 mr-3" />
                          <span className="text-gray-300">Email Response</span>
                        </div>
                        <span className="text-white font-medium">24-48 hrs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="card-dark">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-3 text-white">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-6">Ready to Start Your JEE Journey?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Don't wait - reach out to us today and take the first step towards your IIT dream
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary hover-glow">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start WhatsApp Chat
              </Button>
              <Button size="lg" className="btn-accent">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Button>
            </div>
            <motion.p
              className="text-yellow-400 mt-6 text-sm font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🎯 Free 30-minute consultation with IIT Bombay mentors!
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
