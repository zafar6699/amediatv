const express = require('express');
const { getSlidersForAdminPage, addSlider } = require('../controllers/slider');
const router = express.Router();

router.post('/add', addSlider)
router.get('/admin', getSlidersForAdminPage)

module.exports = router;