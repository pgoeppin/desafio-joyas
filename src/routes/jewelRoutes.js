const express = require('express')
const router = express.Router()

const { getAllJewels } = require('../controllers/jewelControllers')

router.get('/joyas', getAllJewels)

module.exports = router