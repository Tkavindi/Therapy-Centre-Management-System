const express = require('express')
const router = express.Router()
const {addExpenses, viewExpenses} = require('../Controllers/ExpensesController')

router.post('/add', (req,res) =>{
    addExpenses(req, res)
})

router.get('/view', (req,res) =>{
    viewExpenses(req, res)
})



module.exports = router