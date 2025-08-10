import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Employee {
  _id?: string
  name: string
  email: string
  role: string
  assessment_submitted: boolean
  assessment_answers?: Record<string, string>
  tags: string[]
  submission_date?: string
  interest_area?: string
  long_term_goals?: string
  work_culture_preference?: string
  learning_attitude?: string
  learning_score?: number
}

export interface EmployeeFilters {
  status?: "submitted" | "not_submitted"
  role?: string
  interest_area?: string
  long_term_goals?: string
  work_culture_preference?: string
  learning_attitude?: string
  search?: string
  sort_by?: string
  sort_order?: "asc" | "desc"
}

// Mock data for demonstration
const mockEmployees: Employee[] = [
  {
    _id: "1",
    name: "Sameer Ahmed",
    email: "sameer.ahmed@company.com",
    role: "AI Researcher",
    assessment_submitted: true,
    assessment_answers: {
      q1: "I love building futuristic AI systems that can help humanity",
      q2: "A collaborative environment with cutting-edge technology",
      q3: "Making a positive impact on the world through technology",
      q14: "Leading AI research initiatives and mentoring junior developers",
      q16: "I actively seek out new learning opportunities and challenges",
      q17: "Online courses, research papers, and hands-on experimentation",
      q19: "Innovation-focused culture with work-life balance",
      q20: "Becoming a thought leader in AI ethics and safety",
    },
    tags: ["Innovator", "Tech Enthusiast", "AI Expert"],
    submission_date: "2025-01-08T00:00:00.000Z",
    interest_area: "AI Enthusiast",
    long_term_goals: "Technical Excellence",
    work_culture_preference: "Innovation-focused",
    learning_attitude: "Active Learner",
    learning_score: 95,
  },
  {
    _id: "2",
    name: "Swapnil Shende",
    email: "swapnil.shende@company.com",
    role: "Product Manager",
    assessment_submitted: true,
    assessment_answers: {
      q1: "I enjoy bridging the gap between technical teams and business goals",
      q2: "Fast-paced environment with clear communication channels",
      q3: "Seeing products succeed and users benefit from our work",
      q14: "VP of Product at a major tech company",
      q16: "I learn through market research and user feedback",
      q17: "Industry reports, user interviews, and competitor analysis",
      q19: "Results-driven culture with strong team collaboration",
      q20: "Building products that scale to millions of users",
    },
    tags: ["Strategic Thinker", "User-Focused", "Leader"],
    submission_date: "2025-01-07T00:00:00.000Z",
    interest_area: "Leadership Oriented",
    long_term_goals: "Leadership",
    work_culture_preference: "Healthy culture",
    learning_attitude: "Collaborative",
    learning_score: 88,
  },
  {
    _id: "3",
    name: "Sujal Mendhe",
    email: "sujal.mendhe@company.com",
    role: "Software Engineer",
    assessment_submitted: false,
    tags: ["Developer", "Problem Solver"],
    interest_area: "Technical Excellence",
    long_term_goals: "Career-focused",
    work_culture_preference: "Work-life balance",
    learning_attitude: "Self-directed",
    learning_score: 82,
  },
  {
    _id: "4",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    role: "Data Scientist",
    assessment_submitted: true,
    assessment_answers: {
      q1: "I'm passionate about extracting insights from complex datasets",
      q2: "Data-driven environment with access to powerful computing resources",
      q3: "Discovering patterns that drive business decisions",
      q14: "Chief Data Officer role with focus on ML strategy",
      q16: "I stay updated with latest ML research and techniques",
      q17: "Academic papers, Kaggle competitions, and online courses",
      q19: "Innovation-focused with emphasis on continuous learning",
      q20: "Advancing the field of machine learning and AI",
    },
    tags: ["Data Expert", "Analytical", "Research-Oriented"],
    submission_date: "2025-01-06T00:00:00.000Z",
    interest_area: "AI Enthusiast",
    long_term_goals: "Technical Excellence",
    work_culture_preference: "Innovation-focused",
    learning_attitude: "Active Learner",
    learning_score: 92,
  },
  {
    _id: "5",
    name: "Rahul Kumar",
    email: "rahul.kumar@company.com",
    role: "Designer",
    assessment_submitted: true,
    assessment_answers: {
      q1: "Creating beautiful and intuitive user experiences",
      q2: "Creative environment with focus on user-centered design",
      q3: "Seeing users love and benefit from my designs",
      q14: "Design Director leading a team of talented designers",
      q16: "I learn through design challenges and user feedback",
      q17: "Design blogs, workshops, and user testing sessions",
      q19: "Creative culture that values both aesthetics and functionality",
      q20: "Shaping the future of digital experiences",
    },
    tags: ["Creative", "User-Focused", "Visual Thinker"],
    submission_date: "2025-01-05T00:00:00.000Z",
    interest_area: "Innovation Focused",
    long_term_goals: "Career-focused",
    work_culture_preference: "Healthy culture",
    learning_attitude: "Collaborative",
    learning_score: 85,
  },
  {
    _id: "6",
    name: "Anjali Singh",
    email: "anjali.singh@company.com",
    role: "HR Manager",
    assessment_submitted: true,
    assessment_answers: {
      q1: "Helping employees grow and fostering a positive work environment",
      q2: "Supportive and empathetic culture with clear communication",
      q3: "Seeing employees thrive and contribute their best",
      q14: "Head of People Operations, driving talent strategy",
      q16: "Through workshops, HR conferences, and peer learning",
      q17: "HR journals, industry webinars, and networking events",
      q19: "People-first culture with emphasis on well-being",
      q20: "Building a world-class talent management system",
    },
    tags: ["People Person", "Strategist", "Empathetic"],
    submission_date: "2025-01-04T00:00:00.000Z",
    interest_area: "HR-Tech Passionate",
    long_term_goals: "Leadership",
    work_culture_preference: "Healthy culture",
    learning_attitude: "Active Learner",
    learning_score: 90,
  },
  {
    _id: "7",
    name: "Vikram Patel",
    email: "vikram.patel@company.com",
    role: "Software Engineer",
    assessment_submitted: false,
    tags: ["Backend", "Scalability"],
    interest_area: "Technical Excellence",
    long_term_goals: "Career-focused",
    work_culture_preference: "Innovation-focused",
    learning_attitude: "Self-directed",
    learning_score: 78,
  },
]

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Use relative path for mock data
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], EmployeeFilters>({
      queryFn: async (filters) => {
        // Mock API response with filtering
        let filteredEmployees = [...mockEmployees]

        if (filters.status === "submitted") {
          filteredEmployees = filteredEmployees.filter((emp) => emp.assessment_submitted)
        } else if (filters.status === "not_submitted") {
          filteredEmployees = filteredEmployees.filter((emp) => !emp.assessment_submitted)
        }

        if (filters.role) {
          filteredEmployees = filteredEmployees.filter((emp) => emp.role === filters.role)
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filteredEmployees = filteredEmployees.filter(
            (emp) =>
              emp.name.toLowerCase().includes(searchLower) ||
              emp.email.toLowerCase().includes(searchLower) ||
              emp.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
          )
        }

        // Sort employees
        if (filters.sort_by) {
          filteredEmployees.sort((a, b) => {
            let aVal = a[filters.sort_by as keyof Employee] as any
            let bVal = b[filters.sort_by as keyof Employee] as any

            if (filters.sort_by === "submission_date") {
              aVal = new Date(aVal || 0).getTime()
              bVal = new Date(bVal || 0).getTime()
            }

            if (filters.sort_order === "desc") {
              return bVal > aVal ? 1 : -1
            }
            return aVal > bVal ? 1 : -1
          })
        }

        return { data: filteredEmployees }
      },
      providesTags: ["Employee"],
    }),
    getEmployee: builder.query<Employee, string>({
      queryFn: async (id) => {
        const employee = mockEmployees.find((emp) => emp._id === id)
        if (employee) {
          return { data: employee }
        }
        return { error: { status: 404, data: "Employee not found" } }
      },
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      queryFn: async (employee) => {
        const newEmployee = {
          ...employee,
          _id: Date.now().toString(),
        } as Employee
        mockEmployees.push(newEmployee)
        return { data: newEmployee }
      },
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<Employee, { id: string; employee: Partial<Employee> }>({
      queryFn: async ({ id, employee }) => {
        const index = mockEmployees.findIndex((emp) => emp._id === id)
        if (index !== -1) {
          mockEmployees[index] = { ...mockEmployees[index], ...employee }
          return { data: mockEmployees[index] }
        }
        return { error: { status: 404, data: "Employee not found" } }
      },
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<void, string>({
      queryFn: async (id) => {
        const index = mockEmployees.findIndex((emp) => emp._id === id)
        if (index !== -1) {
          mockEmployees.splice(index, 1)
          return { data: undefined }
        }
        return { error: { status: 404, data: "Employee not found" } }
      },
      invalidatesTags: ["Employee"],
    }),
  }),
})

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi
