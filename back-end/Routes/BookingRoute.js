const express = require('express')
const router = express.Router()
const {addBooking, completeBooking, viewBooking} = require('../Controllers/BookingController')

router.post('/add', (req,res) =>{
    addBooking(req, res)
})

router.put('/complete/:bookingId', (req, res) =>{
    completeBooking(req, res)
})

router.get('/view', (req, res) =>{
    viewBooking(req, res)
})


module.exports = router
