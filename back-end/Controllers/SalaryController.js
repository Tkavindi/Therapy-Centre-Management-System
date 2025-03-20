const Salary = require('../Models/SalaryModel');
const Employee = require('../Models/EmployeeModel');
const Massage = require('../Models/MassageModel');

const addSalary = async (booking) => {
    try {
        // Find the massage type in the database
        console.log("adding salary")
        const selected_massage = await Massage.findOne({ massage_type: booking.massage_type });
        

        if (!selected_massage) {
            console.error("Massage type not found:", booking.massage_type);
            return;
        }

        const newSalary = new Salary({
            therapist_id: booking.therapist_id,
            booking_id: booking._id,
            massage_type: booking.massage_type,
            earned_amount: selected_massage.therapist_pay, // Use therapist_pay
            timestamp: new Date()
        });

        await newSalary.save();
        console.log("Salary Successfully Added.");
    } catch (error) {
        console.error("Error adding salary:", error);
    }
};



// Function to fetch salaries within a specific time period for an employee
const viewSalaryByPeriod = async (req, res) => {
    try {
        let { startDate, endDate, employeeName } = req.query;

        if (!startDate || !endDate || !employeeName) {
            return res.status(400).json({ error: "Start date, end date, and employee name are required." });
        }

        // Convert dates to JavaScript Date objects
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        // Validate date format
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
        }

        // Fetch employee details by employee name (case-insensitive)
        const employee = await Employee.findOne({
            employee_name: { $regex: new RegExp(`^${employeeName}$`, "i") }
        });

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Fetch salary records based on the employee and date range
        const salaryRecords = await Salary.find({
            therapist_id: employee._id,
            timestamp: { $gte: startDate, $lte: endDate }
        }).populate('therapist_id', 'employee_name employee_type');  // Populate employee details

        if (salaryRecords.length === 0) {
            return res.status(404).json({ message: "No salary records found for this employee in the given date range." });
        }

        // Calculate total salary
        const totalSalary = salaryRecords.reduce((sum, salary) => sum + salary.earned_amount, 0);

        res.status(200).json({
            employee_name: employee.employee_name,
            employee_type: employee.employee_type,
            total_salary: totalSalary,
            salary_details: salaryRecords
        });
    } catch (error) {
        console.error("Error fetching salary records:", error);
        res.status(500).send("Error fetching salary records.");
    }
};

module.exports = { addSalary, viewSalaryByPeriod };


