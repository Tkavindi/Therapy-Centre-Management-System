const Employee = require('../Models/EmployeeModel')

const addEmployee = async (req, res) =>{
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

const deleteEmployee = async (req, res) =>{
    try{
      
       const employee_id = req.params.employeeId
       const employee = await Employee.deleteOne({_id:employee_id})
       res.status(200).send('Succesfully Deleted')
       
        
    }catch(error){
        console.log(error)
        res.status(500).send(error)

    }
}

const updateEmployee = async (req, res) => {
    try{
        const employee_id = req.params.employeeId
        const updatedData = req.body

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employee_id,
            updatedData,
            { new: true, runValidators: true}
        )

        if(!updatedEmployee) {
            return res.status(404).send("Employee not found")
        }
        res.status(200).json({ message: "Succesfull Updated", updatedEmployee})
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)

    }
}

const loginEmployee = async (req, res) =>{
    try{
        const data = req.body
        const username = data.username
        const password = data.password

        const validateuser =  await Employee.findOne({username :  username})

        if(!validateuser) {
            res.status(404).send("Username or Password Invalid")
        }

        else {
            if(validateuser.password == password){
                res.status(200).send(validateuser)
            }else{
                res.status(404).send("Username or Password Invalid")
            }
           
        }
        

    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

const viewEmployee = async (req, res) =>{
    try{
        const employee = await Employee.find()
        res.status(200).send(employee)

    }catch(error){
        console.log(error)
        res.status(500).send('Employee is Not Found')
    }
}



module.exports = {addEmployee, deleteEmployee, updateEmployee, loginEmployee, viewEmployee}