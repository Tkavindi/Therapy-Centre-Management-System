const express = require('express')
const router = express.Router()
const {addMassage} = require('../Controllers/MassageController')

router.post('/add', (req,res) =>{
    addMassage(req, res)
})


module.exports = router