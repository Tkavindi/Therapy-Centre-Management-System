const Income = require('../Models/IncomeModel');

// Function to add income when a booking is completed
const addIncome = async (booking) => {
    try {
        const newIncome = new Income({
            booking_id: booking._id,
            date: booking.date,
            massage_type: booking.massage_type,
            price: booking.price
        });
        await newIncome.save();
        console.log("Income successfully added");
    } catch (error) {
        console.error("Error adding income:", error);
    }
};

// Function to fetch income within a specific time period
const viewIncomeByPeriod = async (req, res) => {
    try {
        let { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "Start date and end date are required." });
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
        }

        // Fetch incomes within the date range
        const incomeRecords = await Income.find({
            date: { $gte: startDate, $lte: endDate }
        });

        res.status(200).json({
            total_income: incomeRecords.reduce((sum, income) => sum + income.price, 0),
            income_details: incomeRecords
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching income within the specified time period.');
    }
};

// Export only income functions
module.exports = { addIncome, viewIncomeByPeriod };
