const express = require('express')
const router = express.Router()
const {viewSalaryByPeriod, addSalary} = require('../Controllers/SalaryController')

router.get('/view-by-period', (req,res) =>{
    viewSalaryByPeriod(req, res)
})

router.post('/add', (req,res) =>{
    addSalary(req, res)
})



module.exports = router