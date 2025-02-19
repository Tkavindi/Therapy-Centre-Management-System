const Massage = require('../Models/MassageModel')

const addMassage = async (req,res) =>{
    try{
     const data = req.body
     const newmassage = new Massage(
        {
            massage_type: data.massage_type,
            duration: data.duration,
            price: data.price,
            therapist_pay: data.therapist_pay
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

const updateMassage = async (req,res) =>{
    try{
        const massage_id = req.params.massageId
        const updatedData = req.body 

        const updatedMassage = await Massage.findByIdAndUpdate(
            massage_id,
            updatedData,
            { new: true, runValidators: true}
        )
        if(!updatedMassage){
            res.status(404).send("Massage Type Not Found.")
        }
        res.status(200).json({ message: 'Succesfull Updated ', updatedMassage})

    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}
const deleteMassage = async (req, res) =>{
    try{
        const massage_id = req.params.massageId
        await Massage.deleteOne({_id: massage_id})
        res.status(200).send("Succesfully Deleted")
        
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

const viewMassage = async (req, res) =>{
    try{
        const massage = await Massage.find()
        res.status(200).send(massage)

    }catch(error){
        console.log(error)
        res.status(500).send('Massage Type is Not Found')
    }
}


module.exports = {addMassage, updateMassage, deleteMassage, viewMassage}