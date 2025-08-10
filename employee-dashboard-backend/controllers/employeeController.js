const Employee = require('../models/employeeModel')

// ➤ Add Employee
const addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// ➤ Get All Employees with Filtering, Sorting, Search
const getEmployees = async (req, res) => {
  try {
    let query = {}

    // Filtering
    if (req.query.assessment_submitted) {
      query.assessment_submitted = req.query.assessment_submitted === 'true'
    }
    if (req.query.role) {
      query.role = req.query.role
    }
    if (req.query.tag) {
      query.tags = req.query.tag
    }

    // Searching
    if (req.query.search) {
      query.$or = [
        { name: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') },
        { tags: new RegExp(req.query.search, 'i') }
      ]
    }

    // Sorting
    let sort = {}
    if (req.query.sortBy) {
      sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1
    }

    const employees = await Employee.find(query).sort(sort)
    res.json(employees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ➤ Get Employee Details
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).json({ message: 'Employee not found' })
    res.json(employee)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ➤ Update Employee
const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// ➤ Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id)
    res.json({ message: 'Employee deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
}
