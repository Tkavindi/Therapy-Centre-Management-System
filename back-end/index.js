const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000
const Connectdb = require('../back-end/Utils/Connectdb')
const employeeRoute = require('../back-end/Routes/EmployeeRoute')
const massageRoute = require('../back-end/Routes/MassageRoute')
const bookingRoute = require('../back-end/Routes/BookingRoute')
const incomeRoute = require('../back-end/Routes/IncomeRoute')

const app = express()
app.use(express.json())

app.use(cors())

Connectdb()

app.use('/employee', employeeRoute)
app.use('/massage', massageRoute)
app.use('/booking', bookingRoute)
app.use('/income', incomeRoute)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})


