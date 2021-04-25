const express = require('express');
const router = express.Router()
const POST_PAYMENT =  require('../controllers/Payment')


router.post('/check/:uid', POST_PAYMENT.checkUser)

module.exports = router