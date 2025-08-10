import AddEmployeeForm from "@/components/employees/add-employee-form"

export default function AddEmployeePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Employee</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Create a new employee profile and assessment record</p>
      </div>
      <AddEmployeeForm />
    </div>
  )
}
