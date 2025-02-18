const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    booking_id: {type: String, required: true},
    date:{type: Date, required: true},
    massage_type: { type: String, required: true},
    price: { type: Number, required: true},
    
})


module.exports = mongoose.model('Income', incomeSchema)
