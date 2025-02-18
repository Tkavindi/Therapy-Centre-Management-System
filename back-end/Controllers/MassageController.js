const {Massage} = require('../Models/MassageModel')

const addMassage = async (req,res) =>{
    try{
     const data = req.body
     const newmassage = new Massage(
        {
            massage_type: data.massage_type,
            duration: data.duration,
            price: data.price
        }
     )
     await newmassage.save()
     res.status(201).send("Succesfully Added")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

}


module.exports = {addMassage}