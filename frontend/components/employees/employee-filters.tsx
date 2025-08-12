"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface EmployeeFiltersProps {
  filters: Record<string, string>
  onFiltersChange: (filters: Record<string, string>) => void
}

export default function EmployeeFilters({ filters, onFiltersChange }: EmployeeFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    if (value === "all") {
      const newFilters = { ...filters }
      delete newFilters[key]
      onFiltersChange(newFilters)
    } else {
      onFiltersChange({ ...filters, [key]: value })
    }
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="cursor-pointer">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status">Assessment Status</Label>
          <Select value={filters.status || "all"} onValueChange={(value) => updateFilter("status", value)}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Statuses</SelectItem>
              <SelectItem value="submitted" className="cursor-pointer">Submitted</SelectItem>
              <SelectItem value="not_submitted" className="cursor-pointer">Not Submitted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select value={filters.role || "all"} onValueChange={(value) => updateFilter("role", value)}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Roles</SelectItem>
              <SelectItem value="Software Engineer" className="cursor-pointer">Software Engineer</SelectItem>
              <SelectItem value="Product Manager" className="cursor-pointer">Product Manager</SelectItem>
              <SelectItem value="Designer" className="cursor-pointer">Designer</SelectItem>
              <SelectItem value="Data Scientist" className="cursor-pointer">Data Scientist</SelectItem>
              <SelectItem value="AI Researcher" className="cursor-pointer">AI Researcher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="interest_area">Interest Area</Label>
          <Select
            value={filters.interest_area || "all"}
            onValueChange={(value) => updateFilter("interest_area", value)}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All interests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Interests</SelectItem>
              <SelectItem value="AI Enthusiast" className="cursor-pointer">AI Enthusiast</SelectItem>
              <SelectItem value="HR-Tech Passionate" className="cursor-pointer">HR-Tech Passionate</SelectItem>
              <SelectItem value="Innovation Focused" className="cursor-pointer">Innovation Focused</SelectItem>
              <SelectItem value="Leadership Oriented" className="cursor-pointer">Leadership Oriented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="long_term_goals">Long-term Goals</Label>
          <Select
            value={filters.long_term_goals || "all"}
            onValueChange={(value) => updateFilter("long_term_goals", value)}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All goals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Goals</SelectItem>
              <SelectItem value="Career-focused" className="cursor-pointer">Career-focused</SelectItem>
              <SelectItem value="Entrepreneurial" className="cursor-pointer">Entrepreneurial</SelectItem>
              <SelectItem value="Technical Excellence" className="cursor-pointer">Technical Excellence</SelectItem>
              <SelectItem value="Leadership" className="cursor-pointer">Leadership</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="work_culture_preference">Work Culture</Label>
          <Select
            value={filters.work_culture_preference || "all"}
            onValueChange={(value) => updateFilter("work_culture_preference", value)}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All cultures" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Cultures</SelectItem>
              <SelectItem value="Healthy culture" className="cursor-pointer">Healthy Culture</SelectItem>
              <SelectItem value="Salary-driven" className="cursor-pointer">Salary-driven</SelectItem>
              <SelectItem value="Innovation-focused" className="cursor-pointer">Innovation-focused</SelectItem>
              <SelectItem value="Work-life balance" className="cursor-pointer">Work-life Balance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="learning_attitude">Learning Attitude</Label>
          <Select
            value={filters.learning_attitude || "all"}
            onValueChange={(value) => updateFilter("learning_attitude", value)}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All attitudes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">All Attitudes</SelectItem>
              <SelectItem value="Active Learner" className="cursor-pointer">Active Learner</SelectItem>
              <SelectItem value="Passive" className="cursor-pointer">Passive</SelectItem>
              <SelectItem value="Self-directed" className="cursor-pointer">Self-directed</SelectItem>
              <SelectItem value="Collaborative" className="cursor-pointer">Collaborative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
