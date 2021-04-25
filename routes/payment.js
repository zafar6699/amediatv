const express = require('express')
const router = express.Router()
const {checkUser, saveData, Events,checkOson,payOson} = require('../controllers/Payment')


router.post('/check', checkOson)
router.post('/pay',payOson)
router.post('/check/:id', checkUser)
router.post('/create', saveData)
router.get('/all', Events)

module.exports = router;