const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  assessment_submitted: { type: Boolean, default: false },
  assessment_answers: { type: Object, default: {} },
  tags: [String],
  submission_date: { type: Date }
})

module.exports = mongoose.model('Employee', employeeSchema)
