const express = require('express')
const router = express.Router()
const {addBooking} = require('../Controllers/BookingController')

router.post('/add', (req,res) =>{
    addBooking(req, res)
})


module.exports = router
