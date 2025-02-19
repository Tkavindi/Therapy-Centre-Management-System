const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true},
    massage_type: { type: String, required: true},
    earned_amount: { type: Number, required: true},
    timestamp: {type: Date, default: Date.now()}

})

module.exports =  mongoose.model('Salary', salarySchema)