const express = require('express')
const router = express.Router()

const { getAllJewels, getFilteredJewels } = require('../controllers/jewelControllers')

router.get('/joyas', getAllJewels)
router.get('/joyas/filtros', getFilteredJewels)
router.get('*', (req,res) => {
    res.status(404).send("Esta ruta no existe")
})

module.exports = router