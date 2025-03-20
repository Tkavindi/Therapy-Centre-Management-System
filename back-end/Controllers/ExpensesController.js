const Expenses = require('../Models/ExpensesModels')

const addExpenses = async (req,res) =>{
    try{
     const data = req.body
     const newexpenses = new Expenses(
        {   
            expenditure: data.expenditure,
            amount: data.amount
        }
     )
     await newexpenses.save()
     res.status(201).send("Succesfully Added")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

}

// const viewExpenses = async (req, res) =>{
//     try{
//         const expenses = await Expenses.find()
//         res.status(200).send(expenses)

//     }catch(error){
//         console.log(error)
//         res.status(500).send('Expenses is Not Found')
//     }
// }

const viewExpenses = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Convert the dates to proper format (from string to Date)
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Query to filter expenses between the start and end date
        const expenses = await Expenses.find({
            date: { $gte: start, $lte: end },
        });

        res.status(200).send(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).send('Expenses not found');
    }
};





module.exports = {addExpenses, viewExpenses}