const express = require('express')
const router = express.Router()
const {Videos} = require('../controllers/videosController')

router.get('/videos', Videos)

module.exports = router