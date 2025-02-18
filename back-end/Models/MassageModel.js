const mongoose = require('mongoose')

const massageSchema = new mongoose.Schema({
    massage_type: { type: String, required: true},
    duration: { type: Number, required: true},
    price: { type: String, required: true},
})


module.exports = {
    Massage: mongoose.model('Massage', massageSchema)
}