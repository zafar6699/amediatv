const express = require('express')
const router = express.Router()
const {Janrs, OneJanr, Home} = require('../controllers/indexController_z')
const { News} = require('../controllers/newsController')

router.get('/', Home);
router.post('/janr', Janrs);
router.get('/news', News);
router.get('/onejanr', OneJanr);


module.exports = router