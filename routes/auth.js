const express = require('express');
const { register , login, logout, getSession   } = require('../controllers/auth');

const router = express.Router();
router.post('/register' , register);
router.post('/signin' , login);
router.post('/logout' , logout);
router.get('/session' , getSession);

module.exports = router;