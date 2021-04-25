const express = require('express');
const router = express.Router()
const POST_PAYMENT =  require('../controllers/Payment')


router.post('/check/:id', checkUser)

module.exports = router