const express = require('express')
const router = express.Router()
const {addIncome, viewIncome} = require('../Controllers/IncomeController')

router.post('/add', (req,res) =>{
    addIncome(req, res)
})

router.get('/view', (req,res) =>{
    viewIncome(req, res)
})


module.exports = router