const express = require('express')
const router = express.Router()
const {Janrs, Home} = require('../controllers/indexController_z')

router.get('/', Home);
router.post('/janr', Janrs);


module.exports = router