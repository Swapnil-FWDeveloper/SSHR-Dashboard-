"use client"

import { useParams } from "next/navigation"
import { useGetEmployeeQuery } from "@/lib/api/employeeApi"
import EditEmployeeForm from "@/components/employees/edit-employee-form"

export default function EditEmployeePage() {
  const params = useParams()
  const id = params.id as string

  const { data: employee, isLoading, error } = useGetEmployeeQuery(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Employee Not Found</h2>
        <p className="text-muted-foreground">The employee you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Edit Employee</h2>
        <p className="text-muted-foreground mt-2">Update employee details and assessment responses</p>
      </div>
      <EditEmployeeForm employee={employee} />
    </div>
  )
}
