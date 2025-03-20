const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    employee_name: { type: String, required: true },
    employee_contact: { type: String, required: true },  // Changed to String for phone numbers
    employee_type: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);

