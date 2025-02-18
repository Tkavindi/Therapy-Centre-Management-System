const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    employee_name: { type: String, required: true},
    employee_contact: { type: Number, required: true},
    employee_type: { type: String, required: true},
})


module.exports = {
    Employee: mongoose.model('Employee', employeeSchema)
}