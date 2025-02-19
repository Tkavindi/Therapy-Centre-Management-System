const Salary = require('../Models/SalaryModel')
const Massage = require('../Models/MassageModel')

const addSalary = async (booking) =>{
    try{

    const selected_massage = await Massage.findOne({massage_type:booking.massage_type})
    
   
     const newsalary = new Salary(
        {   
            therapist_id: booking.therapist_id,
            booking_id: booking._id,
            massage_type: booking.massage_type,
            earned_amount: selected_massage.therapist_pay   
           
        }
     )
     await newsalary.save()
     console.log("Salary Successfully Added.")
    }
    catch(error){
        console.log(error)
        console.error("Error adding income:", error)
    }

}

const viewSalary = async (req, res) =>{
    try{
        const salary = await Salary.find()
        res.status(200).send(salary)

    }catch(error){
        console.log(error)
        res.status(500).send('Salary is Not Found')
    }
}



module.exports = {addSalary, viewSalary}