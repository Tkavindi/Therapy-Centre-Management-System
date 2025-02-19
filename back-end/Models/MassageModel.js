const mongoose = require('mongoose')

const massageSchema = new mongoose.Schema({
    massage_type: { type: String, required: true},
    duration: { type: Number, required: true},
    price: { type: String, required: true},
    therapist_pay: { type: Number, required: true}
})


module.exports = mongoose.model('Massage', massageSchema)
