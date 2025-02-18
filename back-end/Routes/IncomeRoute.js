const express = require('express')
const router = express.Router()
const {addIncome} = require('../Controllers/IncomeController')

router.post('/add', (req,res) =>{
    addIncome(req, res)
})


module.exports = router