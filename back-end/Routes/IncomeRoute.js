const express = require('express')
const router = express.Router()
const {addIncome, viewIncome, viewIncomeByPeriod} = require('../Controllers/IncomeController')

router.post('/add', (req,res) =>{
    addIncome(req, res)
})

router.get('/view', (req,res) =>{
    viewIncome(req, res)
})
router.get('/view-by-period',(req, res) =>{
    viewIncomeByPeriod(req, res)
});

 module.exports = router


