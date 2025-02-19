const express = require('express')
const router = express.Router()
const {viewSalary} = require('../Controllers/SalaryController')

router.get('/view', (req,res) =>{
    viewSalary(req, res)
})



module.exports = router