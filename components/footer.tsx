"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Send } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <Image src="/images/logo.jpg" alt="Apna Counsellor" width={50} height={50} className="rounded-xl" />
              <div>
                <span className="font-heading font-bold text-xl gradient-text">Apna Counsellor</span>
                <div className="text-xs text-gray-400">IIT Mentorship Platform</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's premier IIT Bombay mentorship platform for JEE preparation. Get personalized guidance from current
              IIT students and experienced mentors.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-twitter-400 hover:bg-gray-800 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-pink-400 hover:bg-gray-800 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-full"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/mentorship" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  IIT Bombay Mentorship
                </Link>
              </li>
              <li>
                <Link href="/test-series" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Test Series
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Live Webinars
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-semibold text-lg text-white">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+91 91098 81906</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">apnacounsellor@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Mumbai, Maharashtra</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-semibold text-lg text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get the latest updates on JEE preparation and mentorship tips.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
              />
              <Button className="w-full btn-primary group">
                Subscribe
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} Apna Counsellor. All rights reserved. Made with ❤️ for JEE aspirants.</p>
        </motion.div>
      </div>
    </footer>
  )
}
