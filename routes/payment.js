const express = require('express')
const router = express.Router()
const {checkUser, saveData, Events,checkOson,payOson} = require('../controllers/Payment')

router.post('/check/:id/:code', checkUser)
router.post('/check', checkOson)
router.post('/pay',payOson)
router.post('/create', saveData)
router.get('/all', Events)

module.exports = router;