const express = require('express')
const router = express.Router()
const {
    addBalance,
    getBalances
} = require('../controllers/balance')


router.post('/add',addBalance)
router.get('/',getBalances)




module.exports = router