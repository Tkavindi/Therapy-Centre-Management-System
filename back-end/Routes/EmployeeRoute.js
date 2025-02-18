const express = require('express')
const router = express.Router()
const {addEmployee} = require('../Controllers/EmployeeController')

router.post('/add', (req,res) =>{
    addEmployee(req, res)
})


module.exports = router
