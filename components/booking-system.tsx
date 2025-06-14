"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, User, CheckCircle, X } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

interface BookingSystemProps {
  type: "webinar" | "test" | "mentorship"
  title: string
  mentor?: string
  price?: string
  duration?: string
  onClose: () => void
}

export function BookingSystem({ type, title, mentor, price, duration, onClose }: BookingSystemProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    notes: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsBooked(true)

    // Auto close after 3 seconds
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    })
  }

  if (isBooked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <Card className="card-dark max-w-md w-full">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <h3 className="font-heading text-2xl font-bold text-white mb-4">Booking Confirmed!</h3>
            <p className="text-gray-300 mb-6">
              Your {type} "{title}" has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            <Button onClick={onClose} className="btn-primary">
              Close
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="card-dark">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">Book {type}</CardTitle>
              <p className="text-gray-400 mt-2">{title}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </Button>
          </CardHeader>
          <CardContent className="p-8">
            {/* Booking Details */}
            <div className="mb-8 p-4 bg-gray-900 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {mentor && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-gray-300">Mentor: {mentor}</span>
                  </div>
                )}
                {duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Duration: {duration}</span>
                  </div>
                )}
                {price && (
                  <div className="flex items-center">
                    <span className="text-gray-300">Price: </span>
                    <Badge className="ml-2 bg-blue-600 text-white">{price}</Badge>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <Input value={user?.name || ""} disabled className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input value={user?.email || ""} disabled className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <Input
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              {/* Date and Time Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                  <Input
                    name="date"
                    type="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                  <Input
                    name="time"
                    type="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes (Optional)</label>
                <Textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  placeholder="Any specific topics you'd like to focus on..."
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Terms */}
              <div className="flex items-center">
                <input
                  id="booking-terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-gray-800"
                  required
                />
                <label htmlFor="booking-terms" className="ml-2 block text-sm text-gray-300">
                  I agree to the booking terms and cancellation policy
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 btn-primary">
                  {isLoading ? "Booking..." : `Book ${type}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
