"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search, Shield, User } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  full_name: string
  email: string
  plan: string
  avatar_url: string
  provider: string
  is_mentor: boolean
  mentor_subjects: string[]
  mentor_specialization: string
  mentor_rating: number
  mentor_experience: string
  is_available: boolean
  created_at: string
}

export function UserManager() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    plan: "Basic Plan",
    is_mentor: false,
    mentor_subjects: "",
    mentor_specialization: "",
    mentor_experience: "",
    is_available: true,
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const userData = {
        ...formData,
        mentor_subjects: formData.mentor_subjects
          .split(",")
          .map((subject) => subject.trim())
          .filter(Boolean),
      }

      if (editingUser) {
        const { error } = await supabase.from("profiles").update(userData).eq("id", editingUser.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "User updated successfully",
        })
      } else {
        // For creating new users, you'd typically handle this through the auth system
        toast({
          title: "Info",
          description: "New users are created through the registration process",
        })
      }

      setIsDialogOpen(false)
      setEditingUser(null)
      resetForm()
      fetchUsers()
    } catch (error) {
      console.error("Error saving user:", error)
      toast({
        title: "Error",
        description: "Failed to save user",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return

    try {
      const { error } = await supabase.from("profiles").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "User deleted successfully",
      })
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  function resetForm() {
    setFormData({
      full_name: "",
      email: "",
      plan: "Basic Plan",
      is_mentor: false,
      mentor_subjects: "",
      mentor_specialization: "",
      mentor_experience: "",
      is_available: true,
    })
  }

  function handleEdit(user: UserProfile) {
    setEditingUser(user)
    setFormData({
      full_name: user.full_name,
      email: user.email,
      plan: user.plan,
      is_mentor: user.is_mentor,
      mentor_subjects: user.mentor_subjects?.join(", ") || "",
      mentor_specialization: user.mentor_specialization || "",
      mentor_experience: user.mentor_experience || "",
      is_available: user.is_available,
    })
    setIsDialogOpen(true)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole =
      filterRole === "all" ||
      (filterRole === "mentors" && user.is_mentor) ||
      (filterRole === "students" && !user.is_mentor)

    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="btn-primary"
              onClick={() => {
                resetForm()
                setEditingUser(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Edit User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">{editingUser ? "Edit User" : "User Details"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                    disabled={!!editingUser}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="plan" className="text-white">
                  Plan
                </Label>
                <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="Basic Plan" className="text-white">
                      Basic Plan
                    </SelectItem>
                    <SelectItem value="Premium Plan" className="text-white">
                      Premium Plan
                    </SelectItem>
                    <SelectItem value="Pro Plan" className="text-white">
                      Pro Plan
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_mentor"
                  checked={formData.is_mentor}
                  onChange={(e) => setFormData({ ...formData, is_mentor: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_mentor" className="text-white">
                  Is Mentor
                </Label>
              </div>

              {formData.is_mentor && (
                <>
                  <div>
                    <Label htmlFor="mentor_subjects" className="text-white">
                      Mentor Subjects (comma separated)
                    </Label>
                    <Input
                      id="mentor_subjects"
                      value={formData.mentor_subjects}
                      onChange={(e) => setFormData({ ...formData, mentor_subjects: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Physics, Mathematics, Chemistry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mentor_specialization" className="text-white">
                      Specialization
                    </Label>
                    <Input
                      id="mentor_specialization"
                      value={formData.mentor_specialization}
                      onChange={(e) => setFormData({ ...formData, mentor_specialization: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="e.g., Mechanics & Thermodynamics"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mentor_experience" className="text-white">
                      Experience
                    </Label>
                    <Input
                      id="mentor_experience"
                      value={formData.mentor_experience}
                      onChange={(e) => setFormData({ ...formData, mentor_experience: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="e.g., 2+ years"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_available"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="is_available" className="text-white">
                      Available for Sessions
                    </Label>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Update User"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="all" className="text-white">
              All Users
            </SelectItem>
            <SelectItem value="mentors" className="text-white">
              Mentors Only
            </SelectItem>
            <SelectItem value="students" className="text-white">
              Students Only
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="card-dark">
            <CardContent className="text-center py-8">
              <p className="text-gray-400">No users found</p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="card-dark hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        {user.is_mentor ? (
                          <Shield className="h-6 w-6 text-white" />
                        ) : (
                          <User className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{user.full_name}</h3>
                          {user.is_mentor && <Badge className="bg-blue-600 text-white">Mentor</Badge>}
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {user.plan}
                          </Badge>
                          {user.is_mentor && (
                            <Badge className={user.is_available ? "bg-green-600" : "bg-red-600"}>
                              {user.is_available ? "Available" : "Busy"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 mb-2">{user.email}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Provider: </span>
                            <span className="text-white">{user.provider || "Email"}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Joined: </span>
                            <span className="text-white">{new Date(user.created_at).toLocaleDateString()}</span>
                          </div>
                          {user.is_mentor && user.mentor_rating && (
                            <div>
                              <span className="text-gray-500">Rating: </span>
                              <span className="text-white">{user.mentor_rating}/5.0</span>
                            </div>
                          )}
                          {user.is_mentor && user.mentor_experience && (
                            <div>
                              <span className="text-gray-500">Experience: </span>
                              <span className="text-white">{user.mentor_experience}</span>
                            </div>
                          )}
                        </div>
                        {user.is_mentor && user.mentor_subjects && user.mentor_subjects.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {user.mentor_subjects.map((subject, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {user.is_mentor && user.mentor_specialization && (
                          <p className="text-gray-500 text-sm mt-2">Specialization: {user.mentor_specialization}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(user.id)}>
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
