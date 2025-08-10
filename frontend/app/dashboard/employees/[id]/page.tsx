"use client"

import { useParams } from "next/navigation"
import { useGetEmployeeQuery } from "@/lib/api/employeeApi"
import EmployeeDetails from "@/components/employees/employee-details"

export default function EmployeeDetailsPage() {
  const params = useParams()
  const id = params.id as string

  const { data: employee, isLoading, error } = useGetEmployeeQuery(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Employee Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">
          The employee you're looking for doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  return <EmployeeDetails employee={employee} />
}
