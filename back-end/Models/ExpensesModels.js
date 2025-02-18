const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    date: {type: Date, default:Date.now()},
    expenditure: {type: String, required: true},
    amount: { type: Number, required: true},
    
})


module.exports = mongoose.model('Expenses', expensesSchema)
