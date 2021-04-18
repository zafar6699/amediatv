const {search,filterByYear, searchDropDown} = require('../controllers/search')
const express = require('express')
const router = express.Router()

router.get('/', search)
router.get('/down',searchDropDown)
router.get('/filter',filterByYear)
module.exports = router