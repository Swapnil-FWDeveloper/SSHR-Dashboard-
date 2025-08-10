"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteEmployeeMutation } from "@/lib/api/employeeApi"
import type { Employee } from "@/lib/api/employeeApi"
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Star,
  Target,
  Heart,
  BookOpen,
  Trash,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface EmployeeDetailsProps {
  employee: Employee
}

export default function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [deleteEmployee] = useDeleteEmployeeMutation()
  const router = useRouter()

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id).unwrap()
      toast.success("Employee deleted successfully!", {
        description: "The employee record has been removed.",
      })
      router.push("/dashboard/employees") // Redirect after deletion
    } catch (err) {
      toast.error("Failed to delete employee.", {
        description: "There was an error deleting the employee record.",
      })
      console.error("Failed to delete employee:", err)
    }
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/employees">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Employees
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employee Details</h1>
            <p className="text-muted-foreground mt-1">View and manage employee information and assessments</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/employees/${employee._id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Employee
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete Employee
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  <span className="font-semibold">{employee.name}</span>'s record and remove their data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(employee._id!)}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-foreground mb-2">{employee.name}</h2>
                <p className="text-muted-foreground mb-4">{employee.role}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{employee.email}</span>
                  </div>

                  {employee.submission_date && (
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Submitted: {new Date(employee.submission_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-center space-x-2">
                    {employee.assessment_submitted ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Assessment Complete
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-destructive" />
                        <Badge variant="secondary">Assessment Pending</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {employee.tags && employee.tags.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Tags & Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {employee.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span>Career Focus</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{employee.long_term_goals || "Not specified"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <span>Work Culture Preference</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {employee.work_culture_preference || "Not specified"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Learning Attitude</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground">{employee.learning_attitude || "Not assessed"}</p>
                      {employee.learning_score && (
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{employee.learning_score}</span>
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span>Interest Area</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{employee.interest_area || "Not specified"}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6">
              {employee.assessment_submitted && employee.assessment_answers ? (
                <div className="space-y-4">
                  {assessmentQuestions.map((question) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base text-foreground">{question.label}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {question.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {employee.assessment_answers[question.id] || "No response provided"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Assessment Data</h3>
                    <p className="text-muted-foreground">This employee hasn't submitted their assessment yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personality Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Leadership Potential</span>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Team Collaboration</span>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Innovation Mindset</span>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Development Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2 text-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Technical skill advancement</span>
                      </li>
                      <li className="flex items-center space-x-2 text-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Leadership development</span>
                      </li>
                      <li className="flex items-center space-x-2 text-foreground">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Cross-functional collaboration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
