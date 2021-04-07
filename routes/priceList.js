const express = require('express')
const router = express.Router()
const {
    addPrices,
    getPrices,
    // updatePrices
} = require('../controllers/priceList')
const {protect , authorize} = require('../middlewares/auth');

router.route('/')
    .post(addPrices)
    .get(getPrices)

// router.route('/:id')
//     .put(protect, authorize('admin'),updatePrices)

module.exports = router 