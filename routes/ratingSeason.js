const express = require('express')
const router = express.Router();
const {createRatingProduct,getRatings} = require('../controllers/ratingSeason')


router.post('/',createRatingProduct)
router.get('/',getRatings)

module.exports = router;