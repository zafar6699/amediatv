const express = require('express')
const router = express.Router()
const {Profile} = require('../controllers/profileController')

router.get('/profile', Profile)

module.exports = router