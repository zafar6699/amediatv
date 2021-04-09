const express = require('express')
const router = express.Router()
const {checkUser, saveData, Events,checkOson,payOson, FillBalance} = require('../controllers/Payment')
router.post('/sendSumm', FillBalance)
router.post('/check', checkOson)
router.post('/pay',payOson)
router.post('/check/:id', checkUser)
router.post('/create', saveData)
router.get('/all', Events)

module.exports = router;