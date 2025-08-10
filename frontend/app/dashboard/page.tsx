"use client"

import { useState } from "react"
import { useGetEmployeesQuery } from "@/lib/api/employeeApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, UserX, TrendingUp, Search, Download } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: employees = [], isLoading } = useGetEmployeesQuery({ search: searchQuery })

  const stats = {
    total: employees.length,
    submitted: employees.filter((emp) => emp.assessment_submitted).length,
    pending: employees.filter((emp) => !emp.assessment_submitted).length,
    completionRate:
      employees.length > 0
        ? Math.round((employees.filter((emp) => emp.assessment_submitted).length / employees.length) * 100)
        : 0,
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">Monitor employee assessment progress and key metrics</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search employees by name, email, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Active employees in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments Submitted</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
            <p className="text-xs text-muted-foreground">Completed assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting submission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Assessment completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.slice(0, 5).map((employee) => (
                <div key={employee._id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {employee.assessment_submitted ? "Submitted assessment" : "Pending assessment"}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {employee.submission_date ? new Date(employee.submission_date).toLocaleDateString() : "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/dashboard/employees" className="block">
                <Button
                  variant="outline"
                  className="w-full text-left p-3 h-auto justify-start rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors bg-transparent"
                >
                  <div className="font-medium">View All Employees</div>
                  <div className="text-sm text-muted-foreground">Manage employee records and assessments</div>
                </Button>
              </Link>
              <Link href="/dashboard/employees/add" className="block">
                <Button
                  variant="outline"
                  className="w-full text-left p-3 h-auto justify-start rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors bg-transparent"
                >
                  <div className="font-medium">Add New Employee</div>
                  <div className="text-sm text-muted-foreground">Create new employee profile</div>
                </Button>
              </Link>
              <Button
                onClick={handleDownloadCSV}
                variant="outline"
                className="w-full text-left p-3 h-auto justify-start rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors bg-transparent"
              >
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  <div className="font-medium">Export Reports</div>
                </div>
                <div className="text-sm text-muted-foreground">Download assessment data (CSV)</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
