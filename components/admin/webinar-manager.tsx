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

interface Webinar {
  id: string
  title: string
  description: string
  speaker_id: string
  speaker_name?: string
  webinar_date: string
  webinar_time: string
  duration: number
  max_attendees: number
  attendees_count: number
  category: string
  level: string
  price: number
  topics: string[]
  thumbnail_url: string
  is_live: boolean
  is_recorded: boolean
  recording_url: string
  is_active: boolean
  created_at: string
}

interface Speaker {
  id: string
  full_name: string
  email: string
}

export function WebinarManager() {
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    speaker_id: "",
    webinar_date: "",
    webinar_time: "",
    duration: 90,
    max_attendees: 1000,
    category: "",
    level: "All Levels",
    price: 0,
    topics: "",
    thumbnail_url: "",
    is_live: false,
    is_recorded: false,
    recording_url: "",
    is_active: true,
  })

  useEffect(() => {
    fetchWebinars()
    fetchSpeakers()
  }, [])

  async function fetchWebinars() {
    try {
      const { data, error } = await supabase
        .from("webinars")
        .select(`
          *,
          profiles!webinars_speaker_id_fkey(full_name)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      const webinarsWithSpeakerNames =
        data?.map((webinar) => ({
          ...webinar,
          speaker_name: webinar.profiles?.full_name || "Unknown",
        })) || []

      setWebinars(webinarsWithSpeakerNames)
    } catch (error) {
      console.error("Error fetching webinars:", error)
      toast({
        title: "Error",
        description: "Failed to fetch webinars",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function fetchSpeakers() {
    try {
      const { data, error } = await supabase.from("profiles").select("id, full_name, email").eq("is_mentor", true)

      if (error) throw error
      setSpeakers(data || [])
    } catch (error) {
      console.error("Error fetching speakers:", error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const webinarData = {
        ...formData,
        topics: formData.topics
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean),
        price: Number(formData.price),
        duration: Number(formData.duration),
        max_attendees: Number(formData.max_attendees),
      }

      if (editingWebinar) {
        const { error } = await supabase.from("webinars").update(webinarData).eq("id", editingWebinar.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Webinar updated successfully",
        })
      } else {
        const { error } = await supabase.from("webinars").insert([webinarData])

        if (error) throw error
        toast({
          title: "Success",
          description: "Webinar created successfully",
        })
      }

      setIsDialogOpen(false)
      setEditingWebinar(null)
      resetForm()
      fetchWebinars()
    } catch (error) {
      console.error("Error saving webinar:", error)
      toast({
        title: "Error",
        description: "Failed to save webinar",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this webinar?")) return

    try {
      const { error } = await supabase.from("webinars").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Webinar deleted successfully",
      })
      fetchWebinars()
    } catch (error) {
      console.error("Error deleting webinar:", error)
      toast({
        title: "Error",
        description: "Failed to delete webinar",
        variant: "destructive",
      })
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      speaker_id: "",
      webinar_date: "",
      webinar_time: "",
      duration: 90,
      max_attendees: 1000,
      category: "",
      level: "All Levels",
      price: 0,
      topics: "",
      thumbnail_url: "",
      is_live: false,
      is_recorded: false,
      recording_url: "",
      is_active: true,
    })
  }

  function handleEdit(webinar: Webinar) {
    setEditingWebinar(webinar)
    setFormData({
      title: webinar.title,
      description: webinar.description,
      speaker_id: webinar.speaker_id,
      webinar_date: webinar.webinar_date?.split("T")[0] || "",
      webinar_time: webinar.webinar_time || "",
      duration: webinar.duration,
      max_attendees: webinar.max_attendees,
      category: webinar.category,
      level: webinar.level,
      price: webinar.price,
      topics: webinar.topics?.join(", ") || "",
      thumbnail_url: webinar.thumbnail_url,
      is_live: webinar.is_live,
      is_recorded: webinar.is_recorded,
      recording_url: webinar.recording_url,
      is_active: webinar.is_active,
    })
    setIsDialogOpen(true)
  }

  const filteredWebinars = webinars.filter(
    (webinar) =>
      webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.speaker_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Webinar Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="btn-primary"
              onClick={() => {
                resetForm()
                setEditingWebinar(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Webinar
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">{editingWebinar ? "Edit Webinar" : "Create New Webinar"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="speaker" className="text-white">
                    Speaker
                  </Label>
                  <Select
                    value={formData.speaker_id}
                    onValueChange={(value) => setFormData({ ...formData, speaker_id: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select speaker" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {speakers.map((speaker) => (
                        <SelectItem key={speaker.id} value={speaker.id} className="text-white">
                          {speaker.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., Physics, Strategy"
                  />
                </div>
                <div>
                  <Label htmlFor="level" className="text-white">
                    Level
                  </Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="All Levels" className="text-white">
                        All Levels
                      </SelectItem>
                      <SelectItem value="Beginner" className="text-white">
                        Beginner
                      </SelectItem>
                      <SelectItem value="Intermediate" className="text-white">
                        Intermediate
                      </SelectItem>
                      <SelectItem value="Advanced" className="text-white">
                        Advanced
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="max_attendees" className="text-white">
                    Max Attendees
                  </Label>
                  <Input
                    id="max_attendees"
                    type="number"
                    value={formData.max_attendees}
                    onChange={(e) => setFormData({ ...formData, max_attendees: Number(e.target.value) })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="webinar_date" className="text-white">
                    Webinar Date
                  </Label>
                  <Input
                    id="webinar_date"
                    type="date"
                    value={formData.webinar_date}
                    onChange={(e) => setFormData({ ...formData, webinar_date: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="webinar_time" className="text-white">
                    Webinar Time
                  </Label>
                  <Input
                    id="webinar_time"
                    type="time"
                    value={formData.webinar_time}
                    onChange={(e) => setFormData({ ...formData, webinar_time: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="topics" className="text-white">
                  Topics (comma separated)
                </Label>
                <Input
                  id="topics"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Time Management, Problem Solving, Exam Strategy"
                />
              </div>

              <div>
                <Label htmlFor="thumbnail_url" className="text-white">
                  Thumbnail URL
                </Label>
                <Input
                  id="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              <div>
                <Label htmlFor="recording_url" className="text-white">
                  Recording URL (if recorded)
                </Label>
                <Input
                  id="recording_url"
                  value={formData.recording_url}
                  onChange={(e) => setFormData({ ...formData, recording_url: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="https://example.com/recording.mp4"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_live"
                    checked={formData.is_live}
                    onChange={(e) => setFormData({ ...formData, is_live: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_live" className="text-white">
                    Live
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_recorded"
                    checked={formData.is_recorded}
                    onChange={(e) => setFormData({ ...formData, is_recorded: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_recorded" className="text-white">
                    Recorded
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_active" className="text-white">
                    Active
                  </Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Saving..." : editingWebinar ? "Update" : "Create"}
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
          placeholder="Search webinars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white"
        />
      </div>

      {/* Webinars List */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading webinars...</p>
          </div>
        ) : filteredWebinars.length === 0 ? (
          <Card className="card-dark">
            <CardContent className="text-center py-8">
              <p className="text-gray-400">No webinars found</p>
            </CardContent>
          </Card>
        ) : (
          filteredWebinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="card-dark hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{webinar.title}</h3>
                        <Badge className={webinar.is_active ? "bg-green-600" : "bg-gray-600"}>
                          {webinar.is_active ? "Active" : "Inactive"}
                        </Badge>
                        {webinar.is_live && <Badge className="bg-red-600">LIVE</Badge>}
                        {webinar.is_recorded && <Badge className="bg-blue-600">Recorded</Badge>}
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {webinar.level}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-3">{webinar.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Speaker: </span>
                          <span className="text-white">{webinar.speaker_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration: </span>
                          <span className="text-white">{webinar.duration} min</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Category: </span>
                          <span className="text-white">{webinar.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price: </span>
                          <span className="text-white">₹{webinar.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Attendees: </span>
                          <span className="text-white">
                            {webinar.attendees_count}/{webinar.max_attendees}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date: </span>
                          <span className="text-white">
                            {webinar.webinar_date ? new Date(webinar.webinar_date).toLocaleDateString() : "Not set"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Time: </span>
                          <span className="text-white">{webinar.webinar_time || "Not set"}</span>
                        </div>
                      </div>
                      {webinar.topics && webinar.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {webinar.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(webinar)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(webinar.id)}>
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
