const Income = require('../Models/IncomeModel')

const addIncome = async (booking) =>{
    try{
   
     const newincome = new Income(
        {   
            booking_id: booking._id,
            date: booking.date,
            massage_type: booking.massage_type,
            price: booking.price
        }
     )
     await newincome.save()
     console.log("Income successfully added")
    }
    catch(error){
        console.log(error)
        console.error("Error adding income:", error)
    }

}

const viewIncome = async (req, res) =>{
    try{
        const income = await Income.find()
        res.status(200).send(income)

    }catch(error){
        console.log(error)
        res.status(500).send('Income is Not Found')
    }
}





module.exports = {addIncome, viewIncome}