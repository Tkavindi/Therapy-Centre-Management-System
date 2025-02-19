const Booking = require('../Models/BookingModels')
const {addIncome} = require('../Controllers/IncomeController')
const {addSalary} = require('../Controllers/SalaryController')


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
                therapist_id: req.body.therapist_id,
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

const completeBooking = async (req, res) =>{
    try{
        const booking_id = req.params.bookingId

        const booking = await Booking.findById(booking_id)
        if(booking.status == "Pending"){
        await Booking.findByIdAndUpdate(booking_id,{status: "Completed"})
        
        if (!booking) {
            return res.status(404).send("Booking not found");
        }
        await addIncome(booking);
        await addSalary(booking);

        res.status(200).send("Booking marked as completed,  income and salary recorded");
    }else{
        res.status(500).send("Booking is already Completed");
    }
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

const viewBooking = async (req, res) =>{
    try{
        const booking = await Booking.find()
        res.status(200).send(booking)

    }catch(error){
        console.log(error)
        res.status(500).send('Booking is Not Found')
    }
}

module.exports = {addBooking, completeBooking, viewBooking}