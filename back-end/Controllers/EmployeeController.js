const {Employee} = require('../Models/EmployeeModel')

const addEmployee = async (req,res) =>{
    try{
     const data = req.body
     const newemployee = new Employee(
        {
            username: data.username,
            password: data.password,
            employee_name: data.employee_name,
            employee_contact: data.employee_contact,
            employee_type: data.employee_type
        }
     )
     await newemployee.save()
     res.status(201).send("Succesfully Added")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

}


module.exports = {addEmployee}