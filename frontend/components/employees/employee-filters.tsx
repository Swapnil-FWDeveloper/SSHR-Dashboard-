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
            <Button variant="ghost" size="sm" onClick={clearFilters}>
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
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="not_submitted">Not Submitted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select value={filters.role || "all"} onValueChange={(value) => updateFilter("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Software Engineer">Software Engineer</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="Data Scientist">Data Scientist</SelectItem>
              <SelectItem value="AI Researcher">AI Researcher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="interest_area">Interest Area</Label>
          <Select
            value={filters.interest_area || "all"}
            onValueChange={(value) => updateFilter("interest_area", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All interests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Interests</SelectItem>
              <SelectItem value="AI Enthusiast">AI Enthusiast</SelectItem>
              <SelectItem value="HR-Tech Passionate">HR-Tech Passionate</SelectItem>
              <SelectItem value="Innovation Focused">Innovation Focused</SelectItem>
              <SelectItem value="Leadership Oriented">Leadership Oriented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="long_term_goals">Long-term Goals</Label>
          <Select
            value={filters.long_term_goals || "all"}
            onValueChange={(value) => updateFilter("long_term_goals", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All goals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              <SelectItem value="Career-focused">Career-focused</SelectItem>
              <SelectItem value="Entrepreneurial">Entrepreneurial</SelectItem>
              <SelectItem value="Technical Excellence">Technical Excellence</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="work_culture_preference">Work Culture</Label>
          <Select
            value={filters.work_culture_preference || "all"}
            onValueChange={(value) => updateFilter("work_culture_preference", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All cultures" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cultures</SelectItem>
              <SelectItem value="Healthy culture">Healthy Culture</SelectItem>
              <SelectItem value="Salary-driven">Salary-driven</SelectItem>
              <SelectItem value="Innovation-focused">Innovation-focused</SelectItem>
              <SelectItem value="Work-life balance">Work-life Balance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="learning_attitude">Learning Attitude</Label>
          <Select
            value={filters.learning_attitude || "all"}
            onValueChange={(value) => updateFilter("learning_attitude", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All attitudes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Attitudes</SelectItem>
              <SelectItem value="Active Learner">Active Learner</SelectItem>
              <SelectItem value="Passive">Passive</SelectItem>
              <SelectItem value="Self-directed">Self-directed</SelectItem>
              <SelectItem value="Collaborative">Collaborative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
