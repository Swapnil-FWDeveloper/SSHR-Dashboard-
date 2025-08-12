"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Mail, Briefcase, CheckCircle, XCircle, Eye, Calendar, Star, Trash, Edit } from "lucide-react"
import { toast } from "sonner"
import { Download } from "lucide-react" // Import Download component

interface EmployeeListProps {
  employees: Employee[]
  isLoading: boolean
  error: any
}

export default function EmployeeList({ employees, isLoading, error }: EmployeeListProps) {
  const [deleteEmployee] = useDeleteEmployeeMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id).unwrap()
      toast.success("Employee deleted successfully!", {
        description: "The employee record has been removed.",
      })
    } catch (err) {
      toast.error("Failed to delete employee.", {
        description: "There was an error deleting the employee record.",
      })
      console.error("Failed to delete employee:", err)
    }
  }

  const handleDownloadCSV = () => {
    if (employees.length === 0) {
      toast.info("No employee data to export.", {
        description: "Add some employees first!",
      })
      return
    }

    const headers = [
      "ID",
      "Name",
      "Email",
      "Role",
      "Assessment Submitted",
      "Submission Date",
      "Interest Area",
      "Long-Term Goals",
      "Work Culture Preference",
      "Learning Attitude",
      "Learning Score",
      ...Object.keys(employees[0]?.assessment_answers || {}).map((q) => `Q${q.substring(1)}`),
      "Tags",
    ]

    const rows = employees.map((emp) => {
      const answers = Object.values(emp.assessment_answers || {})
      return [
        emp._id,
        emp.name,
        emp.email,
        emp.role,
        emp.assessment_submitted ? "Yes" : "No",
        emp.submission_date ? new Date(emp.submission_date).toLocaleDateString() : "N/A",
        emp.interest_area || "N/A",
        emp.long_term_goals || "N/A",
        emp.work_culture_preference || "N/A",
        emp.learning_attitude || "N/A",
        emp.learning_score || "N/A",
        ...answers,
        emp.tags.join(", "),
      ]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`)
        .join(",") // Escape quotes and join
    })

    const csvContent = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "employee_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success("Employee data exported!", {
      description: "CSV file downloaded successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Error Loading Employees</h3>
          <p className="text-muted-foreground">There was an error loading the employee data. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  if (employees.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
          <p className="text-muted-foreground">
            No employees match your current filters. Try adjusting your search criteria.
          </p>
          <Button onClick={handleDownloadCSV} variant="outline" className="mt-4 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download All Data
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleDownloadCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </div>
      {employees.map((employee) => (
        <Card key={employee._id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{employee.name}</h3>
                    {employee.assessment_submitted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{employee.role}</span>
                    </div>
                    {employee.submission_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(employee.submission_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant={employee.assessment_submitted ? "default" : "secondary"}>
                      {employee.assessment_submitted ? "Assessment Complete" : "Pending Assessment"}
                    </Badge>

                    {employee.learning_score && (
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Learning Score: {employee.learning_score}</span>
                      </Badge>
                    )}
                  </div>

                  {employee.tags && employee.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {employee.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {employee.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{employee.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

        <div className="flex items-center space-x-2 mt-4 md:mt-0">
  <Link href={`/dashboard/employees/${employee._id}`}>
    <Button variant="outline" size="sm" className="cursor-pointer">
      <Eye className="h-4 w-4 mr-1" />
      View
    </Button>
  </Link>
  <Link href={`/dashboard/employees/${employee._id}/edit`}>
    <Button variant="outline" size="sm" className="cursor-pointer">
      <Edit className="h-4 w-4 mr-1" />
      Edit
    </Button>
  </Link>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive" size="sm" className="cursor-pointer">
        <Trash className="h-4 w-4 mr-1" />
        Delete
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
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handleDelete(employee._id!)}
          className="bg-destructive hover:bg-destructive/90 cursor-pointer"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>

            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
