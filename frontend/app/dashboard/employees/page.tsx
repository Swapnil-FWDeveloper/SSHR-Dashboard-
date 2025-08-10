"use client"

import { useState } from "react"
import { useGetEmployeesQuery } from "@/lib/api/employeeApi"
import EmployeeList from "@/components/employees/employee-list"
import EmployeeFilters from "@/components/employees/employee-filters"
import EmployeeSearch from "@/components/employees/employee-search"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function EmployeesPage() {
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const queryParams = {
    ...filters,
    search,
    sort_by: sortBy,
    sort_order: sortOrder,
  }

  const { data: employees = [], isLoading, error } = useGetEmployeesQuery(queryParams)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Employees</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage employee records and assessments</p>
        </div>
        <Link href="/dashboard/employees/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <EmployeeFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <EmployeeSearch
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={(field, order) => {
              setSortBy(field)
              setSortOrder(order)
            }}
          />
          <EmployeeList employees={employees} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  )
}
