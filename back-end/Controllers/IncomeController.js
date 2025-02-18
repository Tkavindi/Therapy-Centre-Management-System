const Income = require('../Models/IncomeModel')

const addIncome = async (req,res) =>{
    try{
     const data = req.body
     const newincome = new Income(
        {   
            booking_id: data.booking_id,
            date: data.date,
            massage_type: data.massage_type,
            price: data.price
        }
     )
     await newincome.save()
     res.status(201).send("Succesfully Added")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

}


module.exports = {addIncome}