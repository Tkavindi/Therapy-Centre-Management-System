const express = require('express')
const router = express.Router()
const {addEmployee, deleteEmployee, updateEmployee, loginEmployee} = require('../Controllers/EmployeeController')

router.post('/add', (req,res) =>{
    addEmployee(req, res)
})

router.delete('/:employeeId', (req, res) =>{
    deleteEmployee(req, res)
})

router.put('/:employeeId', (req, res) =>{
    updateEmployee(req, res)
})
router.post('/login', (req, res) =>{
    loginEmployee(req, res)
})


module.exports = router
