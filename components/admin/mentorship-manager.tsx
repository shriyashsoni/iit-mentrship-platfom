"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface MentorshipSession {
  id: string
  title: string
  description: string
  mentor_id: string
  student_id: string
  mentor_name?: string
  student_name?: string
  session_date: string
  session_time: string
  duration: number
  session_type: string
  price: number
  status: string
  meeting_link: string
  notes: string
  created_at: string
}

interface User {
  id: string
  full_name: string
  email: string
}

export function MentorshipManager() {
  const [sessions, setSessions] = useState<MentorshipSession[]>([])
  const [mentors, setMentors] = useState<User[]>([])
  const [students, setStudents] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSession, setEditingSession] = useState<MentorshipSession | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mentor_id: "",
    student_id: "",
    session_date: "",
    session_time: "",
    duration: 60,
    session_type: "1-on-1",
    price: 0,
    status: "scheduled",
    meeting_link: "",
    notes: "",
  })

  useEffect(() => {
    fetchSessions()
    fetchMentors()
    fetchStudents()
  }, [])

  async function fetchSessions() {
    try {
      const { data, error } = await supabase
        .from("mentorship_sessions")
        .select(`
          *,
          mentor:profiles!mentorship_sessions_mentor_id_fkey(full_name),
          student:profiles!mentorship_sessions_student_id_fkey(full_name)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      const sessionsWithNames =
        data?.map((session) => ({
          ...session,
          mentor_name: session.mentor?.full_name || "Unknown",
          student_name: session.student?.full_name || "Unknown",
        })) || []

      setSessions(sessionsWithNames)
    } catch (error) {
      console.error("Error fetching sessions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch mentorship sessions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function fetchMentors() {
    try {
      const { data, error } = await supabase.from("profiles").select("id, full_name, email").eq("is_mentor", true)

      if (error) throw error
      setMentors(data || [])
    } catch (error) {
      console.error("Error fetching mentors:", error)
    }
  }

  async function fetchStudents() {
    try {
      const { data, error } = await supabase.from("profiles").select("id, full_name, email").neq("is_mentor", true)

      if (error) throw error
      setStudents(data || [])
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const sessionData = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
      }

      if (editingSession) {
        const { error } = await supabase.from("mentorship_sessions").update(sessionData).eq("id", editingSession.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Mentorship session updated successfully",
        })
      } else {
        const { error } = await supabase.from("mentorship_sessions").insert([sessionData])

        if (error) throw error
        toast({
          title: "Success",
          description: "Mentorship session created successfully",
        })
      }

      setIsDialogOpen(false)
      setEditingSession(null)
      resetForm()
      fetchSessions()
    } catch (error) {
      console.error("Error saving session:", error)
      toast({
        title: "Error",
        description: "Failed to save mentorship session",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this mentorship session?")) return

    try {
      const { error } = await supabase.from("mentorship_sessions").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Mentorship session deleted successfully",
      })
      fetchSessions()
    } catch (error) {
      console.error("Error deleting session:", error)
      toast({
        title: "Error",
        description: "Failed to delete mentorship session",
        variant: "destructive",
      })
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      mentor_id: "",
      student_id: "",
      session_date: "",
      session_time: "",
      duration: 60,
      session_type: "1-on-1",
      price: 0,
      status: "scheduled",
      meeting_link: "",
      notes: "",
    })
  }

  function handleEdit(session: MentorshipSession) {
    setEditingSession(session)
    setFormData({
      title: session.title,
      description: session.description,
      mentor_id: session.mentor_id,
      student_id: session.student_id,
      session_date: session.session_date?.split("T")[0] || "",
      session_time: session.session_time || "",
      duration: session.duration,
      session_type: session.session_type,
      price: session.price,
      status: session.status,
      meeting_link: session.meeting_link,
      notes: session.notes,
    })
    setIsDialogOpen(true)
  }

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.mentor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.student_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Mentorship Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="btn-primary"
              onClick={() => {
                resetForm()
                setEditingSession(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingSession ? "Edit Mentorship Session" : "Create New Mentorship Session"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mentor" className="text-white">
                    Mentor
                  </Label>
                  <Select
                    value={formData.mentor_id}
                    onValueChange={(value) => setFormData({ ...formData, mentor_id: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select mentor" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {mentors.map((mentor) => (
                        <SelectItem key={mentor.id} value={mentor.id} className="text-white">
                          {mentor.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="student" className="text-white">
                    Student
                  </Label>
                  <Select
                    value={formData.student_id}
                    onValueChange={(value) => setFormData({ ...formData, student_id: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id} className="text-white">
                          {student.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="session_type" className="text-white">
                    Session Type
                  </Label>
                  <Select
                    value={formData.session_type}
                    onValueChange={(value) => setFormData({ ...formData, session_type: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="1-on-1" className="text-white">
                        1-on-1
                      </SelectItem>
                      <SelectItem value="Group" className="text-white">
                        Group
                      </SelectItem>
                      <SelectItem value="Roadmap" className="text-white">
                        Roadmap
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration" className="text-white">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-white">
                    Price (₹)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session_date" className="text-white">
                    Session Date
                  </Label>
                  <Input
                    id="session_date"
                    type="date"
                    value={formData.session_date}
                    onChange={(e) => setFormData({ ...formData, session_date: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="session_time" className="text-white">
                    Session Time
                  </Label>
                  <Input
                    id="session_time"
                    type="time"
                    value={formData.session_time}
                    onChange={(e) => setFormData({ ...formData, session_time: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="text-white">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="scheduled" className="text-white">
                      Scheduled
                    </SelectItem>
                    <SelectItem value="confirmed" className="text-white">
                      Confirmed
                    </SelectItem>
                    <SelectItem value="completed" className="text-white">
                      Completed
                    </SelectItem>
                    <SelectItem value="cancelled" className="text-white">
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="meeting_link" className="text-white">
                  Meeting Link
                </Label>
                <Input
                  id="meeting_link"
                  value={formData.meeting_link}
                  onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-white">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Saving..." : editingSession ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search sessions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white"
        />
      </div>

      {/* Sessions List */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading sessions...</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <Card className="card-dark">
            <CardContent className="text-center py-8">
              <p className="text-gray-400">No mentorship sessions found</p>
            </CardContent>
          </Card>
        ) : (
          filteredSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="card-dark hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{session.title}</h3>
                        <Badge
                          className={
                            session.status === "confirmed"
                              ? "bg-green-600"
                              : session.status === "completed"
                                ? "bg-blue-600"
                                : session.status === "cancelled"
                                  ? "bg-red-600"
                                  : "bg-yellow-600 text-black"
                          }
                        >
                          {session.status}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {session.session_type}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-3">{session.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Mentor: </span>
                          <span className="text-white">{session.mentor_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Student: </span>
                          <span className="text-white">{session.student_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration: </span>
                          <span className="text-white">{session.duration} min</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price: </span>
                          <span className="text-white">₹{session.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date: </span>
                          <span className="text-white">
                            {session.session_date ? new Date(session.session_date).toLocaleDateString() : "Not set"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Time: </span>
                          <span className="text-white">{session.session_time || "Not set"}</span>
                        </div>
                      </div>
                      {session.meeting_link && (
                        <div className="mt-3">
                          <span className="text-gray-500">Meeting: </span>
                          <a
                            href={session.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                      {session.notes && (
                        <div className="mt-3">
                          <span className="text-gray-500">Notes: </span>
                          <span className="text-gray-300">{session.notes}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(session)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(session.id)}>
                        <Trash2 className="h-4 w-4" />
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
  )
}
