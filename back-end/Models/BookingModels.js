// const mongoose = require('mongoose')

// const bookingSchema = new mongoose.Schema({
//     customer_name: { type: String, required: true},
//     customer_country: { type: String, required: true},
//     massage_type: { type: String, required: true},
//     duration: { type: Number, required: true},
//     date: {type: Date, required: true},
//     time: {type: String, required: true},
//     therapist_name: {type: String, required: false},
//     therapist_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
//     price: {type: Number, required: true },
//     status: {type: String, default: "Pending"}

    
// })


// module.exports =  mongoose.model('Booking', bookingSchema)

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    customer_country: { type: String, required: true }, // Updated field
    massage_type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    therapist_name: { type: String, required: false },
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Booking', bookingSchema);
