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

interface TestSeries {
  id: string
  title: string
  description: string
  mentor_id: string
  mentor_name?: string
  duration: number
  questions: number
  difficulty: string
  price: number
  max_students: number
  enrolled_count: number
  test_date: string
  test_time: string
  tags: string[]
  syllabus: string
  is_active: boolean
  created_at: string
}

interface Mentor {
  id: string
  full_name: string
  email: string
}

export function TestSeriesManager() {
  const [tests, setTests] = useState<TestSeries[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTest, setEditingTest] = useState<TestSeries | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mentor_id: "",
    duration: 90,
    questions: 30,
    difficulty: "Medium",
    price: 0,
    max_students: 100,
    test_date: "",
    test_time: "",
    tags: "",
    syllabus: "",
    is_active: true,
  })

  useEffect(() => {
    fetchTests()
    fetchMentors()
  }, [])

  async function fetchTests() {
    try {
      const { data, error } = await supabase
        .from("test_series")
        .select(`
          *,
          profiles!test_series_mentor_id_fkey(full_name)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      const testsWithMentorNames =
        data?.map((test) => ({
          ...test,
          mentor_name: test.profiles?.full_name || "Unknown",
        })) || []

      setTests(testsWithMentorNames)
    } catch (error) {
      console.error("Error fetching tests:", error)
      toast({
        title: "Error",
        description: "Failed to fetch test series",
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const testData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        price: Number(formData.price),
        duration: Number(formData.duration),
        questions: Number(formData.questions),
        max_students: Number(formData.max_students),
      }

      if (editingTest) {
        const { error } = await supabase.from("test_series").update(testData).eq("id", editingTest.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Test series updated successfully",
        })
      } else {
        const { error } = await supabase.from("test_series").insert([testData])

        if (error) throw error
        toast({
          title: "Success",
          description: "Test series created successfully",
        })
      }

      setIsDialogOpen(false)
      setEditingTest(null)
      resetForm()
      fetchTests()
    } catch (error) {
      console.error("Error saving test:", error)
      toast({
        title: "Error",
        description: "Failed to save test series",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this test series?")) return

    try {
      const { error } = await supabase.from("test_series").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Test series deleted successfully",
      })
      fetchTests()
    } catch (error) {
      console.error("Error deleting test:", error)
      toast({
        title: "Error",
        description: "Failed to delete test series",
        variant: "destructive",
      })
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      mentor_id: "",
      duration: 90,
      questions: 30,
      difficulty: "Medium",
      price: 0,
      max_students: 100,
      test_date: "",
      test_time: "",
      tags: "",
      syllabus: "",
      is_active: true,
    })
  }

  function handleEdit(test: TestSeries) {
    setEditingTest(test)
    setFormData({
      title: test.title,
      description: test.description,
      mentor_id: test.mentor_id,
      duration: test.duration,
      questions: test.questions,
      difficulty: test.difficulty,
      price: test.price,
      max_students: test.max_students,
      test_date: test.test_date?.split("T")[0] || "",
      test_time: test.test_time || "",
      tags: test.tags?.join(", ") || "",
      syllabus: test.syllabus,
      is_active: test.is_active,
    })
    setIsDialogOpen(true)
  }

  const filteredTests = tests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.mentor_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Test Series Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="btn-primary"
              onClick={() => {
                resetForm()
                setEditingTest(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Test Series
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingTest ? "Edit Test Series" : "Create New Test Series"}
              </DialogTitle>
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
                  <Label htmlFor="questions" className="text-white">
                    Questions
                  </Label>
                  <Input
                    id="questions"
                    type="number"
                    value={formData.questions}
                    onChange={(e) => setFormData({ ...formData, questions: Number(e.target.value) })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="text-white">
                    Difficulty
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="Easy" className="text-white">
                        Easy
                      </SelectItem>
                      <SelectItem value="Medium" className="text-white">
                        Medium
                      </SelectItem>
                      <SelectItem value="Hard" className="text-white">
                        Hard
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="max_students" className="text-white">
                    Max Students
                  </Label>
                  <Input
                    id="max_students"
                    type="number"
                    value={formData.max_students}
                    onChange={(e) => setFormData({ ...formData, max_students: Number(e.target.value) })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="test_date" className="text-white">
                    Test Date
                  </Label>
                  <Input
                    id="test_date"
                    type="date"
                    value={formData.test_date}
                    onChange={(e) => setFormData({ ...formData, test_date: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="test_time" className="text-white">
                    Test Time
                  </Label>
                  <Input
                    id="test_time"
                    type="time"
                    value={formData.test_time}
                    onChange={(e) => setFormData({ ...formData, test_time: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags" className="text-white">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Physics, JEE Main, Mechanics"
                />
              </div>

              <div>
                <Label htmlFor="syllabus" className="text-white">
                  Syllabus
                </Label>
                <Textarea
                  id="syllabus"
                  value={formData.syllabus}
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={3}
                />
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

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Saving..." : editingTest ? "Update" : "Create"}
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
          placeholder="Search test series..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white"
        />
      </div>

      {/* Test Series List */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading test series...</p>
          </div>
        ) : filteredTests.length === 0 ? (
          <Card className="card-dark">
            <CardContent className="text-center py-8">
              <p className="text-gray-400">No test series found</p>
            </CardContent>
          </Card>
        ) : (
          filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="card-dark hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{test.title}</h3>
                        <Badge className={test.is_active ? "bg-green-600" : "bg-gray-600"}>
                          {test.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {test.difficulty}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-3">{test.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Mentor: </span>
                          <span className="text-white">{test.mentor_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration: </span>
                          <span className="text-white">{test.duration} min</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Questions: </span>
                          <span className="text-white">{test.questions}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price: </span>
                          <span className="text-white">₹{test.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Enrolled: </span>
                          <span className="text-white">
                            {test.enrolled_count}/{test.max_students}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date: </span>
                          <span className="text-white">
                            {test.test_date ? new Date(test.test_date).toLocaleDateString() : "Not set"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Time: </span>
                          <span className="text-white">{test.test_time || "Not set"}</span>
                        </div>
                      </div>
                      {test.tags && test.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {test.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(test)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(test.id)}>
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
