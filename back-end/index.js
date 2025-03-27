const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000
const Connectdb = require('./Utils/Database')
const employeeRoute = require('./Routes/EmployeeRoute')
const massageRoute = require('./Routes/MassageRoute')
const bookingRoute = require('./Routes/BookingRoute')
const incomeRoute = require('./Routes/IncomeRoute')
const expenseRoute = require('./Routes/ExpensesRoutes')
const salaryRoute = require('./Routes/SalaryRoute')
require('dotenv').config();

const app = express()
app.use(express.json())

app.use(cors())

Connectdb()

app.use('/employee', employeeRoute)
app.use('/massage', massageRoute)
app.use('/booking', bookingRoute)
app.use('/income', incomeRoute)
app.use('/expenses', expenseRoute)
app.use('/salary', salaryRoute)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})


