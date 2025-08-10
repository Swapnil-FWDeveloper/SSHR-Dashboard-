"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, SortAsc, SortDesc } from "lucide-react"

interface EmployeeSearchProps {
  search: string
  onSearchChange: (search: string) => void
  sortBy: string
  sortOrder: "asc" | "desc"
  onSortChange: (field: string, order: "asc" | "desc") => void
}

export default function EmployeeSearch({
  search,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
}: EmployeeSearchProps) {
  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Role", value: "role" },
    { label: "Submission Date", value: "submission_date" },
    { label: "Learning Score", value: "learning_score" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search employees by name, email, or keywords..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            Sort by {sortOptions.find((opt) => opt.value === sortBy)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {sortOptions.map((option) => (
            <div key={option.value}>
              <DropdownMenuItem onClick={() => onSortChange(option.value, "asc")} className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                {option.label} (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange(option.value, "desc")} className="flex items-center gap-2">
                <SortDesc className="h-4 w-4" />
                {option.label} (Z-A)
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
