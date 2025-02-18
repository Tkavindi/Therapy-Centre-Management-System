const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    customer_name: { type: String, required: true},
    customer_contact_no: { type: String, required: true},
    massage_type: { type: String, required: true},
    duration: { type: Number, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    therapist_name: {type: String, required: false},
    price: {type: String, required: true }
    
})


module.exports =  mongoose.model('Booking', bookingSchema)
