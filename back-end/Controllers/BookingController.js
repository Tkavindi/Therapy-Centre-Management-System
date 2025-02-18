const Booking = require('../Models/BookingModels')

const addBooking = async (req, res) =>{
    try{
        const newbooking = new Booking(
            {
                customer_name: req.body.customer_name,
                customer_contact_no: req.body.customer_contact_no,
                massage_type: req.body.massage_type,
                duration: req.body.duration,
                date: req.body.date,
                time: req.body.time,
                therapist_name: req.body.therapist_name,
                price: req.body.price
    
            }
        )
        await newbooking.save()
        res.status(201).send('Succesfully Added')

    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {addBooking}