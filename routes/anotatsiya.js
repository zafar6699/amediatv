const express = require('express')
const router = express.Router()
const { add, getAll, addOne  } = require('../controllers/anotatsiya')


router.post('/add',add)
router.get('/all',getAll)
router.delete('/:id',addOne)

module.exports = router
