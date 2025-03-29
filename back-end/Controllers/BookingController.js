const Booking = require('../Models/BookingModels')
const {addIncome} = require('../Controllers/IncomeController')
const {addSalary} = require('../Controllers/SalaryController')


const addBooking = async (req, res) =>{
    try{
        const newbooking = new Booking(
            {
                customer_name: req.body.customer_name,
                customer_country: req.body.customer_country,
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

const completeBooking = async (req, res) => {
    try {
        const booking_id = req.params.bookingId;

        // Check if booking exists first
        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return res.status(404).send("Booking not found");
        }

        // Check if booking is already completed
        if (booking.status === "Completed") {
            return res.status(400).send("Booking is already Completed");
        }

        // Mark booking as completed
        await Booking.findByIdAndUpdate(booking_id, { status: "Completed" });

        // Add salary and income after booking completion
        await addIncome(booking);
        await addSalary(booking);

        console.log("Booking marked as completed, income and salary recorded");
        res.status(200).send("Booking marked as completed, income and salary recorded");

    } catch (error) {
        console.error("Error completing booking:", error);
        res.status(500).send(error);
    }
};


const viewBooking = async (req, res) => {
    try {
        const { startDate, endDate, startTime, endTime } = req.query;

        // Build the query object to filter bookings
        const query = {};

        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Date range filter
        }

        if (startTime && endTime) {
            query.time = { $gte: startTime, $lte: endTime }; // Time range filter
        }

        const bookings = await Booking.find(query);

        if (bookings.length === 0) {
            return res.status(404).send("No bookings found for the specified time period");
        }

        res.status(200).send(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).send('Error fetching bookings');
    }
};

module.exports = {addBooking, completeBooking, viewBooking}