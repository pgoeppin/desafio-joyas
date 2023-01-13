const express = require('express')
const router = express.Router()

const { getAllJewels, getFilteredJewels } = require('../controllers/jewelControllers')
const { reportRequest } = require('../middlewares/logger')


router.get('/joyas', reportRequest, getAllJewels)
router.get('/joyas/filtros', reportRequest, getFilteredJewels)
router.get('*', (req,res) => {
    res.status(404).send("Esta ruta no existe")
})

module.exports = router