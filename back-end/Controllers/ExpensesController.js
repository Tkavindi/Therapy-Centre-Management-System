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


module.exports = {addExpenses}