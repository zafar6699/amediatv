const express = require('express')
const router = express.Router()
const {
    addBalance,
    getBalances
} = require('../controllers/balance')


router.route('/')
    .post(addBalance)
    .get(getBalances)




module.exports = router