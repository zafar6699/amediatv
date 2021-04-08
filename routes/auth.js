const express = require('express');
const { register , login, logout, getSession, UpdateDetails, UpdatePassword  } = require('../controllers/auth');

const router = express.Router();
router.post('/register' , register);
router.post('/signin' , login);
router.post('/logout' , logout);
router.get('/session' , getSession);
router.put('/updatedetails' , UpdateDetails);
router.put('/updatepassword' , UpdatePassword);

module.exports = router;