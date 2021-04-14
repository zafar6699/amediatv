const express = require('express');
const router = express.Router();
const { register, login, logout, getSession, UpdateDetails, UpdatePassword, updateFile } = require('../controllers/auth');
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, './public/uploads');
 },
 filename: function (req, file, cb) {
  cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
 }
});
const upload = multer({ storage: storage });

router.post('/register', register);
router.post('/signin', login);
router.post('/logout', logout);
router.get('/session', getSession);

router.post('/updatepassword/:id', UpdatePassword);
router.post('/detail/:id', UpdateDetails);


router.post('/upload/:id', upload.single('photo'), updateFile);

module.exports = router;