const express = require('express')
const router = express.Router()
const {
    addBalance,
    getBalances
} = require('../controllers/balance')


router.post('/',addBalance)
router.get('/',getBalances)




module.exports = router