"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUpdateEmployeeMutation } from "@/lib/api/employeeApi"
import type { Employee } from "@/lib/api/employeeApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface EditEmployeeFormProps {
  employee: Employee
}

export default function EditEmployeeForm({ employee }: EditEmployeeFormProps) {
  const router = useRouter()
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation()

  const [formData, setFormData] = useState<Partial<Employee>>({
    name: "",
    email: "",
    role: "",
    assessment_submitted: false,
    assessment_answers: {},
    tags: [],
    interest_area: "",
    long_term_goals: "",
    work_culture_preference: "",
    learning_attitude: "",
    learning_score: 0,
  })

  const [currentTag, setCurrentTag] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        assessment_submitted: employee.assessment_submitted,
        assessment_answers: employee.assessment_answers || {},
        tags: employee.tags || [],
        interest_area: employee.interest_area || "",
        long_term_goals: employee.long_term_goals || "",
        work_culture_preference: employee.work_culture_preference || "",
        learning_attitude: employee.learning_attitude || "",
        learning_score: employee.learning_score || 0,
      })
    }
  }, [employee])

  const assessmentQuestions = [
    { id: "q1", label: "What interests you most about your current role?", category: "Interest" },
    { id: "q2", label: "Describe your ideal work environment", category: "Work Culture" },
    { id: "q3", label: "What motivates you to perform your best?", category: "Motivation" },
    { id: "q4", label: "How do you handle challenging situations?", category: "Problem Solving" },
    { id: "q5", label: "What are your key strengths?", category: "Strengths" },
    { id: "q14", label: "Where do you see yourself in 5 years?", category: "Career Goals" },
    { id: "q16", label: "How do you approach learning new skills?", category: "Learning" },
    { id: "q17", label: "What learning resources do you prefer?", category: "Learning" },
    { id: "q19", label: "What work culture do you thrive in?", category: "Culture" },
    { id: "q20", label: "What are your long-term career aspirations?", category: "Goals" },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAssessmentChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      assessment_answers: {
        ...prev.assessment_answers,
        [questionId]: value,
      },
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!employee._id) {
      toast.error("Error: Employee ID is missing.", {
        description: "Cannot update employee without an ID.",
      })
      return
    }

    try {
      await updateEmployee({
        id: employee._id,
        employee: {
          ...formData,
          submission_date: formData.assessment_submitted
            ? employee.submission_date || new Date().toISOString()
            : undefined,
        },
      }).unwrap()
      toast.success("Employee updated successfully!", {
        description: `${formData.name}'s details have been saved.`,
      })
      router.push(`/dashboard/employees/${employee._id}`)
    } catch (error) {
      toast.error("Failed to update employee.", {
        description: "There was an error saving the employee details.",
      })
      console.error("Failed to update employee:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/dashboard/employees/${employee._id}`}>
          <Button type="button" variant="outline" size="sm" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Button>
        </Link>
        <Button type="submit" disabled={isLoading} className="cursor-pointer">
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
              Saving...
            </div>
          ) : (
            <div className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </div>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" className="cursor-pointer">Basic Information</TabsTrigger>
          <TabsTrigger value="assessment" className="cursor-pointer">Assessment</TabsTrigger>
          <TabsTrigger value="profile" className="cursor-pointer">Profile & Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="role">Role/Position *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="Senior Software Engineer">Senior Software Engineer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                    <SelectItem value="AI Researcher">AI Researcher</SelectItem>
                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                    <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                    <SelectItem value="HR Manager">HR Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer">
                <Switch
                  id="assessment_submitted"
                  checked={formData.assessment_submitted}
                  onCheckedChange={(checked) => handleInputChange("assessment_submitted", checked)}
                />
                <Label htmlFor="assessment_submitted">Assessment has been submitted</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Responses</CardTitle>
              <p className="text-sm text-muted-foreground">Fill out the employee's assessment responses (optional)</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentQuestions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={question.id} className="text-sm font-medium">
                      {question.label}
                    </Label>
                    <Badge variant="outline" className="text-xs">{question.category}</Badge>
                  </div>
                  <Textarea
                    id={question.id}
                    value={formData.assessment_answers?.[question.id] || ""}
                    onChange={(e) => handleAssessmentChange(question.id, e.target.value)}
                    placeholder="Enter response..."
                    rows={3}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interest_area">Interest Area</Label>
                  <Select
                    value={formData.interest_area}
                    onValueChange={(value) => handleInputChange("interest_area", value)}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select interest area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI Enthusiast">AI Enthusiast</SelectItem>
                      <SelectItem value="HR-Tech Passionate">HR-Tech Passionate</SelectItem>
                      <SelectItem value="Innovation Focused">Innovation Focused</SelectItem>
                      <SelectItem value="Leadership Oriented">Leadership Oriented</SelectItem>
                      <SelectItem value="Technical Excellence">Technical Excellence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="long_term_goals">Long-term Goals</Label>
                  <Select
                    value={formData.long_term_goals}
                    onValueChange={(value) => handleInputChange("long_term_goals", value)}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select goals" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Career-focused">Career-focused</SelectItem>
                      <SelectItem value="Entrepreneurial">Entrepreneurial</SelectItem>
                      <SelectItem value="Technical Excellence">Technical Excellence</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Work-life Balance">Work-life Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="work_culture_preference">Work Culture Preference</Label>
                  <Select
                    value={formData.work_culture_preference}
                    onValueChange={(value) => handleInputChange("work_culture_preference", value)}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select culture preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Healthy culture">Healthy Culture</SelectItem>
                      <SelectItem value="Salary-driven">Salary-driven</SelectItem>
                      <SelectItem value="Innovation-focused">Innovation-focused</SelectItem>
                      <SelectItem value="Work-life balance">Work-life Balance</SelectItem>
                      <SelectItem value="Collaborative">Collaborative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="learning_attitude">Learning Attitude</Label>
                  <Select
                    value={formData.learning_attitude}
                    onValueChange={(value) => handleInputChange("learning_attitude", value)}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select learning attitude" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active Learner">Active Learner</SelectItem>
                      <SelectItem value="Passive">Passive</SelectItem>
                      <SelectItem value="Self-directed">Self-directed</SelectItem>
                      <SelectItem value="Collaborative">Collaborative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="learning_score">Learning Score (0-100)</Label>
                <Input
                  id="learning_score"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.learning_score}
                  onChange={(e) => handleInputChange("learning_score", Number.parseInt(e.target.value) || 0)}
                  placeholder="Enter learning score"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags & Keywords</CardTitle>
              <p className="text-sm text-muted-foreground">Add tags to help categorize and search for this employee</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Enter a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline" className="cursor-pointer">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {(formData.tags || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(formData.tags || []).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
