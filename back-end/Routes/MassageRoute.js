const express = require('express')
const router = express.Router()
const {addMassage, updateMassage, deleteMassage} = require('../Controllers/MassageController')

router.post('/add', (req,res) =>{
    addMassage(req, res)
})

router.put('/:massageId', (req,res) =>{
    updateMassage(req, res)
})

router.delete('/:massageId', (req, res) =>{
    deleteMassage(req, res)
})

module.exports = router